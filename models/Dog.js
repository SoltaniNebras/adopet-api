const mongoose = require('mongoose');

const DogSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    color: { type: String, required: true },
    weight: { type: Number, required: true },
    distance: { type: String, required: true },
    imagePath: { type: String, required: true },
    description: { type: String, required: true },
   
    personality: { type: String, required: true },
});

module.exports = mongoose.model('Dog', DogSchema);
