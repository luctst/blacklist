const { compare } = require("bcrypt");
const { ObjectId } = require("mongodb");
const mongo = require("../index");

module.exports = async function(dataBody) {
  const usersCollection = await mongo();
  const user = await usersCollection
    .db()
    .collection("users")
    .findOne(
      { pseudo: dataBody.pseudo },
      {
        projection: {
          token: 1,
          password: 1
        }
      }
    );

  if (!user) {
    await usersCollection.close();
    return {
      code: 403
    };
  }

  if (!(await compare(dataBody.password, user.password))) {
    await usersCollection.close();
    return {
      code: 401,
      content: "That email and password combination is incorrect."
    };
  }

  const newSession = await usersCollection
    .db()
    .collection("sessions")
    .insertOne({
      userId: new ObjectId(user._id),
      lastRequest:
        process.env.NODE_ENV === "development"
          ? new Date(Date.now() + 550 * 1000)
          : new Date(Date.now() + 5 * 60 * 60 * 1000)
    });
  await usersCollection.close();
  return {
    code: 200,
    modifyResponse: {
      token: user.token.JWT
    },
    serverHeader: {
      "Set-Cookie": `sid=${newSession.ops[0]._id}; Expires=${new Date(
        Date.now() + 6.04e8
      )}; ${process.env.NODE_ENV === "development" ? "" : "Secure"}; Path=/; HttpOnly`
    }
  };
};
