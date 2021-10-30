const express = require('express');
const morgan = require('morgan');
const http = require("http");
const cors = require('cors');
const app = express();
const servidor = http.createServer(app);
//imports
const Routes = require('./routes');

//settings
app.set('port', 5000);

//middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use(Routes);

const socketio = require("socket.io");
const io = socketio(servidor);

//Funcionalidad de socket.io en el servidor
io.on("connection", (socket) => {
  let nombre;

  socket.on("conectado", (nomb) => {
    nombre = nomb;
    //socket.broadcast.emit manda el mensaje a todos los clientes excepto al que ha enviado el mensaje
    socket.broadcast.emit("mensajes", {
      nombre: nombre,
      mensaje: `${nombre} ha entrado en la sala del chat`,
    });
  });

  socket.on("mensaje", (nombre, mensaje, other) => {
    //io.emit manda el mensaje a todos los clientes conectados al chat
    io.emit("mensajes", { nombre, mensaje, other });
  });

  socket.on("disconnect", () => {
    io.emit("mensajes", {
      servidor: "Servidor",
      mensaje: `${nombre} ha abandonado la sala`,
    });
  });
});

//run
servidor.listen(app.get('port'), () => {
    console.log('Server on Port 5000')
})
