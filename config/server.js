const app = require("./app");
const server = require("http").createServer(app);
const setupSocket = require("./socket");

// configuration Socket.io
const io = setupSocket(server);

module.exports = { server, io };
