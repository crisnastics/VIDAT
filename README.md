#  FRONTEND VIDAT 
## About

Se considera en esta rama la implementación de la interfaz para el demandante del proyecto vidat. Para este proyecto de memoria se busca crear un puente entre un oferente de servicio con un adulto mayor. A grandes razgos, la aplicación permite a un usuario demandante registrado, solicitar un servicio, según un perfil y horarios disponibles de un profesional de la salud certificado. Junto a ello permite comunicación directa entre las dos partes.

## Requirements

- Nodejs
- Expo
- Mysql
- npm

## Config
 
Primero clone el repositorio. Como aún no se tiene conectado el backend con el frontend, se configuró primero una API local y una base de datos. El modelo se encuentra en \Rest-API-msyql\db\mydb. Debe levantar el servicio de mysql (xampp por ejemplo) y copiar el .sql para crear la bd local.

Ahora debe levartar la API. Primero situarse en la carpeta, en su directorio local, e instalar las dependencias con algun gestor de paquetes (npm o yarn)

```bash
    cd ..\Rest-API-msyql
```

```bash
    npm install 
```
Una vez terminado puede levantar la API.

```bash
    npm start
```

Deberá aparecer por consola "bd connected". Ahora, debe descargar la aplicación "Expo" en un dispositivo móvil, o en una máquina virtual con iOS o Android,  que le permitirá visualizar la interfaz del proyecto. 


El proyecto tiene varias dependencias que necesitará instalar, como Expo, React-native, React, entre muchas otras. Para ello situarse en el proyecto e instalar

```bash
    cd ..\myNewProject
```

```bash
    npm install
```

Cuando haya finalizado la descarga, deberá entrar al proyecto y en el archivo config.json, colocar su ip con la que sale a internet. Sino no podrá hacer fetch con la api que esta corriendo local. Ahora esta listo para levantar el prototipo.

```bash
    expo start
```
En su dispositivo móvil, si tiene iOS escanear el QR que le aparecerá en la consola o en el localhost que se abrió automaticamente. De tener Andorid ingresar a la aplicación expo descargada previamente conectadas a la misma red (si desea puede configurar sus credenciales).
