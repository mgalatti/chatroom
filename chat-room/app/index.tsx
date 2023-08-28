"use client"
import { useEffect } from "react";
import { io, Socket } from "socket.io-client";
let socket
import RootLayout from "./layout";

export default function Home() {

  // useEffect(() => {
  //   socketInitializer()
  // }, [])

  // const socketInitializer = async () => {
  //   const request = new Request("/pages/api");
  //   await fetch(request)
  //   socket = io()
  //   socket.on('connection', () => {
  //     console.log('connected')
  //   })
  //   socket.on('message', (msg) => {
  //     console.log('sds', msg)
  //   })
  // }


  return (
     <p>hola</p>
  )
}
