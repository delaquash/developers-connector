const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        // This makes user connected to a post, to be able to update and delete post too
        ref: 'users'
    },
    text: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    avatar: {
        type: String
    },
    // To like a post just like IG or FB
    likes: [{
        user: {
            type: Schema.Types.ObjectId,
            // eference the user that likes the post
            ref: 'users'
        }
    }],
    comments: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'users'
        },
        text: {
            type: String,
            required: true
        },
        name: {
            type: String
        },
        avatar: {
            type: String
        },
        // Date for comment
        date: {
            type: Date,
            default: Date.now
        }
    }],
    // Date for actual Post
    date: {
        type: Date,
        default: Date.now
    }
});
module.exports = Post = mongoose.model('post', PostSchema);