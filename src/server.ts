import express , { Application } from 'express';
import 'express-async-errors'; 
import cors from 'cors';
import passport from 'passport';
import configurePassport from './config/passport'; 
import './config/redis';
import swaggerUi from 'swagger-ui-express'; // <-- Importar
import { swaggerSpec } from './config/swagger';   // <-- Importar

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

    }

    public getApp() {
        return this.app;
    }

    private middlewares() {

        this.app.use( cors() );
        this.app.use( express.json() );

        this.app.use( express.static('public') );

        this.app.use(passport.initialize());
        configurePassport();

        this.app.use('/api-docs', swaggerUi.serve , swaggerUi.setup( swaggerSpec ));

    }

    private async dbAuthenticate() {

        try {
            
            db.authenticate();
            console.log(`Base de datos conectada con éxito`);

            setupAssociations();

            await db.sync({ force: false });
            console.log(`Sincronizacion de Modelos`);

        } catch( error ) {
            
            throw new Error(`Error al conectar la base de datos ${ error }`);

        }

    }

    private routes() {

        this.app.use( '/api/v1' , routes );

    }

    public listen () {

        this.app.use( errorHandler );
        this.app.listen( this.port );
        console.log(`Servidor corriendo en el puerto ${ this.port }`);

    }

}