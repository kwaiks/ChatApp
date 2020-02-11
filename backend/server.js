const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')
const port = 5000;
const socket = io(http);
const bodyParser = require('body-parser')
const chatRouter = require('./route/chatRoute')
const chat = require('./models/ChatSchema')

socket.on('connection', (socket)=>{
    console.log('user connected');
    socket.on('disconnect', ()=>{
        console.log('Disconnected')
    })
    socket.on('chat message', function(msg){
        console.log("message: "+ msg.message + " from "+msg.sender);
        chat.sendChat(msg)
        socket.broadcast.emit('received', {sender:msg.sender,message:msg.message});
    })

    
})

app.use(express.static(__dirname + "/public"));

app.use(bodyParser.json())

app.use(chatRouter)

http.listen(port,()=>{
    console.log('Server start at port: '+port)
})