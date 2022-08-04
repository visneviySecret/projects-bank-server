const mongoose = require('mongoose');
const Schema = mongoose.Schema

const developSchema = new Schema({
    projectId: String,
    isChecked: Boolean,
    task: String,
    deadline: String,
    role: String,
})

module.exports = mongoose.model('Develop', developSchema)