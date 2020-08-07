# crud-clubes

Un CRUD/ABM (Create, Retrieve, Update, Delete ó Alta, Baja, Modificación) de clubes de fútbol

## Diagrama

<img src="./crud_clubes_simple.png">

## Cómo instalar y correr este proyecto

El proyecto se instala con `npm install`

Una vez instalado, hay que copiar el archivo `.env.dist` y a su copia, ponerle `.env` y completar los valores que están puestos dentro `LLAVE=VALOR`.

El proyecto se corre con:

```
npm run start # corre el proyecto en modo producción
npm run dev # corre el proyecto en modo desarrollo
npm run schema:sync # sincroniza la base de datos de sesión y la base de datos principal con los modelos definidos
npm run test # corre tests de jest y recolecta el code coverage
npm run test:dev # corre tests de jest de manera continua (watch)
npm run test:ui # corre pruebas de interfaz en modo "headless"
npm run test:ui:dev # corre pruebas de interfaz con un navegador con el que se puede interactuar
npm run test:integration # corre pruebas de newman (postman)
```

## Estructura de este proyecto

Adaptado de https://softwareontheroad.com/ideal-nodejs-project-structure/

| Ruta                             | explicación                                                                                                                   |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| public                           | contiene los archivos estáticos que va a servir el navegador, acá se guardan las imágenes subidas                             |
| src                              | contiene toda nuestra aplicación                                                                                              |
| src/app.js                       | punto de entrada de nuestra aplicación                                                                                        |
| src/config                       | configuración de nuestra aplicación                                                                                           |
| src/config/di.js                 | configuración de dependencias (Dependency Injection)                                                                          |
| src/module                       | contiene cada uno de los módulos de nuestra aplicación                                                                        |
| src/module/view                  | contiene vistas comunes a todos los módulos                                                                                   |
| src/module/view/layout           | contiene layouts comunes a todos los módulos                                                                                  |
| src/module/view/layout/base.html | contiene el layout base de todas las vistas                                                                                   |
| src/module/abstractController.js | controlador abstracto base (por ahora sin funcionalidad)                                                                      |
| src/module/club                  | todo lo que tiene que ver con clubes                                                                                          |
| src/module/club/controller       | punto de entrada a nuestro controlador, maneja requests de HTTP                                                               |
| src/module/club/entity           | la entidad Club de nuestro dominio                                                                                            |
| src/module/club/job              | trabajos en bache realizados por este módulo (en este caso hay un único trabajo que se baja datos de la API de open football) |
| src/module/club/mapper           | mapea desde o hacia la entidad de club                                                                                        |
| src/module/club/repository       | interactúa con la capa de acceso a datos (DAL) y devuelve entidad(es)                                                         |
| src/module/club/service          | lógica de negocio de nuestra aplicación                                                                                       |
| src/module/club/view             | archivos de presentación (interfaz) que se procesarán del lado del servidor (SSR, server side rendering)                      |
| src/module/club/module.js        | archivo de entrada a este módulo que lo inicializa                                                                            |

## Configuración del IDE

El IDE debe soportar Prettier + ESLint, como por ejemplo (vscode)[https://blog.echobind.com/integrating-prettier-eslint-airbnb-style-guide-in-vscode-47f07b5d7d6a]
