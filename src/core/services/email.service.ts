interface OrderEmailPayload {
    orderId: number;
    userName: string;
    userEmail: string;
    total: number;
}

class EmailService {

    public async sendOrderConfirmation( payload: OrderEmailPayload ): Promise<void> {

        console.log('----------------------------------------------------');
        console.log(`📧 Enviando email de confirmación a: ${ payload.userEmail }`);
        console.log(`Hola ${ payload.userName },`);
        console.log(`Gracias por tu orden #${ payload.orderId }.`);
        console.log(`El total de tu compra es: $${ payload.total}`);
        console.log('----------------------------------------------------');
        
        return new Promise( resolve => setTimeout( resolve , 1000 ) );

    }
}

export const emailService = new EmailService();