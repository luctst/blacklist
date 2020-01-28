/**
 * Create the response header
 * @param {Object} reponse The reponse object return on http request.
 * @param {Boolean} error If true reponse should return an 404 header.
 * @param {Number} code The status code to send in the response.
 */
module.exports = (reponse, error = false, code) => {
  const defaultHeader = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Expose-Headers":
      "ETag, Link, Location, Retry-After, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, X-OAuth-Scopes, X-Accepted-OAuth-Scopes, X-Poll-Interval",
    "content-type": "application/json; charset=utf-8",
    connection: "close",
    "Content-Security-Policy": "default-src 'none'",
    Server: `${process.env.url}.com`,
    "X-XSS-Protection": "1;mode=block",
    "Referrer-Policy": "origin-when-cross-origin, strict-origin-when-cross-origin",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "deny",
    "X-RateLimit-Limit": 60
  };

  if (error) {
    return reponse.writeHead(code, {
      ...defaultHeader,
      "Transfer-Encoding": "chunked",
      Status: code
    });
  }

  // TODO: Fill the empty data.
  return reponse.writeHead(200, {
    ...defaultHeader,
    "cache-control": "public, max-age=60, s-maxage=60",
    Etag: "",
    Status: "200",
    Vary: "accept",
    Vary: "accept-encoding" // eslint-disable-line no-dupe-keys
  });
};
