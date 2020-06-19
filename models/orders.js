module.exports = (sequelize, type) => {
    return sequelize.define('orders', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        order_status: type.STRING,
        order_description: type.STRING,
        order_amount: type.INTEGER,
        payment_method: type.STRING
    })
};
