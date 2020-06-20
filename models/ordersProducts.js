module.exports = (sequelize, type) => {
    return sequelize.define('order-products', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        
        order_id1: type.INTEGER,
        products_id1: type.INTEGER,
    })
}