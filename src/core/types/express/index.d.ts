// 1. Definimos la forma que tendrá el payload de nuestro JWT
// Esta interfaz SÍ la exportamos para poder usarla en otros lugares (como en el middleware).
export interface TokenPayload {
  id: number;
  email: string;
  permissions: string[];
}

// 2. Aumentamos el espacio de nombres global de Express
declare global {
  namespace Express {
    // 3. Fusionamos nuestra interfaz TokenPayload con la interfaz User que Passport crea.
    // Ahora, en todo nuestro proyecto, la interfaz 'User' de Express TENDRÁ la forma de nuestro TokenPayload.
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface User extends TokenPayload {}

    // 4. Actualizamos el objeto Request para que use esta nueva y fusionada interfaz User.
    interface Request {
      user?: User;
    }
  }
}