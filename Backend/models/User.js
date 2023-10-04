const {Schema, model} = require('mongoose');

const UsersSchema = new Schema({
    name : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true,
        unique : true
    },
    password : {
        type :String,
        require : true,
        unique : true
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
});

module.exports = new model('user',UsersSchema);