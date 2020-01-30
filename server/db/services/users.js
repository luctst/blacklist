const db = require("../index");

/**
 * Create a new user
 * @param {Object} body Data send by the request
 */
async function POST(body) {
  const b = Object.keys(body);

  if (b.length !== 1) {
    return {
      error: true,
      code: 400,
      data: {
        status: 400,
        message: "The body should only contains a pseudo property."
      }
    };
  }

  if (b[0] !== "pseudo") {
    return {
      error: true,
      code: 400,
      data: {
        status: 400,
        message: "Request body should have a pseudo property."
      }
    };
  }

  if (typeof body.pseudo !== "string") {
    return {
      error: true,
      code: 400,
      data: {
        status: 400,
        message: "Pseudo property should be a string."
      }
    };
  }

  const users = (await db()).collection("users");
  const r = await users.findOne({ ...body });

  if (r === null) {
    await users.insertOne({ pseudo: body.pseudo });

    return {
      data: {
        status: 200,
        message: "User created"
      }
    }
  }

  return {
    error: true,
    code: 409,
    data: {
      status: 409,
      message: "User already exist."
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
