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
      const { username, password } = user;
      try {
        // check if username already exists
        const userFromDB = await User.findOne({where: {username}});

        if (userFromDB)
          reject(new Error('Username already exists'));

        const salt    = await bcrypt.genSalt(15);
        user.password = await bcrypt.hash(password, salt);
        const newUser = await User.create(user);

        resolve(newUser);
      } catch(err) {
        reject(err);
      }
    })
  );

  User.comparePasswords = (entered, actual) => {
    return new Promise(async (resolve, reject) => {
      try {
        const isMatch = await bcrypt.compare(entered, actual);
        resolve(isMatch);
      } catch (error) { reject(false); }
    });
  };

  User.getUserByUsername = username => (
    new Promise(async (resolve, reject) => {
      try {
        const user = await User.findOne({where: {username}});
        
        resolve(user);
      } catch (error) {
        reject(error);
      }
    })
  );

  return User;
};