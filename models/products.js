module.exports = (sequelize, type) => {
    return sequelize.define('products', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        product_name: type.STRING,
        product_price: type.INTEGER,
        product_photo: type.STRING(500)
    })
};
