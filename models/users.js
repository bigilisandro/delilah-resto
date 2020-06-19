module.exports = (sequelize, type) => {
    return sequelize.define('user', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: type.STRING(45),
            unique: true,
            allowNull: false
        },
        email: type.STRING(45),
        password: type.STRING(150),
        firstname: type.STRING(45),
        lastname: type.STRING(45),
        address: type.STRING(45),
        phone_number: type.STRING(45),
        role: type.STRING(10)
    }); 
}