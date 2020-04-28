const serverResponse = require("./_utils/responseServer");

module.exports = function User(req, res) {
  return serverResponse(res, 200, {
    content: req.query.user
  });
};
