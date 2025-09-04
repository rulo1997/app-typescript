import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { AuthService } from './auth.service';
import { UserRepository } from '../users/user.repository';

import { AppError } from '../../core/AppError';

// 1. Mockeamos las dependencias externas
// Jest interceptará cualquier importación a estos módulos y devolverá una versión "falsa".
jest.mock('../users/user.repository');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

// Creamos instancias "mockeadas" para poder acceder a sus métodos falsos
const MockedUserRepository = UserRepository as jest.MockedClass<typeof UserRepository>;
const mockBcrypt = bcrypt as jest.Mocked<typeof bcrypt>;
const mockJwt = jwt as jest.Mocked<typeof jwt>;

describe('AuthService', () => {

    let authService: AuthService;
    let mockUserRepo: jest.Mocked<UserRepository>;

    // beforeEach se ejecuta antes de cada test en este bloque
    beforeEach( () => {

        // Reseteamos los mocks antes de cada prueba para que un test no afecte al otro
        jest.clearAllMocks();
        
        // Creamos una nueva instancia del repositorio mockeado para cada test
        mockUserRepo = new MockedUserRepository() as jest.Mocked<UserRepository>;
        
        // Instanciamos nuestro servicio, inyectándole el repositorio falso
        authService = new AuthService( mockUserRepo );

    });

    // --- Caso de Éxito ---
    test('debería devolver un token y un usuario si las credenciales son correctas', async () => {

        // 1. ARRANGE (Organizar): Preparamos el escenario del test.
        const mockUser = {
            id: 1,
            email: 'test@example.com',
            password: 'hashedPassword', // Contraseña ya hasheada
            role: 'customer',
        };

        const inputPassword = 'password123';
        
        // Configuramos los mocks para que se comporten como queremos
        // Cuando se llame a 'findByEmailWithPassword', debe devolver nuestro usuario falso
        mockUserRepo.findByEmailWithPassword.mockResolvedValue( mockUser as any );
        // Cuando se llame a 'bcrypt.compare', debe devolver 'true' (contraseña correcta)
        mockBcrypt.compare.mockResolvedValue( true as never );
        // Cuando se llame a 'jwt.sign', debe devolver un token falso
        mockJwt.sign.mockImplementation( () => 'fake.jwt.token' );

        // 2. ACT (Actuar): Ejecutamos la función que queremos probar.
        const result = await authService.login(mockUser.email, inputPassword);

        // 3. ASSERT (Afirmar): Verificamos que los resultados sean los esperados.
        expect( result ).toBeDefined();
        expect( result.token ).toBe('fake.jwt.token');
        expect( result.user.id ).toBe( mockUser.id );
        expect( mockUserRepo.findByEmailWithPassword ).toHaveBeenCalledWith(
            mockUser.email, 
            expect.anything() // Le decimos a Jest que espere un segundo argumento de cualquier tipo
        );
        expect( mockBcrypt.compare ).toHaveBeenCalledWith( inputPassword , mockUser.password );

    });

    // --- Caso de Fallo ---
    test('debería lanzar un AppError si la contraseña es incorrecta', async () => {

        // 1. ARRANGE
        const mockUser = { id: 1, email: 'test@example.com', password: 'hashedPassword' };
        const inputPassword = 'wrongPassword';
        
        mockUserRepo.findByEmailWithPassword.mockResolvedValue( mockUser as any );
        // Ahora, bcrypt.compare debe devolver 'false'
        mockBcrypt.compare.mockResolvedValue( false as never );

        // 2. ACT & 3. ASSERT
        // Verificamos que la función *lance* un error.
        await expect( authService.login( mockUser.email , inputPassword ))
        .rejects.toThrow( AppError );
        
        await expect( authService.login( mockUser.email , inputPassword ))
        .rejects.toThrow('Credenciales inválidas.');
    });
});