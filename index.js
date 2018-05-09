var express = require('express')
var app = express();
var http =  require('http').Server(app)
var io = require('socket.io')(http)

app.use(express.static('assets'))

app.get('/',function(req,res){
  res.sendFile(__dirname+'/index.html')
})

var user = 0
var msg = []

io.on('connection',function(socket){
  user++
  console.log('+1 user connected, total:'+user)
  socket.on('disconnect', function (socket) {
    user--
  })
  socket.on('addMsg',function(data){
    msg.push(data)
    console.log('New Message : '+data.msg)
    io.emit('addMsg',data)
  })
})


http.listen('3000',function(){console.log('listening on port 3000')})