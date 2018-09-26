const express =  require('express');
const app =  express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
let connectedUsers = [];

app.get('/sendToClient/:email',(req,res)=>{    
    if(connectedUsers[req.params.email]) {
        connectedUsers[req.params.email].emit('pushMsg', {'msg':'msg'});    
    } else {
        console.log('user not in online');
    }
    res.end();
});

const deregisterClient =  (socket) => {
    delete connectedUsers[socket.id];
}

const registerClient = (socket,data) => { 
    socket.id = data.email;
    connectedUsers.push(data.email);
    connectedUsers[data.email] = socket;  
}


const afterConnect = (socket) => {    

   socket.on('join',(data)=>{
        registerClient(socket,data);        
    });

    socket.on('disconnect',() => {
        deregisterClient(socket)
    });    
}

io.on('connect',afterConnect);

http.listen(3000, function(){
    console.log('listening on *:3000');
});