const mongoose = require('mongoose');
const env = require('dotenv');
env.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace('<password>', process.env.PASSWORD);

mongoose.connect(DB, {}).then(() => {
  console.log('DB');
});

const tour = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Siz malumot kiritishingiz shart'],
  },
  age: {
    type: Number,
    required: true,
  },
  country: String,
  rating: {
    type: Number,
    default: 4.5,
  },
});

const TourModel = mongoose.model('usersU', tour);

const testData = new TourModel({
  name: 'Umid',
  age: 20,
  country: 'Uzbek',
  rating: 5,
});

testData.save().then((doc) => {
  console.log(doc);
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, env.URL);
