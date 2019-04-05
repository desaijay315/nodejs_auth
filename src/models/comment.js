const mongoose = require('mongoose');

const CommentSchema  = new mongoose.Schema({
    comment:{
        type:String,
        trim: true
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    postId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Post'
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment