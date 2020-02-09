const { GET, POST, PUT, DELETE } = require("../../db/services/users");

module.exports = request => {
  if (!["GET", "POST", "PUT", "DELETE"].includes(request.method)) {
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

  if (request.body === undefined && request.method !== "GET") {
    return Promise.resolve({
      code: 400,
      data: {
        status: "Empty body",
        message: "You must pass data."
      }
    });
  }

  switch (request.method) {
    case "GET":
      return GET({...request.query}).then(res => res)
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
