const mongoose = require('mongoose');
const Schema = mongoose.Schema

const personSchema = new Schema({
    projectId: String,
    avatar: String,
    name: String,
    role: String
})

module.exports = mongoose.model('Person', personSchema)