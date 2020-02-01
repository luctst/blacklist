const bcrypt = require("bcrypt");
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

  const users = (await db.connect())
    .db("blacklist")
    .collection("users")
    .findOne({ pseudo: body.pseudo });

  if (users === null) {
    const passwordHash = await bcrypt.hash(body.pswd, 10);
    await users.insertOne({ pseudo: body.pseudo, pswd: passwordHash });
    await db.close();

    return {
      code: 201,
      serverHeader: {
        Location: `https://${process.env.url}/blacklist`
      },
      data: {
        status: 201,
        message: "User created"
      }
    };
  }

  await db.close();

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
