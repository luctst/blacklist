const serverReponse = require("./_utils/responseServer");
const loginController = require("./db/controllers/login");

module.exports = async function User(req, res) {
  if (req.method.toUpperCase() !== "POST") {
    return serverReponse(res, 405, {
      content: "POST"
    });
  }

  if (!req.body || Object.keys(req.body).length === 0) {
    return serverReponse(res, 400);
  }

  if (!req.body.pseudo || !req.body.password) {
    return serverReponse(res, 422);
  }

  return loginController(req.body).then(response => {
    return serverReponse(res, response.code, {
      serverHeader: response.serverHeader ? { ...response.serverHeader } : {},
      content: response.content ? response.content : undefined,
      modifyResponse: response.modifyResponse ? { ...response.modifyResponse } : undefined
    });
  });
};
