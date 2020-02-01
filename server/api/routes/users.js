const { POST, PUT, DELETE } = require("../../db/services/users");

module.exports = request => {
  if (!["POST", "PUT", "DELETE"].includes(request.method)) {
    return Promise.resolve({
      code: 405,
      serverHeader: {
        Allow: "POST, PUT, DELETE"
      },
      data: {
        status: 405,
        message: "This route can only be access with POST, PUT, DELETE method."
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

  switch (request.method) {
    case "POST":
      return POST({ ...request.body }).then(res => res);
    case "PUT":
      return PUT();
    case "DELETE":
      return DELETE();
    default:
      break;
  }
};
