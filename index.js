var port = 3000;

var express = require('express');
var app = express();



app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
})

app.use("/js", express.static(__dirname + '/js'));
app.use("/css", express.static(__dirname + '/css'));
app.use("/controls", express.static(__dirname + '/controls'));
app.use("/img", express.static(__dirname + '/img'));

var io = require('socket.io')(app.listen(port));

io.on('connection', function(socket) {
    socket.on('Tune', function(msg) {
        socket.broadcast.emit('Tune', msg);
    });

    socket.on('Osc1Mix', function(msg) {
        socket.broadcast.emit('Osc1Mix', msg);
        console.log(msg);
    });


    socket.on('Osc2Mix', function(msg) {
        socket.broadcast.emit('Osc2Mix', msg);
    });

    socket.on('Osc3Mix', function(msg) {
        socket.broadcast.emit('Osc3Mix', msg);
    });

    socket.on('Osc1Detune', function(msg) {
        socket.broadcast.emit('Osc1Detune', msg);
    });

    socket.on('Osc2Detune', function(msg) {
        socket.broadcast.emit('Osc2Detune', msg);
    });

    socket.on('Osc3Detune', function(msg) {
        socket.broadcast.emit('Osc3Detune', msg);
    });

    socket.on('NoiseVolume', function(msg) {
        socket.broadcast.emit('NoiseVolume', msg);
    });

    socket.on('FCutoff', function(msg) {
        socket.broadcast.emit('FCutoff', msg);
    });

    socket.on('Emphasis', function(msg) {
        socket.broadcast.emit('Emphasis', msg);
    });

    socket.on('Contour', function(msg) {
        socket.broadcast.emit('Contour', msg);
    });

    socket.on('FAttack', function(msg) {
        socket.broadcast.emit('FAttack', msg);
    });

    socket.on('Fdecay', function(msg) {
        socket.broadcast.emit('Fdecay', msg);
    });

    socket.on('Fsustain', function(msg) {
        socket.broadcast.emit('Fsustain', msg);
    });

      socket.on('Attack', function(msg) {
        socket.broadcast.emit('Attack', msg);
    });

    socket.on('Decay', function(msg) {
        socket.broadcast.emit('Decay', msg);
    });

    socket.on('Sustain', function(msg) {
        socket.broadcast.emit('Sustain', msg);
    });

     socket.on('Decay', function(msg) {
        socket.broadcast.emit('Decay', msg);
    });

    socket.on('Volume', function(msg) {
        socket.broadcast.emit('Volume', msg);
    });


    socket.on('noteon', function(msg) {
        socket.broadcast.emit('noteon', msg);
    });

    socket.on('noteoff', function(msg) {
        socket.broadcast.emit('noteoff', msg);
    });



});

console.log('Listening on port ' + port);
