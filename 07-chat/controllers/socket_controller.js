/**
 * Socket Controller
 */

const debug = require("debug")("chat:socket_controller");

// list of socket-ids and their username
const users = {};

module.exports = function (socket) {
	debug("a new client has connected", socket.id);

	// handle user disconnect
	socket.on("disconnect", function () {
		debug(`Client ${socket.id} disconnected :(`);

		// let everyone connected know that user disconnected
		this.broadcast.emit("user:disconnected", users[socket.id]);

		// remove user from list of connected user
		delete users[socket.id];
	});

	// handle user joined
	socket.on("user:joined", function (username, callback) {
		// associate socket id with username
		users[socket.id] = username;

		// let everyone know that someone has connected to the chat
		socket.broadcast.emit("user:connected", username);

		// confirm join
		callback({
			success: true,
		});
	});

	// handle user emitting a new message
	socket.on("chat:message", function (message) {
		debug("Someone said something: ", message);

		// emit `chat:message` event to everyone EXCEPT the sender
		this.broadcast.emit("chat:message", message);
	});
};
