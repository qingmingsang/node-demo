var Sequelize = require('sequelize');

var sequelize = new Sequelize(
    'postgres',
    'postgres',
    'admin', {
        host: 'localhost',
        dialect: 'postgres',
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        }
    });

sequelize
    .authenticate()
    .then(function (err) {
        console.log('Connection has been established successfully.');
    })
    .catch(function (err) {
        console.log('Unable to connect to the database:', err);
    });

// definition
var Task = sequelize.define('Task', {
    // auto increment, primaryKey, unique
    id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, unique: true},

    // comment
    title: {type: Sequelize.STRING, comment: 'Task title'},

    // allow null
    description: {type: Sequelize.TEXT, allowNull: true},

    // default value
    deadline: {type: Sequelize.DATE, defaultValue: Sequelize.NOW}
});

