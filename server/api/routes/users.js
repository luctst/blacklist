const { POST, PUT, DELETE } = require("../../db/services/users");

module.exports = request => {
  if (!["POST", "PUT", "DELETE"].includes(request.method)) {
    return Promise.resolve({
      error: true,
      code: 405,
      data: {
        status: "Method not allowed",
        message: "This route can only be access with POST, PUT, DELETE method."
      }
    });
  }

  if (!request.header.hasOwnProperty("authorization")) {
    return Promise.resolve({
      error: true,
      code: 401,
      data: {
        status: "Unauthorized",
        message: "You must add 'Authorization: Bearer <token>' header."
      }
    });
  }

  if (request.body === undefined) {
    return Promise.resolve({
      error: true,
      data: {
        status: "Not found",
        message: "You must pass data."
      }
    });
  }

  switch (request.method) {
    case "POST":
      return POST().then(res => res);
    case "PUT":
      return PUT();
    case "DELETE":
      return DELETE();
    default:
      break;
  }
};
