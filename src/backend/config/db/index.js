const mongoose = require('mongoose');

const connect = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/db_interview_dev', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connect success mongo db');
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  connect,
};
