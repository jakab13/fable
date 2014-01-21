var mongoose = require('mongoose');

var StorySchema = new mongoose.Schema({
    authorId : String,
    authorName: String,
    title: String,
    body : String,
    picturePath: String,
    createdAt: {type: Date, default: Date.now},
    illustrationPath: String,
    reminderFrom: String,
    reminderTo: String,
    likeCount: Number,
    comments: {
        authorId: String,
        authorName: String,
        body: String,
        createdAt: {type: Date, default: Date.now}
    }
});

var Story = mongoose.model('Story', StorySchema);

module.exports = Story;