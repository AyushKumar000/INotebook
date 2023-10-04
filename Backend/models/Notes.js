const {Schema, model, default: mongoose} = require('mongoose');

const NotesSchema = new Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    title : {
        type : String,
        require : true
    },
    description : {
        type : String,
        require : true
    },
    tag : {
        type :String,
        default : 'General'
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
});

module.exports = new model('notes',NotesSchema);