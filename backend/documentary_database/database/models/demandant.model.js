const mongoose = require('mongoose');

const demandant = new mongoose.Schema({
    _id: {type: String},
    photos: [String],
});

const Demandant = mongoose.model('demandant', demandant);
module.exports = Demandant;