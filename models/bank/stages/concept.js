const mongoose = require('mongoose');
const Schema = mongoose.Schema

const conceptSchema = new Schema({
    projectId: String,
    isChecked: Boolean,
    task: String,
    deadline: String,
    role: String,
})

module.exports = mongoose.model('Concept', conceptSchema)