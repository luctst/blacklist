const { parse } = require("cookie");
const { verify } = require("jsonwebtoken");
const mongo = require("../db/index");

/**
 * Check if a session user is valid
 * @param {String} cookie - A string of cookie send by the client.
 * @param {String} JWT - A JWT.
 * @param {Object} [options = {}] - An object who modify the function behavior.
 */
module.exports = async function(cookie, JWT, options = {}) {
  if (!cookie || typeof cookie !== "string") {
    return {
      error: true,
      why: "Cookie is missing or not a string"
    };
  }

  const cookieObject = parse(cookie);

  if (!cookieObject.sid || typeof cookieObject.sid !== "string") {
    return {
      error: true,
      why: "Cookie sid property is not defined or not a string"
    };
  }

  if (!JWT || typeof JWT !== "string") {
    return {
      error: true,
      why: "JWT arguments is maybe not passed or not a string."
    };
  }

  if (options && typeof options !== "object") {
    return {
      error: true,
      why: "Options object must be an objet"
    };
  }

  const opts = {
    ...options
  };
  const mongoclient = await mongo();
};
