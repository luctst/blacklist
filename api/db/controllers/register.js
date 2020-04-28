const { hash } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { randomFill } = require("crypto");
const { promisify } = require("util");
const mongo = require("../index");

module.exports = async function(dataBody) {
  const usersCollection = await mongo();
  const user = await usersCollection
    .db()
    .collection("users")
    .findOne({ pseudo: dataBody.pseudo });

  if (user) {
    await usersCollection.close();
    return {
      code: 409,
      content: "User already exist"
    };
  }

  const createToken = promisify(randomFill);
  const createJWT = promisify(sign);

  const passwordHashed = await hash(dataBody.password, 10);
  const payload = {
    name: dataBody.pseudo,
    exp: Math.floor(Date.now() + 60 * 8640 * 1000)
  };
  const JWTId = await createToken(Buffer.alloc(16));
  const JWT = await createJWT({ ...payload }, JWTId.toString("hex"));

  if (typeof JWT === "object") {
    await usersCollection.close();
    return {
      code: 502
    };
  }

  await usersCollection
    .db()
    .collection("users")
    .insertOne({
      pseudo: dataBody.pseudo,
      password: passwordHashed,
      token: {
        JWT,
        verify: JWTId.toString("hex")
      }
    });

  await usersCollection.close();
  return {
    code: 201,
    modifyResponse: {
      token: JWT
    }
  };
};
