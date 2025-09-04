module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    // Directorios que Jest debe ignorar
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    // Configuración para que Jest sepa cómo manejar los tests
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
    // Patrón para que Jest reconozca los archivos de prueba
    // Buscará cualquier archivo .ts o .js que termine en .test o .spec
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]s$',
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
    // Un script que se ejecuta una vez antes de toda la suite de tests
    // Lo crearemos a continuación para limpiar la base de datos de prueba
    // globalSetup: './src/tests/setup.ts',
};