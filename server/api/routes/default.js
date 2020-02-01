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
        message: "The / route can not receive data."
      }
    });
  }

  return Promise.resolve({
    code: 200,
    data: {
      methods: [...request.globalMethods],
      routes: {
        "/": {
          description: "Return all routes and method availables for this API.",
          method: "GET"
        },
        "/users": {
          description: "Create, update or delete an user.",
          method: ["POST", "PUT", "DELETE"],
          POST:
            "This method create an user she must passed an JSON object in the body with a pseudo and pwsd property, exemple: {'pseudo': string, 'pswd': string}."
        },
        "/connexion": {
          description: "Use this route to connect an user.",
          method: "POST"
        }
      }
    }
  });
};
