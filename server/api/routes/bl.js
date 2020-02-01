module.exports = request => {
  if (!["GET", "POST", "PUT", "DELETE"].includes(request.method)) {
    return Promise.resolve({
      code: 405,
      serverHeader: {
        Allow: "GET, POST, PUT, DELETE"
      },
      data: {
        status: 405,
        message: "This route can only be access with POST, PUT, DELETE method."
      }
    });
  }

  if (!request.header.hasOwnProperty("Authorization")) {
    return Promise.resolve({
      code: 401,
      data: {
        status: 401,
        message: "You must add 'Authorization: Bearer <token>' header."
      }
    });
  }
};
