const mongoose = require('mongoose');
const Schema = mongoose.Schema

const exProblemSchema = new Schema({
    projectId: String,
    title: String,
    description: String,
    faq: String
})

module.exports = mongoose.model('ExProblem', exProblemSchema)