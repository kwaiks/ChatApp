const db = require('../dbconnection')

const getChats = async(req,res)=>{
    const string = 'SELECT * FROM chats'
    
    db.query(string, (error,results)=>{
        if(error){
            throw error
        }
        res.status(200).send(results.rows)
    })
}

const sendChat = (msg)=>{
    console.log(msg)
    const value = [
        msg.sender,
        msg.message
    ]
    db.query('INSERT INTO chats(sender,message) VALUES($1,$2)',value, (error,results)=>{
        if(error){
            console.log(error)
            return error
        }
        return true
    })
}

module.exports = {
    getChats,
    sendChat
}