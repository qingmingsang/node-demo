var caminte = require('caminte');
var Schema = caminte.Schema;
var config = {
    driver: "postgres",
    host: "localhost",
    port: "5432",
    username: "postgres",
    password: "admin",
    database: "postgres",
    pool: true // optional for use pool directly
};

var schema = new Schema(config.driver, config);
// define models
var Post = schema.define('Post', {
    title: {type: schema.String, limit: 255},
    userId: {type: schema.Number},
    content: {type: schema.Text},
    created: {type: schema.Date, default: Date.now},
    updated: {type: schema.Date},
    published: {type: schema.Boolean, default: false, index: true}
});

var User = schema.define('User', {
    name: {type: schema.String, limit: 255},
    bio: {type: schema.Text},
    email: {type: schema.String, limit: 155, unique: true},
    approved: {type: schema.Boolean, default: false, index: true},
    joinedAt: {type: schema.Date, default: Date.now},
    age: {type: schema.Number},
    gender: {type: schema.String, limit: 10}
});
schema.autoupdate(start);

function start() {

// setup hooks
    Post.afterUpdate = function (next) {
        this.updated = new Date();
        this.save();
        next();
    };

// define any custom method for instance
    User.prototype.getNameAndAge = function () {
        return this.name + ', ' + this.age;
    };

// define scope
    Post.scope('active', {published: true});

// setup validations
    User.validatesPresenceOf('name', 'email');
    User.validatesUniquenessOf('email', {message: 'email is not unique'});
    User.validatesInclusionOf('gender', {in: ['male', 'female']});
    User.validatesNumericalityOf('age', {int: true});

// setup relationships
    User.hasMany(Post, {as: 'posts', foreignKey: 'userId'});

// Common API methods
    var user = new User({
        name: 'Alex',
        email: 'example@domain.aga',
        age: 40,
        gender: 'male'
    });


    user.isValid(function (valid) {
        if (!valid) {
            return console.log(user.errors);
        }
        user.save(function (err) {
            if (!err) {
                return console.log(err);
            }
            console.log('User created');
            User.all(function (err, users) {
                console.log(users);
            });
        });
    })

}