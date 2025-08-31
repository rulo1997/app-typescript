# API REST para E-commerce con Arquitectura Limpia

![Node.js](https://img.shields.io/badge/Node.js-22.x-green.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)
![Express.js](https://img.shields.io/badge/Express.js-4.x-orange.svg)
![Sequelize](https://img.shields.io/badge/Sequelize-6.x-blueviolet.svg)
![Estado](https://img.shields.io/badge/Estado-En%20Desarrollo-yellow.svg)

## 📖 Visión del Proyecto

Este proyecto es el backend de un E-commerce, desarrollado no solo para cumplir con las funcionalidades requeridas, sino como un caso de estudio práctico en la implementación de **arquitecturas de software limpias, escalables y mantenibles** en el ecosistema de Node.js y TypeScript.

El objetivo principal es construir una API robusta, bien estructurada y fácil de probar, siguiendo principios de diseño como **SOLID** y patrones de arquitectura reconocidos en la industria.

## ✨ Características Principales

* **Arquitectura en Capas:** Clara separación de responsabilidades entre la capa de presentación (Controladores), lógica de negocio (Servicios) y acceso a datos (Repositorios).
* **Código Fuertemente Tipado:** Uso de TypeScript para garantizar la seguridad de tipos, mejorar el autocompletado y reducir errores en tiempo de ejecución.
* **Validación Profesional:** Implementación de validaciones de formato y de negocio desacopladas de la lógica principal.
* **Manejo de Errores Centralizado:** Un único punto para gestionar todos los errores de la aplicación, asegurando respuestas consistentes y seguras.
* **Seguridad:** Hasheo de contraseñas utilizando `bcryptjs`.
* (Próximamente) Autenticación y autorización basadas en JSON Web Tokens (JWT).
* (Próximamente) CRUD completo para Productos, Categorías y más.

## 🛠️ Tech Stack

* **Runtime:** Node.js
* **Framework:** Express.js
* **Lenguaje:** TypeScript
* **ORM:** Sequelize v6
* **Base de Datos:** MySQL (gestionada con Docker)
* **Validación:** `express-validator`
* **Seguridad:** `bcryptjs`

## 🏛️ Arquitectura y Patrones de Diseño

La API está diseñada siguiendo una **Arquitectura en Capas** para desacoplar las responsabilidades:



* **Rutas (`.routes.ts`):** Definen los endpoints y aplican middlewares de validación.
* **Controladores (`.controller.ts`):** Orquestan el flujo HTTP (`req`, `res`), delegan la lógica al servicio y manejan las respuestas. Son "delgados" por diseño.
* **Servicios (`.service.ts`):** Contienen toda la lógica de negocio. Son el cerebro de la aplicación y no conocen nada sobre HTTP.
* **Repositorios (`.repository.ts`):** Abstraen el acceso a la base de datos. Es la única capa que interactúa directamente con los modelos de Sequelize.

Este diseño, junto al uso del **Patrón Repositorio** y la **Inyección de Dependencias** (manual), hace que el código sea altamente testeable y fácil de escalar.

## 🚀 Cómo Empezar

Sigue estos pasos para levantar el entorno de desarrollo local.

1.  **Clonar el repositorio:**
    ```bash
    git clone [https://github.com/rulo1997/app-typescript](https://github.com/tu-usuario/tu-repositorio.git)
    cd tu-repositorio
    ```

2.  **Crear el archivo de variables de entorno:**
    Copia `.env.example` a un nuevo archivo `.env` y ajusta las credenciales de la base de datos si es necesario.
    ```bash
    cp .env.example .env
    ```

3.  **Instalar dependencias:**
    ```bash
    npm install
    ```

4.  **Levantar la base de datos con Docker:**
    Asegúrate de tener Docker instalado y corriendo.
    ```bash
    docker-compose up -d
    ```

5.  **Ejecutar la aplicación en modo de desarrollo:**
    ```bash
    npm run dev
    ```
    La API estará disponible en `http://localhost:3000`.

## Endpoints de la API

| Verbo  | Endpoint          | Descripción                  |
| :----- | :---------------- | :--------------------------- |
| `POST` | `/api/users`      | Registra un nuevo usuario.   |
| `GET`  | `/api/users`      | Lista todos los usuarios. |

---
## ✍️ Autor

**[Tu Nombre Completo]**

* **LinkedIn:** https://www.linkedin.com/in/vallejosmatias/
* **GitHub:** https://github.com/rulo1997/app-typescript