/**
 * Talk with the API.
 *
 * @param {string} route - The route to call, ex: `/auth/login` will request `https://url/auth/login`.
 * @param {string} [method] - The method to use for this request, default `GET`.
 * @param {Object} [data = {}] - An object who contains additional data to pass to the request accept only `headers` and `body` properties, default `{}`.
 * @param {Object} [data.headers = {}] - An object that will be used as request header cannot contains `Accept, content-type.
 * @param {Object} [data.body = {}] - Object with data to pass in the body request should be a javascript object and not a JSON object.
 */
export default function (route, method, data = {}) {
    if (!route) {
        return console.error(new Error('You should enter a route to fetch').message)
    } else {
        typeof route !== 'string' && console.error(new Error('The route parameter should be a string.').message)
    }

    if (method) {
        typeof method !== 'string' && console.error(new Error('Method should be a string').message)

        if (!['GET', 'POST', 'PUT', 'DELETE'].includes(method.toUpperCase())) {
            return console.error(new Error(`The ${method} is not available for now.`).message)
        }
    } else {
        method = 'GET'
    }

    let url;

    if (process.env.NODE_ENV === "development") {
        url = process.env.REACT_APP_APIURLDEV
    } else {
        url = process.env.REACT_APP_APIURLPROD
    }

    return fetch(`${url}${route}`, {
        method: method,
        headers: {
            ...data.headers,
            Accept: 'application/json'
        },
        body: data.body && JSON.stringify(data.body)
    })
    .then(res => res.json())
    .then(dataParsed => dataParsed)
}