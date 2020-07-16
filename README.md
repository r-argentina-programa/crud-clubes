# crud-clubes

Un CRUD/ABM (Create, Retrieve, Update, Delete ó Alta, Baja, Modificación) de clubes de fútbol

## Diagrama

## Cómo instalar y correr este proyecto

El proyecto se instala con `npm install`
El proyecto se corre con:

```
npm run start # corre el proyecto en modo producción
npm run dev # corre el proyecto en modo desarrollo
npm run test # corre el proyecto con tests de jest y recolecta el code coverage
npm run test:ui # corre pruebas de interfaz en modo "headless"
npm run test:ui:dev # corre pruebas de interfaz con un navegador con el que se puede interactuar
npm run test:integration # corre pruebas de newman (postman)
```

## Estructura de este proyecto

Adaptado de https://softwareontheroad.com/ideal-nodejs-project-structure/

```
data                # contiene las bases de datos de SQLite (producción y prueba)
│    data.sqlite    # Base de datos en producción (para este proyecto de ejemplo)
│    test.sqlite    # Base de datos para pruebas (esto se puede usar en proyectos reales)
└─── migrations     # contiene las migraciones
└─── migrations
src
│    app.js         # Punto de entrada de la aplicación
└─── controller     # Rutas de express
└─── config         # Configuración de variables de entorno
└─── job            # Procesamiento por baches/cronjobs
└─── loader         # Divide el proceso de inicialización en varios módulos
└─── model          # Módulos de base de datos
└─── service        # Toda la lógica de negocio
└─── view           # Archivos de presentación (frontend) de este módulo
```

## Configuración del IDE

El IDE debe soportar Prettier + ESLint, como por ejemplo (vscode)[https://blog.echobind.com/integrating-prettier-eslint-airbnb-style-guide-in-vscode-47f07b5d7d6a]
