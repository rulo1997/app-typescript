import { Worker, Job } from 'bullmq';

import redisClient from '../config/redis';
import { emailService } from '../core/services/email.service';

// 1. Definimos el "procesador" de trabajos.
// Esta función se ejecutará cada vez que haya un nuevo trabajo en la cola.
const processor = async( job: Job ) => {

    console.log(`[WORKER] Procesando trabajo #${ job.id } de tipo '${ job.name }'`);
    
    // Usamos un switch para manejar diferentes tipos de trabajos en la misma cola
    switch( job.name ) {
        case 'send-confirmation-email':
            await emailService.sendOrderConfirmation( job.data );
        break;
        // Podríamos tener otros casos, como:
        // case 'send-password-reset':
        //   await emailService.sendPasswordReset(job.data);
        //   break;
        default:
            throw new Error(`Tipo de trabajo desconocido: ${ job.name }`);
    }
};

// 2. Creamos la instancia del Worker
// Le decimos que escuche la cola 'notifications' y use nuestro procesador.
const worker = new Worker('notifications', processor, {
    connection: redisClient.duplicate(),
});

// 3. Eventos del Worker (opcional pero recomendado)
worker.on('completed', job => console.log(`[WORKER] Trabajo #${ job.id } completado con éxito.`) );

worker.on('failed', ( job , err ) => console.error(`[WORKER] Trabajo #${ job?.id}  falló con el error: ${ err.message }`) );

console.log("🚀 Worker de notificaciones iniciado. Esperando trabajos...");