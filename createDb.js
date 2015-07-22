var async = require('async');
var mongoose = require('backend/libs/mongoose');


async.series([
    open,
    dropDatabase,
    requireModels,
    createUsers
], function (err, result) {
    console.log(arguments);
   mongoose.disconnect();
});

function open (callback) {
    mongoose.connection.on('open', callback);
};

function dropDatabase (callback) {    
    var db = mongoose.connection.db;
    db.dropDatabase(callback);
};

function requireModels (callback) {
    require('backend/models/user');

    async.each(Object.keys(mongoose.models), function (modelName, callback) {
        mongoose.models[modelName].ensureIndexes(callback);
    }, callback);
};

function createUsers (callback) {

    var users = [
        {username: 'admin', password: 'pass', userLevel: 100},
        {username: 'petya', password: 'pass', userLevel: 10}
    ];

    async.each(users, function (userData, callback) {
        var user = new mongoose.models.User(userData);
        user.save(callback);
    }, callback);
};


