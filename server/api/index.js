const { parse } = require("url");
const {json} = require("body-parser");
const responseHeader = require("../utils/response-header");

module.exports = (req, res, routesApi) => {
  req.on("error", error => {
    res.statusCode = req.statusCode;

    res.end(
      JSON.stringify({
        status: req.statusCode,
        message: error.message
      })
    );
  });

  const { pathname, query } = parse(req.url, true);
  const dataToCheck = {
    header: req.headers,
    method: req.method,
    body: undefined,
    query,
    globalRoutes: routesApi,
    globalMethods: ["GET", "POST", "PUT", "DELETE"]
  };
  let reponseForClient;

  if (
    !routesApi.includes(pathname) ||
    ![...dataToCheck.globalMethods].includes(req.method)
  ) {
    responseHeader(res, true);

    res.end(
      JSON.stringify({
        status: 404,
        message: `Not found, you can check this url to see all routes and methods availables, https://${process.env.url}.com`
      })
    );
  }

  req.setEncoding("utf-8");
  req
    .on("readable", function() {
      if (this.read() !== null) {
        const bodyparsed = json({type: "application/json"});
        console.log(bodyparsed());
      }
    })
    .on("end", () => {
      console.log(dataToCheck.body);
    });

  if (pathname === "/") {
    reponseForClient = require("./routes/default")({ ...dataToCheck }); // eslint-disable-line global-require

    reponseForClient.error ? responseHeader(res, true) : responseHeader(res);
    res.end(JSON.stringify({ ...reponseForClient.data }));
  } else {
    reponseForClient = require(`./routes${pathname}`)({ ...dataToCheck }); // eslint-disable-line global-require
  }
};
