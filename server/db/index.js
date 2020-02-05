const { MongoClient } = require("mongodb");

module.exports = new MongoClient(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
