const mongoose = require('mongoose');
const Schema = mongoose.Schema

const techDesignSchema = new Schema({
    projectId: String,
    description: String,
})

module.exports = mongoose.model('TechDesign', techDesignSchema)