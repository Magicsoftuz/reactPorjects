const fs = require('fs');
const mongoose = require('mongoose');
const Tour = require('./../../model/tourModel');

mongoose
  .connect(
    'mongodb+srv://Plux96:rua.1996@magic.j2nhc.mongodb.net/MagicTOUR?retryWrites=true&w=majority',
    {}
  )
  .then(() => {
    console.log('DB connected');
  })
  .catch((err) => {
    console.log(err);
  });

const data = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

const addInfo = async () => {
  try {
    const addData = await Tour.create(data);
    console.log('Malumotni qushdim');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

const deleteData = async () => {
  try {
    const deleteD = await Tour.deleteMany();
    console.log('Hamma malumot uchdi');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] == '--add') {
  addInfo();
} else if (process.argv[2] == '--delete') {
  deleteData();
}

console.log(process.argv);
