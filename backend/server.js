const express = require('express')
const app = express()
const Chat = require('./models/ChatSchema')
const connect = require('./dbconnection')
const http = require('http').Server(app)
const io = require('socket.io')
const port = 5000;
const socket = io(http);
const bodyParser = require('body-parser')
const chatRouter = require('./route/chatRoute')
const db = require('./dbconnection')

socket.on('connection', (socket)=>{
    console.log('user connected');
    socket.on('disconnect', ()=>{
        console.log('Disconnected')
    })
    socket.on('chat message', function(msg){
        console.log("message: "+ msg);
        const date = new Date()
        let currDate = date.getTime()
        db.query('INSERT INTO chats(sender,message) VALUES($1,$2)',['Anonymous',msg])
        socket.broadcast.emit('received', {message:msg});
    })

    
})

app.use(express.static(__dirname + "/public"));

app.use(bodyParser.json())

app.use(chatRouter)

http.listen(port,()=>{
    console.log('Server start at port: '+port)
})