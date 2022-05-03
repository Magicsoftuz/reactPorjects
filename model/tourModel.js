const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Siz nameni kiritishingiz shart'],
    unique: true,
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, 'Siz duration kiritishingiz shart'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'Siz Group size ni kiritishingiz shart'],
  },
  difficulty: {
    type: 'String',
    required: [true, 'Siz difficulty ni kiritishingiz shart'],
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'Siz price ni kiritishingiz shart'],
  },
  summary: {
    type: String,
    trim: true,
    required: [true, 'Siz summary ni kiritishingiz shart'],
  },
  description: {
    type: String,
    trim: true,
    required: [true, 'Siz description ni kiritishingiz shart'],
  },
  imageCover: {
    type: String,
    required: [true, 'Siz image cover ni kiritishingiz shart'],
  },
  images: [String],
  startDates: [Date],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Tour = mongoose.model('users', tourSchema);

module.exports = Tour;
