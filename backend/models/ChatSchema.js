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

module.exports = {
    getChats
}