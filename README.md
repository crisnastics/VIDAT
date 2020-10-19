#  Vidat backend

## Requirements
- MariaDB
- MongoDB
- NodeJS
- Nodemon
- NodeJS Package Manager (NPM)
- Curl

## Directory structure
Each subdirectory is an API module
```
└── vidat_backend
    ├── relational_database
    ├── documentary_database
    ├── user_manager
    ├── service_manager
    ├── communication_manager
    ├── pay&evaluate_manager
    └── README.md
```

## Modules
### Relational database
#### MariaDB configuration
Enter as admin user to MariaDB console. Type on bash console
```
mariadb -u admin -p
```
Create an user. Type on MariaDB console
```
CREATE USER 'vidat'@'localhost' IDENTIFIED BY 'password';
```
Create a database. Type on MariaDB console
```
CREATE DATABASE vidat_relational_db;
```
Grant privileges
```
GRANT ALL PRIVILEGES ON vidat_relational_db.* TO 'vidat'@'localhost';
```
To show tables from a database, first select it. Type on MariaDB console
```
USE vidat_relational_db;
SHOW TABLES;
```
#### Initial setup
Install needed packages. Type on bash console
```
sudo npm install --save
```
Start application. Type on bash console
```
nodemon app.js
```
Basic testing. Type on bash console
```
curl localhost:8080
```
```
{"message":"VIDAT BACKEND - RELATIONAL DATABASE"}
```
### Documentary database

#### MongoDB configuration

[Here is the official installation guide](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)

To enter mongo CLI. Type con bash console
```
mongod
```
To switch database. Type on mongod console
```
use vidat_documentary_db
```
Create a user and grant roles
```
db.createUser({user:'vidat',pwd:'password',roles:['readWrite', 'dbAdmin']})
```
Create a collection
```
db.createCollection('<collection_name>')
```
#### Initial setup
Install needed packages. Type on bash console
```
sudo npm install --save
```
Start application. Type on bash console
```
nodemon app.js
```
Basic testing. Type on bash console
```
curl localhost:8080
```
```
{"message":"VIDAT BACKEND - DOCUMENTARY DATABASE"}
```
### User manager

To do

### Service manager

To do

### Communication manager

To do

### Pay & Evaluate manager

To do
