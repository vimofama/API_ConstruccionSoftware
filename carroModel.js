const mongoose = require('mongoose');

const carroSchema = new mongoose.Schema({
  marca: { type: String, required: true },
  modelo: { type: String, required: true },
  año: { type: Number, required: true },
});

const Carro = mongoose.model('Carro', carroSchema);

module.exports = Carro;
