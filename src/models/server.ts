import express from 'express';

class Server {

    constructor(
        public port: number = 3000,
        public app = express(),
    ) {
        this.middelwers();
    }

    private middelwers() {



    }

    public routes() {

    }

    public listen( p?: number ) {

        if( p ) this.port = p;
        
        this.app.listen( this.port );
        console.log(`Servidor escuchando en el puerto ${ this.port }`);

    }

}

export default Server;