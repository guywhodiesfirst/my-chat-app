import { useState } from 'react'
import './App.css'
import { Row, Col, Container} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import WaitingRoom from './components/waitingRoom'
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
import ChatRoom from './components/chatRoom'

function App() {
  const [connection, setConnection] = useState();
  const [messages, setMessages] = useState([]);
  const joinChatRoom = async (username, chatroom) => {
    try {
      console.log("hiiii :D")
      const connection = new HubConnectionBuilder()
                        .withUrl("http://localhost:5134/chatHub")
                        .configureLogging(LogLevel.Information)
                        .build()
      connection.on("JoinChatRoom", (username, msg) => {
        setMessages(messages => [...messages, {username, msg}])
        console.log("msg: ", msg)
      })

      connection.on("ReceiveSpecificMessage", (username, msg) => {
        setMessages(messages => [...messages, {username, msg}])
      })

      await connection.start()
      await connection.invoke("JoinChatRoom", {username, chatroom})
      setConnection(connection)
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

  return (
    <div>
      <main>
        <Container>
          <Row className="px-5 my-5">
            <Col sm={12}>
              <h1 className='font-weight-light'>Welcome!</h1>
            </Col>
          </Row>
          {!connection 
            ? <WaitingRoom joinChatRoom={joinChatRoom}/>
            : <ChatRoom messages={messages} sendMessage={sendMessage}/>
          }
        </Container>
      </main>
    </div>
  )
}

export default App
