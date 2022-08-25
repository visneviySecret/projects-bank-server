const mongoose = require('mongoose');
const Schema = mongoose.Schema

const finalySchema = new Schema({
    projectId: String,
    isChecked: Boolean,
    task: String,
    deadline: String,
    role: String,
})

module.exports = mongoose.model('Finaly', finalySchema)