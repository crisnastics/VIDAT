const mongoose = require('mongoose');

const offeror = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    photos: [String],
});

const Offeror = mongoose.model('offeror', offeror);
module.exports = Offeror;