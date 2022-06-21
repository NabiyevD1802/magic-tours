const mongoose = require('mongoose');
const fs = require('fs');
const tourModel = require('./../../model/tourModel');
const env = require('dotenv');
env.config({ path: './config.env' });
const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.PASSWORD
).replace('<username>', process.env.LOGIN);

mongoose
  .connect(DB, {})
  .then(() => {
    console.log('DB connected');
  })
  .catch((err) => {
    console.log(`ERROR: ${err}`);
  });

const data = JSON.parse(
  fs.readFileSync('./dev-data/data/tours-simple.json', 'utf-8')
);

const addData = async () => {
  try {
    const add = await tourModel.create(data);
    console.log('Saqladi');
  } catch (err) {
    console.log('Saqlamadi!!!');
  }
};

const deleteData = async () => {
  try {
    const deleted = await tourModel.deleteMany();
    console.log('Top-toza');
  } catch (err) {
    console.log('Tozalamadi');
  }
};
addData();
