const restify = require('restify');
const server = restify.createServer();
const io = require('socket.io')(server.server);
let connectedUsers = {};
let interval;

const deregisterClient = (socket) => {
    delete connectedUsers[socket.id];
    if (Object.keys(connectedUsers).length === 0) {
        clearInterval(interval);
        console.log('No client is connected');
    }
}

const registerClient = (socket) => {

    connectedUsers[socket.id] = socket;
    if (Object.keys(connectedUsers).length === 1) {
        interval = setInterval(() => {
            for (let key in connectedUsers) {
                connectedUsers[key].emit('pushMsg', { 'msg': new Date });
            }
        }, 0);
    }
}

const afterConnect = (socket) => {

    registerClient(socket);

    socket.on('disconnect', () => {
        deregisterClient(socket)
    });
}

io.on('connect', afterConnect);

server.listen(3000, function () {
    console.log('listening on *:3000');
});

