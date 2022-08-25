const mongoose = require('mongoose');
const Schema = mongoose.Schema

const problemSchema = new Schema({
    projectId: String,
    name: String,
    quantity: Number,
    coast: Number,
    url: String
})

module.exports = mongoose.model('Problem', problemSchema)