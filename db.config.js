const Sequelize = require('sequelize');

const ProductModel = require('./models/products');
const UserModel = require('./models/users');
const OrderModel = require('./models/orders');

const sequelize = new Sequelize('delilah-resto', 'root', null, {
    host: 'localhost',
    dialect: 'mysql'
});

const Product = ProductModel(sequelize, Sequelize);
const User = UserModel(sequelize, Sequelize);
const Order = OrderModel(sequelize, Sequelize);

// Relationships between tables

User.hasMany(Order);
Order.belongsTo(User);
Product.belongsToMany(Order, { through: 'ordersProducts' });
Order.belongsToMany(Product, { through: 'ordersProducts' });

/*  status: "Pending",
    price: 300,
    pay_method: "cash",
    userId: 2,
    productId: 1,
}),*/


sequelize.sync({ force: false}) // If you change it to true statement, the DB will be dropped and resynced.
.then(() => {
    console.log('Tablas sincronizadas')
});

module.exports = {
    Product,
    User,
    Order
}