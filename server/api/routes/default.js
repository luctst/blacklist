module.exports = request => {
  if (request.method !== "GET") {
    return {
      error: true,
      data: {
        status: "Not found",
        message: `The / route can only be access with a GET method, https://${process.env.url}/`
      }
    };
  }

  if (request.body !== undefined) {
    return {
      error: true,
      data: {
        status: "Not found",
        message: "The / route can not receive data."
      }
    };
  }

  return {
    data: {
      methods: [...request.globalMethods],
      routes: request.globalRoutes.map(route => `https://${process.env.url}${route}`)
    }
  };
};
