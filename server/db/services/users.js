const db = require("../index");

/**
 * Create a new user
 * @param {Object} body Data send by the request
 */
async function POST(body) {
  const b = Object.keys(body);

  if (b.length !== 2) {
    return {
      code: 400,
      data: {
        status: 400,
        message: "The body should only contains pseudo and pswd property."
      }
    };
  }

  if (b[0] !== "pseudo" || b[1] !== "pswd") {
    return {
      code: 400,
      data: {
        status: 400,
        message: "Request body should have a pseudo and pswd property."
      }
    };
  }

  if (typeof body.pseudo !== "string" || typeof body.pswd !== "string") {
    return {
      code: 400,
      data: {
        status: 400,
        message: "properties should be string."
      }
    };
  }

  const users = (await db()).collection("users");
  const r = await users.findOne({ ...body });

  if (r === null) {
    await users.insertOne({ pseudo: body.pseudo, pswd: body.pswd });

    return {
      code: 201,
      data: {
        status: 201,
        message: "User created"
      }
    }
  }

  return {
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
