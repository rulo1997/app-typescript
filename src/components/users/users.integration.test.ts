import request from 'supertest';
import { Server } from '../../server';
import db from '../../config/database';
import User from './user.model';

describe('Endpoints de Usuarios (Integración)', () => {
  let server: Server;
//   let app: request.SuperTest<request.Test>;
  let app: any;

  // -- 1. SETUP: Se ejecuta UNA VEZ antes de todas las pruebas de este archivo --
  beforeAll(() => {
    server = new Server();
    server.listen(); // Inicia el servidor
    app = request(server.getApp()); // Crea el agente de Supertest
  });

  // -- 2. TEARDOWN: Se ejecuta UNA VEZ después de todas las pruebas --
  afterAll(async () => {
    await db.close(); // Cierra la conexión a la base de datos
  });

  // -- 3. LIMPIEZA: Se ejecuta ANTES de CADA prueba individual --
  beforeEach(async () => {
    // Sincroniza y borra todas las tablas para asegurar un estado limpio.
    await db.sync({ force: true });
  });

  // --- PRUEBA PARA EL REGISTRO DE USUARIOS ---
  describe('POST /api/v1/users/register', () => {
    it('debería registrar un nuevo usuario y devolver un token', async () => {
      // 1. ARRANGE: Preparamos los datos de prueba
      const newUser = {
        name: 'Test',
        username: 'User',
        email: 'test.user@example.com',
        password: 'password123',
        role: 'customer'
      };

      // 2. ACT: Hacemos la petición HTTP a nuestra API
      const response = await app
        .post('/api/v1/users/register') // Asumiendo que esta es tu ruta de registro
        .send(newUser);

      // 3. ASSERT: Verificamos la respuesta y el estado de la base de datos
      
      // Verificamos la respuesta HTTP
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('token');
      expect(response.body.user).toBeDefined();
      expect(response.body.user.email).toBe(newUser.email);
      expect(response.body.user.password).toBeUndefined(); // Muy importante verificar que el password no se devuelve

      // Verificamos directamente en la base de datos
      const dbUser = await User.findOne({ where: { email: newUser.email } });
      expect(dbUser).not.toBeNull();
      expect(dbUser!.name).toBe(newUser.name);
    });

    it('debería devolver un error 422 si el email no es válido', async () => {
       const invalidUser = {
        firstName: 'Test',
        lastName: 'User',
        email: 'not-an-email',
        password: 'password123',
      };

      const response = await app
        .post('/api/v1/users/register')
        .send(invalidUser);

      expect(response.status).toBe(422); // Unprocessable Entity
      expect(response.body.errors[0].msg).toContain('El email no es válido');
    });
  });
});