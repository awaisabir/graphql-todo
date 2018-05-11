export default (sequelize, DataTypes) => {
    const Todo = sequelize.define('todo', {
        title: DataTypes.TEXT,
        description: DataTypes.ARRAY(DataTypes.TEXT),  
        completed: {
            type: DataTypes.BOOLEAN,
            default: false,
        }
    });

    return Todo;
};