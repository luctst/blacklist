const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = client;
