import Sequelize from 'sequelize';

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    dialect: 'postgres',
    //logging: false
});

console.log(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD);


const models = {
    User: sequelize.import('./models/User.js'),
    Todo: sequelize.import('./models/Todo.js')
};

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
