import cors from 'cors';
import express , { Application } from 'express';
import db from './config/database';

import routes from './api/routes';
import { errorHandler } from './api/middlewares/error.handler';
import { setupAssociations } from './core/database/associations';

export class Server {

    constructor(
        private app: Application = express(),
        private port: number = Number( process.env.PORT ) || 3000
    ) {

        this.middlewares();
        this.routes();
        this.dbAuthenticate();
        this.app.use( errorHandler );

    }

    private middlewares() {

        this.app.use( cors() );
        this.app.use( express.json() );

    }

    private async dbAuthenticate() {

        try {
            
            db.authenticate();
            console.log(`Base de datos conectada con éxito`);

            setupAssociations();

            await db.sync({ force: true });
            console.log(`Sincronizacion de Modelos`);

        } catch( error ) {
            
            throw new Error(`Error al conectar la base de datos ${ error }`);

        }

    }

    private routes() {

        this.app.use( '/api/v1' , routes );

    }

    public listen () {

        this.app.listen( this.port );
        console.log(`Servidor corriendo en el puerto ${ this.port }`);

    }

}