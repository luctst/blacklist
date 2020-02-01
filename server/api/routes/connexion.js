const POST = require("../../db/services/connexion");

module.exports = request => {
  if (request.method !== "POST") {
    return Promise.resolve({
      code: 405,
      serverHeader: {
        Allow: "POST"
      },
      data: {
        status: 405,
        message: "This route can only be access with POST method."
      }
    });
  }

  if (request.body === undefined) {
    return Promise.resolve({
      code: 400,
      data: {
        status: "Empty body",
        message: "You must pass data."
      }
    });
  }

  return POST({}).then(res => res);
};
