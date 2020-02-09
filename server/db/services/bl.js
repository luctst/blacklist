/**
 * Get data from a specific user
 * @param {Object} header the http header send by the request.
 */
async function GET(header) {
  console.log(header);
  return {
    code: 200,
    data: {}
  };
}

module.exports = {
  GET
};
