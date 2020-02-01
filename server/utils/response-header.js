/**
 * Create the response header
 * @param {Object} reponse The reponse object return on http request.
 * @param {Object} data An object with property to add in the header response
 */
module.exports = (reponse, data) => {
  const defaultHeader = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Expose-Headers":
      "ETag, Link, Location, Retry-After, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, X-OAuth-Scopes, X-Accepted-OAuth-Scopes, X-Poll-Interval",
    "content-type": "application/json; charset=utf-8",
    connection: "close",
    "Content-Security-Policy": "default-src 'none'",
    Server: `${process.env.url}.com`,
    Status: data.code,
    "X-XSS-Protection": "1;mode=block",
    "Referrer-Policy": "origin-when-cross-origin, strict-origin-when-cross-origin",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "deny",
    "X-RateLimit-Limit": 60
  };

  if (data.code >= 400 && data.code <= 600) {
    if (data.code === 405) {
      return reponse.writeHead(data.code, {
        ...defaultHeader,
        ...data.serverHeader
      });
    }

    return reponse.writeHead(data.code, {
      ...defaultHeader,
      "Transfer-Encoding": "chunked"
    });
  }

  // TODO: Fill the empty data.
  return reponse.writeHead(data.code, {
    ...defaultHeader,
    "cache-control": "public, max-age=60, s-maxage=60",
    Etag: "",
    Vary: "accept",
    Vary: "accept-encoding" // eslint-disable-line no-dupe-keys
  });
};
