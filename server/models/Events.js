const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  email: String,
  eventName: String,
  keyValue: String,
});

const Events = mongoose.model('Events', eventSchema);

module.exports = Events;
