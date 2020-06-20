# ** REST API DELILAH RESTO**

**A REST API for your own restaurant.**

This proyect is about a Restful API where you can manage a list of users, orders and products in a restaurant.
It's connected with a MySQL database in which you store all the information.

This README.md will guide you to install and use this application.

## Getting Started

## Clone the repo wherever you want to put it

$ git clone https://github.com/bigilisandro/delilah-resto.git

or just download the ZIP directly from Github

## To install the dependencies

*npm install* or *yarn install*

This will automatically install all the dependencies used in this project.

## Set up your database

The API starts will a database created named "delilah-resto" so you can configure it in the file *db.config.js*
If you are using PHPMyAdmin or another DB Admin create a database and replace this following piece of code in the
file for the ones of your database.

````js
const sequelize = new Sequelize('delilah-resto', 'root', null, {
    host: 'localhost',
    dialect: 'mysql'
});
````

The API will create the tables automatically. The tables are going to be empty at first.

## Run the API

Initialize the MySQL Server. In this case we use XAMPP Control Panel and starts Apache and MySQL.

With Nodejs - *node index.js*

With Nodemon - *nodemon index.js*

This will start the application in the PORT in which your machine is configured or if not it will start for default on PORT 3000

http://localhost:3000/

## Checking if it's running correctly

http://localhost:3000/api

Should return *Welcome to the REST API of Delilah Resto.*

## Testing the API

You can use POSTMAN or similar to check it.

## Middelwares

*checkToken*: When the user login, the API will automatically generate a JWT User Token. You should copy that token
and use it wherever it's requested putting it in the Headers of the request with the key "user-token". It expires after
60 minutes, so after that you should login again and generate a new JWT User Token.

*isAdmin*: This middelware is use to check if the user has the permission for the request. In the body of the user you should put 
"key: role, value: admin" if the user is an administrator user.

See more in - [Middelwares](/routes/middelwares.js)

## USERS

POST - Register a user

http://localhost:3000/api/users/register

*Body request: username, password, firstname, lastname, email*

POST - Login a user

http://localhost:3000/api/users/login

*Body request: username, password, email*

GET - Get all users

http://localhost:3000/api/users/allUsers

*Middelwares required: checkToken, isAdmin*

GET - Get a user

http://localhost:3000/api/users/:userId

*Middelwares required: checkToken*

PUT - Edit a user

http://localhost:3000/api/users/:userId

*Middelwares required: checkToken, isAdmin*
*Body request: Edit the key you can to edit*

DELETE - Remove a user

http://localhost:3000/api/users/:userId

*Middelwares required: checkToken, isAdmin*

## Products

GET - Obtain all products

http://localhost:3000/api/products/

*No middelwares required*

GET - Obtain one product

http://localhost:3000/api/products/:productId

*No middelwares required*

POST - Generate a product

http://localhost:3000/api/products/

*Middelwares required: checkToken, isAdmin*
*Body request: product_name, product_price, product_photo*

PUT - Edit a product

http://localhost:3000/api/products/:productId

*Middelwares required: checkToken, isAdmin*
*Body request: Edit the key you can to edit*

DELETE - Remove a product

http://localhost:3000/api/products/:productId

*Middelwares required: checkToken, isAdmin*

## ORDERS

GET - Obtain all orders

http://localhost:3000/api/orders/

*Middelwares required: checkToken, isAdmin*

GET - Obtain one order

http://localhost:3000/api/orders/:orderId

*Middelwares required: checkToken, isAdmin*

POST - Generate a order

http://localhost:3000/api/order/

*Middelwares required: checkToken*
*Body request: order_description, payment_method*

PUT - Edit a order

http://localhost:3000/api/orders/:orderId

*Middelwares required: checkToken, isAdmin*
*Body request: Edit the key you can to edit*

DELETE - Remove a order

http://localhost:3000/api/orders/:orderId

*Middelwares required: checkToken, isAdmin*

## Dependencies used

````json
"dependencies": {
    "bcryptjs": "^2.4.3",
    "body-parser": "^1.19.0",
    "express": "^4.17.1",
    "express-validator": "^6.5.0",
    "jwt-simple": "^0.5.6",
    "moment": "^2.26.0",
    "mysql2": "^2.1.0",
    "sequelize": "^5.21.12"
}
``