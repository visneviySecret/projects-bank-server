const mongoose = require('mongoose');
const Schema = mongoose.Schema

const mpvSchema = new Schema({
    projectId: String,
    description: String,
})

module.exports = mongoose.model('MVP', mpvSchema)