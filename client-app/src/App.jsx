import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import WaitingRoom from './components/waitingRoom'
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
import ChatRoom from './components/chatRoom'

function App() {
  const [connection, setConnection] = useState();
  const [messages, setMessages] = useState([]);
  const [inChatRoom, setInChatRoom] = useState(false);
  
  const joinChatRoom = async (username, chatroom) => {
    try {
      const hubConnectionUrl = import.meta.env.VITE_CHATHUB_URL
      const connection = new HubConnectionBuilder()
                        .withUrl(hubConnectionUrl)
                        .configureLogging(LogLevel.Information)
                        .build()
      connection.on("JoinChatRoom", (username, msg) => {
        setMessages(messages => [...messages, {username, msg}])
      })

      connection.on("ReceiveSpecificMessage", (username, msg) => {
        setMessages(messages => [...messages, {username, msg}])
      })

      await connection.start()
      await connection.invoke("JoinChatRoom", {username, chatroom})
      setConnection(connection)
      setInChatRoom(true)
    } catch(e) {
      console.log(e)
    }
  }
  
  const sendMessage = async(message) => {
    try {
      await connection.invoke("SendMessage", message)
    } catch(e) {
      console.log(e)
    }
  }

  const leaveChatRoom = async() => {
    try {
      if(connection) {
        await connection.invoke("LeaveChatRoom")
        await connection.stop()
        setConnection(null)
        setMessages([])
        setInChatRoom(false)
      }
    } catch(e) {
      console.log(e)
    }
  }

  return (
    <div>
      <main>
        <>
          {!inChatRoom
            ? <WaitingRoom joinChatRoom={joinChatRoom}/>
            : <ChatRoom messages={messages} sendMessage={sendMessage} leaveChatRoom={leaveChatRoom}/>
          }
        </>
      </main>
    </div>
  )
}

export default App
