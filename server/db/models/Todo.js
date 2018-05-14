export default (sequelize, DataTypes) => {
    const Todo = sequelize.define('todo', {
        title: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        description: {
          type: DataTypes.ARRAY(DataTypes.TEXT),
          allowNull: false,
        },
        completed: {
            type: DataTypes.BOOLEAN,
            default: false,
            allowNull: false,
        }
    });

    return Todo;
};