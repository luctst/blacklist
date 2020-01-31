module.exports = request => {
  if (request.method !== "GET") {
    return Promise.resolve({
      error: true,
      code: 405,
      data: {
        status: 405,
        message: `The / route can only be access with a GET method, https://${process.env.url}/`
      }
    });
  }

  if (request.body !== undefined) {
    return Promise.resolve({
      error: true,
      code: 400,
      data: {
        status: 400,
        message: "The / route can not receive data."
      }
    });
  }

  return Promise.resolve({
    data: {
      methods: [...request.globalMethods],
      routes: {
        "/": {
          description: "Return all routes and method availables for this API.",
          method: "GET"
        },
        "/users": {
          description: "Create, update or delete an user.",
          method: ["POST", "PUT", "DELETE"]
        },
        "/connexion": {
          description: "",
          method: "POST"
        }
      }
    }
  });
};
