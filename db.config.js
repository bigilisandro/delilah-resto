const Sequelize = require('sequelize');
const ProductModel = require('./models/products');
const UserModel = require('./models/users');
const OrderModel = require('./models/orders');

// Configuración de la base de datos
const sequelize = new Sequelize('delilah-resto', 'root', null, {
    host: 'localhost',
    dialect: 'mysql'
});

// Genera las tablas
const Product = ProductModel(sequelize, Sequelize);
const User = UserModel(sequelize, Sequelize);
const Order = OrderModel(sequelize, Sequelize);

// Relaciones entre las tablas
User.hasMany(Order);
Order.belongsTo(User);
Product.belongsToMany(Order, { through: 'ordersProducts' });
Order.belongsToMany(Product, { through: 'ordersProducts' });

sequelize.sync({ force: false}) // Si lo cambias a true, la DB se va a eliminar y sincronizar nuevamente.
.then(() => {
    console.log('Tablas inicializadas.');
});

module.exports = {
    Product,
    User,
    Order
}