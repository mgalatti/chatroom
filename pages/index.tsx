import { useEffect, useState } from "react";
import { io }from "socket.io-client";
let socket: any

export default function Home() {
  const [message, setMessage] = useState();



  const socketInitializer = async () => {
    socket = io({
      path: '/api/route',
      addTrailingSlash: false,
    })

    socket.on('connection', () => console.log('connected'))

    socket.on("receive-message", (data: any) => console.log(data))
  }

  useEffect(() => {
    socketInitializer()
  }, [])

  useEffect(() => {
    if(socket && message){
      socket.emit("send-message", {message})
      }  }, [message])


  function handleSubmit(e: any){
    e.preventDefault();
    if(socket && message){
    socket.emit("send-message", {message})
    }
  }


  return (

    <main>
      <form onSubmit={handleSubmit}>
        <input name="message" value={message} onChange={(e) => setMessage(e.target.value as any)} />
        <button type="submit">enviar</button>
        </form>
    </main>

  )
}
