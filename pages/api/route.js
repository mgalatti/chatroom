import { Server } from "socket.io";

const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log('Socket is already running.')
    res.end()
    return
  } else {
    console.log('Socket is initializing...')

    const io = new Server(res.socket.server)
    res.socket.server.io = io
    io.connect()

    io.on('connection', (socket) => {
     socket.on("send-message", (obj) => {
      io.emit("receive-message", obj);
     })
    })
  }

  res.end()
}

export default SocketHandler