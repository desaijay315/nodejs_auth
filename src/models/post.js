const mongoose = require('mongoose');

const PostSchema  = new mongoose.Schema({
    description:{
        type:String,
        required: true,
        trim: true
    },
    completed:{
        type: Boolean,
        default: false
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post