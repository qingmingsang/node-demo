var Sequelize = require('sequelize');

var sequelize = new Sequelize('postgres', 'postgres', 'admin', {
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
    .then(function(err) {
        console.log('Connection has been established successfully.');
    })
    .catch(function (err) {
        console.log('Unable to connect to the database:', err);
    });

var User = sequelize.define('user', {
    firstName: {
        type: Sequelize.STRING,
        field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
    },
    lastName: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true // Model tableName will be the same as the model name
});

//User.sync({force: true}).then(function () {//{force: true}每次创建前会先删除表
//    // Table created
//    return User.create({
//        firstName: 'John',
//        lastName: 'Hancock'
//    });
//});
//User.sync().then(function () {
//    // Table created
//    return User.create({
//        firstName: 'John',
//        lastName: 'Hancock'
//    });
//});
//User.findOne().then(function (user) {
//    console.log(user.get('firstName'));
//});
//User.findAll().then(function(projects) {
//    console.log(projects);//显示所有结构
//})
User.findAll().spread(function(user, created) {
    console.log(user.get('firstName'))
    console.log(created)//显示所有结构
})
var Pub = Sequelize.define('pub', {
    name: { type: Sequelize.STRING },
    address: { type: Sequelize.STRING },
    latitude: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
        validate: { min: -90, max: 90 }
    },
    longitude: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
        validate: { min: -180, max: 180 }
    },
}, {
    validate: {
        bothCoordsOrNone: function() {
            if ((this.latitude === null) !== (this.longitude === null)) {
                throw new Error('Require either both latitude and longitude or neither')
            }
        }
    }
})