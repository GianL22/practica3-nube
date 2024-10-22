# 🐳 Servicio Web con Docker

### 👥 Integrantes del equipo
Este proyecto fue desarrollado por los siguientes miembros del equipo:

- [**Gianfranco Lanza**](https://github.com/GianL22)
- [**Sandro Portanova**](https://github.com/Sspa1)
- [**David Roldán**](https://github.com/deroldan26)


## 🌐 Descripción del proyecto

En la asignatura Computación en la Nube, nuestro profesor mostró un servicio web empleando Django REST Framework y Python. La tarea asignada fue crear un servicio similar utilizando un framework de desarrollo web diferente. En esta ocasión, elegimos desarrollar nuestro servicio utilizando **NestJS** como framework de desarrollo web y **MongoDB** como base de datos NoSQL para almacenar los datos.

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
  <a href="https://mongodb.com/" target="blank"> <img src="https://www.vectorlogo.zone/logos/mongodb/mongodb-icon.svg" alt="MongoDB Logo" width="200"/></a>
 

### 📦 Esquema del objeto

Cada objeto o directorio sigue este esquema:

```json
{
   "name": "Rómulo Rodríguez",
   "emails": [
       "rjrodrig@ucab.edu.ve",
       "rjrodriguezr.12@est.ucab.edu.ve"
   ]
}
```

### 📚 Endpoints

El servicio web implementado proporciona los siguientes endpoints:

- **GET** `/status/` - Responde con un simple mensaje: `pong`.
- **GET** `/directories/` - Devuelve una lista de directorios.
- **POST** `/directories/` - Crea un nuevo directorio.
- **GET** `/directories/{id}` - Recupera un directorio por su ID.
- **PUT** `/directories/{id}` - Actualiza un directorio completamente.
- **PATCH** `/directories/{id}` - Actualiza parcialmente un directorio.
- **DELETE** `/directories/{id}` - Elimina un directorio.

## 🚀 Instalación

### Clonar el repositorio:

```bash
git clone https://github.com/GianL22/practica3-nube.git
```
```bash
cd practica3-nube
```


### Configurar las variables de entorno

Renombra el archivo `example.env` a `.env` y configura las variables de entorno necesarias para el proyecto.

### Ejecutar la aplicación

```bash
docker compose up -d
```
