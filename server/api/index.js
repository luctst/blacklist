const { parse } = require("url");
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
    responseHeader(res, true, 400);

    res.end(
      JSON.stringify({
        status: "Not found",
        message: `Check this url to see all routes and methods availables, https://${process.env.url}.com`
      })
    );
  }

  req.setEncoding("utf-8");
  req
    .on("data", chunk => (dataToCheck.body = chunk))
    .on("end", () => {
      if (dataToCheck.body !== undefined) {
        try {
          const bodyParsed = JSON.parse(dataToCheck.body);
          dataToCheck.body = bodyParsed;
        } catch (e) {
          responseHeader(res, true, 406);

          res.end(
            JSON.stringify({
              status: e.message,
              message: "The routes can only receives JSON data."
            })
          );
        }
      }

      reponseForClient =
        pathname === "/"
          ? require("./routes/default")({ ...dataToCheck })
          : require(`./routes${pathname}`)({ ...dataToCheck });

      reponseForClient.then(r => {
        r.error ? responseHeader(res, true, r.code) : responseHeader(res);
        res.end(JSON.stringify({ ...r.data }));
      });
    });
};
