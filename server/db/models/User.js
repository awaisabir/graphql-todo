import bcrypt from 'bcryptjs';

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

    User.saveUser = user => (
        new Promise (async (resolve, reject) => {
            try {
                const salt    = await bcrypt.genSalt(15);
                user.password = await bcrypt.hash(user.password, salt);
                const newUser = await User.create(user);
                resolve(newUser);
            } catch(err) {
                reject(err);
            }
        })
    )

    return User;
};