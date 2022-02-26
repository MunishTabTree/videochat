var express = require('express');
var router = express.Router();
const { v4: uuidv4 } = require('uuid');

const app = require('./../app')
const serverhttp = require('http').Server(app)
const io = require('socket.io')(3500, {cors:{origin:'*'}}) 
// var io = require('socket.io')(serverhttp);
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Welcome to Room');
});

router.get('/create', async function(req, res) {
    const getres = await uuidv4()
    res.render('room',{uuid:getres})
})

router.get('/adduser/:getres/', async function(req, res) {
    console.log(req.query)
    res.render('room',{uuid:req.params.getres,userid:req.query.username})
})

router.get('/video/:getres', (req, res) => {
    res.render('userdetails',{uuid:req.params.getres})
})


// console.log("zoom script loading")

io.on('connection', socket => {
    socket.on('mk-chat-room', async (roomid,userid) => {
        socket.join(roomid)
        socket.broadcast.to(roomid).emit('user-connected',userid);
        // console.log(roomid,userid)
    })
})

module.exports = router;
