const { MongoClient } = require("mongodb");

module.exports = async function() {
  try {
    return await MongoClient.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  } catch (error) {
    throw error;
  }
};
