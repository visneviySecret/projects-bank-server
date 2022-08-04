const mongoose = require('mongoose');
const Schema = mongoose.Schema

const problemSchema = new Schema({
    projectId: String,
    title: String,
    description: String,
})

module.exports = mongoose.model('Problem', problemSchema)