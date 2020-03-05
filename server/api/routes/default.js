module.exports = request => {
  if (request.method !== "GET") {
    return Promise.resolve({
      code: 405,
      serverHeader: {
        Allow: "GET"
      },
      data: {
        status: 405,
        message: `The / route can only be access with a GET method, https://${process.env.url}/`
      }
    });
  }

  if (request.body !== undefined) {
    return Promise.resolve({
      code: 400,
      data: {
        status: 400,
        message: "The / route cannot receive data."
      }
    });
  }

  return Promise.resolve({
    code: 200,
    data: {
      "/": {
        description: "Return all routes and method availables for this API.",
        GET: "Return the API documentation."
      },
      "/users": {
        description: "Create, update or delete an user.",
        GET:
          "/users/:user Check if a specific user exist should passed JSON object {{'pseudo': string, 'pswd': string}}",
        POST:
          "This method create an user it must passed an JSON object in the body with a pseudo and pwsd property, exemple: {'pseudo': string, 'pswd': string}.",
        PUT: "",
        DELETE: ""
      },
      "/bl": {
        description: "Get acces to your secret data, all endpoints here must include the Authorization header, exemple: Authorization: Bearer <token>",
        GET: "Get data for a specific user, /bl/:user",
        POST: "",
        PUT: "",
        DELETE: ""
      }
    }
  });
};
