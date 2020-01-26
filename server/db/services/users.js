const db = require("../index");

/**
 * Create a new user
 */
async function POST() {
  console.log(await db());
  return {
    data: {
      message: "OK"
    }
  };
}

function PUT() {}
function DELETE() {}

module.exports = {
  POST,
  PUT,
  DELETE
};
