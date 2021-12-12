//Old Connect
// const mongoose = require('mongoose');

// const connectdb = async () => {
//   try {
//     await mongoose.connect('mongodb://localhost:27017/db_interview_dev', {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('Connect success mongo db');
//   } catch (err) {
//     console.log(err);
//   }
// };
// module.exports = {
//   connectdb,
// };

// New connect

const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongoServer = new MongoMemoryServer({
  instance: {
    dbName: 'db_interview_dev',
    auth: true,
    port: 27017,
  },
});

const connectdb = async () => {
  try {
    const uri = await mongoServer.getUri();
    const mongooseOpts = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    };
    await mongoose.connect(uri, mongooseOpts);
  } catch (err) {
    console.log(err);
  }
};

const dbDisconnect = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
};

module.exports = {
  connectdb,
  dbDisconnect,
};
