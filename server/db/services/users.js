const bcrypt = require("bcrypt");
const { promisify } = require("util");
const { randomFill } = require("crypto");
const { ObjectId } = require("mongodb");
const mongo = require("../index");

const createToken = promisify(randomFill);

/**
 * Check if an user exist.
 * @param {Object} query An object of parsed parameters.
 */
async function GET(query) {
  const q = Object.keys(query);

  if (q.length !== 2) {
    return {
      code: 400,
      data: {
        status: 400,
        message: "You can only have two parameters."
      }
    };
  }

  if (q[0] !== "_id" || q[1] !== "_pseudo") {
    return {
      code: 400,
      data: {
        status: 400,
        message: "Wrong parameter."
      }
    };
  }

  if (!ObjectId.isValid(query._id)) {
    return {
      code: 400,
      data: {
        code: 400,
        message: "Error wrong data."
      }
    };
  }

  const blacklistUsers = (await mongo.connect()).db("blacklist").collection("users");
  const user = await blacklistUsers.findOne({
    _id: ObjectId(query._id),
    pseudo: query._pseudo
  });

  if (user === null) {
    return {
      code: 403,
      data: {
        status: 403,
        message: "User don't exist"
      }
    };
  }

  return {
    code: 200,
    serverHeader: {
      "Set-Cookie": `token=${user._token}; Max-age=20; Path=/; HttpOnly; Secure`
    },
    data: {
      status: 200,
      token: user._token,
      user: user.pseudo
    }
  };
}

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

  const blacklistUsers = (await mongo.connect()).db("blacklist").collection("users");

  if ((await blacklistUsers.findOne({ pseudo: body.pseudo })) === null) {
    const _token = await createToken(Buffer.alloc(16));
    const passwordHash = await bcrypt.hash(body.pswd, 10);
    const newUser = await blacklistUsers.insertOne({
      pseudo: body.pseudo,
      pswd: passwordHash,
      data: [],
      _token: _token.toString("hex")
    });

    return {
      code: 201,
      serverHeader: {
        Location: `http://${process.env.url}:3000/bl/${newUser.ops[0].pseudo}`
      },
      data: {
        status: 201,
        url: `/bl/${newUser.ops[0].pseudo}`,
        userId: newUser.insertedId
      }
    };
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
  GET,
  POST,
  PUT,
  DELETE
};
