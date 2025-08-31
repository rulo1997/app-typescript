import { Request, Response , NextFunction } from "express";
import { validationResult } from "express-validator";

const validarCampos = ( req: Request , res: Response , next: NextFunction ) => {

    const error = validationResult( req ).array({ onlyFirstError: true });

    const errorMapped = error.map( error => ({ ...error , shouldShow: true }));

    if( error.length !== 0 ) return res.status( 422 ).json( errorMapped );

    next();

}

export default validarCampos;