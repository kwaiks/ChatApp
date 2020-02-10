const express = require('express')
const Chats = require('../models/ChatSchema')

const router = express.Router()

router.get("/chats",Chats.getChats)

module.exports = router;