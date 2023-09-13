"use client"
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { Input, Button } from "@chakra-ui/react";

const Chat = () => {
  const [message, setMessage] = useState<any>("");
  const [messages, setMessages] = useState<string[]>([]);
  const [socket, setSocket] = useState<null | any >(null);
  const [alreadyWriting, setAlreadyWriting] = useState(false)

  useEffect(() => {
    console.log("Connecting to WebSocket server...");
    const newSocket = io('https://testchatroom-w0r2.onrender.com', {
      transports: ["websocket"],
    });

    newSocket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    newSocket.on("message", (newMessage) => {
      console.log("Received message:", newMessage);
      // if (newMessage === '...') {
      //   return setMessages((prevMessages) => [...prevMessages, "Escribiendo"]);
      // }
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    setSocket(newSocket);

    // Clean up the socket connection on unmount
    return () => {
      console.log("Disconnecting from WebSocket server...");
      newSocket.disconnect();
    };
  }, []);

  const handleMessageSubmit = (e: any) => {
    e.preventDefault();
    if (message.trim() && socket as any) {
      socket?.emit("message", message);
      setMessage("");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
    // socket && socket.emit("message", "...")
  }

  return (
    <div>
      <h1>Chat App</h1>
      <div>
        {messages.map((msg, index) => {
          return (<div key={index}>{msg}</div>)
        })}
      </div>
      <form onSubmit={handleMessageSubmit}>
        <Input type="text" value={message} className="mb-4" onChange={handleInputChange} />
        <Button className="flex ml-auto" type="submit">Send</Button>
      </form>
    </div>
  );
};

export default Chat;