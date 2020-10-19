const morgan = require("morgan");
const bodyParser = require('body-parser');

var express = require('express');

// App setup
var app = express();
var socket = require('socket.io')
const port = 3000;

var server = app.listen(port, function(){
    console.log('Server run', port);
});

let io = socket(server)
io.on('connection', function(socket){
  console.log("a user connected :D");
  socket.on("chat message", msg => {
    console.log(msg);
    io.emit("chat message", msg);
  });
});
//habilita bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.urlencoded({extended: false}))

//middleware
app.use(morgan('dev'));

//permite recibir formato json y poder entenderlo
app.use(express.json());

//routes
app.use(require('./routes/customers'));

//starting server
// app.listen(port,()=>{
//   console.log('Server run', port);
// })
