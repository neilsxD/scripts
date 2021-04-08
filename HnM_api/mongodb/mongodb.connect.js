const mongodb = require("mongodb").MongoClient;

const connectionString =
  "mongodb+srv://neils:@123@cluster0.n5a5l.mongodb.net/hnmScraping?retryWrites=true&w=majority";

async function connect() {
  try {
    const client = await mongodb.connect(connectionString, {
      useNewUrlParser: true,
    });
    console.log("connected to mongodb");
    return client;
  } catch (err) {
    console.log(err);
  }
}

module.exports = connect;
