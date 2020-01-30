const { MongoClient } = require("mongodb");

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_KEY}@web-timeline-dvcrh.mongodb.net/test?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = async () => {
  const connexion = await client.connect();
  return await connexion.db("blacklist");
};
