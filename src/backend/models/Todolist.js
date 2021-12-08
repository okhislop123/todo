const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TodolistSchema = new Schema({
  name: { type: String, MaxLength: 50 },
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Doto', TodolistSchema);
