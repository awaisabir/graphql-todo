export default (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        username: {
            type: DataTypes.TEXT,
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    });

    User.associate = models => {
        User.hasMany(models.Todo);
    }

    return User;
};