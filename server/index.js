/*estlint-disable no-console*/
require("./config");
const {getPortPromise} = require("portfinder");
const {promises} = require("fs");
const {basename} = require("path");
const {createServer} = require("http");
const api = require("./api/index");

/**
 * Check if `reqPort` is available if not return an available port to use.
 * @param {Number} reqPort The port to check.
 * @returns An integer who correspont to an available port.
 */
async function getAvailablePort(reqPort) {
    const baseport = parseInt(reqPort, 10);
    const port = await getPortPromise({ port: baseport });

    return port;
}

/**
 * Return an array of string who contains the api routes list.
 * @param {String} path The directory to parse
 */
async function getRoutesApi(directoryPath) {
    return (await promises.readdir(directoryPath)).map(route => {
        if (basename(route, ".js") === "default") return "/";
        return `/${basename(route, ".js")}`;
    });
}

(async () => {
    process.env.PORT = await getAvailablePort(8080);
    const routes = await getRoutesApi(`${process.cwd()}/server/api/routes`);

    createServer((req, res) => api(req, res, routes))
    .listen({
        port: process.env.PORT,
        host: process.env.url
    }, () => console.log(`Server listen here http://${process.env.url}:${process.env.PORT}`));
})();

["SIGINT", "SIGTERM"].forEach(signal => {
    process.on(signal, () => {
        console.log(`Server closed, see you :)`);
        process.exit();
    });
});