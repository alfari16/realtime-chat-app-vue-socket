var express = require('express')
var app = express();
var http =  require('http').Server(app)
var io = require('socket.io')(http)

app.use(express.static('assets'))

app.get('/',function(req,res){
  res.sendFile(__dirname+'/index.html')
})
// app.set('port',3000)
app.set('port',process.env.PORT || 5000)

var user = 0
var msg = []

io.on('connection',function(socket){
  user++
  io.emit('userConnect',user)
  console.log('+1 connected')
  socket.on('disconnect', function (socket) {
    user--
    console.log('-1 connected')
    io.emit('userConnect',user)
  })
  socket.on('addMsg',function(data){
    msg.push(data)
    io.emit('addMsg',data)
  })
})


http.listen(app.get('port'),function(){console.log('listening on port 3000')})