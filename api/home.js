module.exports = function User(req, res) {
  console.log(req.query);
  res.status(200).json({ t: req.query });
};
