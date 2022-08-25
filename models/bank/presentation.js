const mongoose = require('mongoose');
const Schema = mongoose.Schema

const problemSchema = new Schema({
    projectId: String,
    file: String,
})

module.exports = mongoose.model('Problem', problemSchema)