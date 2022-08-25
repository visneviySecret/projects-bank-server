const mongoose = require('mongoose');
const Schema = mongoose.Schema

const goalSchema = new Schema({
    projectId: String,
    description: String,
})

module.exports = mongoose.model('Goal', goalSchema)