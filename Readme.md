# API de Carros - Documentación

Esta es una API simple para gestionar información de carros utilizando Node.js, Express y MongoDB. Proporciona operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para la entidad "carros". La documentación de la API está generada con Swagger.

## Configuración

1. Asegúrate de tener Node.js y MongoDB instalados en tu sistema.

2. Clona este repositorio en tu máquina:

   ```bash
   git clone https://github.com/vimofama/API_ConstruccionSoftware.git
   ```

3. Instala las dependencias
    ```
    npm install body-parse cors express mongoose swagger-jsdoc swagger-ui-express
    ```

4. Iniciar el servidor
    ```
    node app.js
    ```

## Documentación Swagger
Puedes acceder a la documentación Swagger para explorar y probar la API en un navegador web. Abre tu navegador y visita: https://localhost:3000/api-docs

## Endpoints
* __GET /carros:__ Obtiene la lista de todos los carros.
* __GET /carros/{id}:__ Obtiene un carro por su ID.
* __POST /carros:__ Crea un nuevo carro.
* __PUT /carros/{id}:__ Actualiza un carro por su ID.
* __DELETE /carros/{id}:__ Elimina un carro por su ID.