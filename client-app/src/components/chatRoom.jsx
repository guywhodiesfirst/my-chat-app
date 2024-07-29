import { Row, Col, Container, Button } from "react-bootstrap"
import MessageContainer  from "./messageContainer"
import SendMessageForm from "./sendMessageForm";

const ChatRoom = ({messages, sendMessage, leaveChatRoom}) => {
    return(
        <Container className="chat-container">
            <Row className="px-5 py-3 d-flex justify-content-between">
                <Col>
                    <h2><span className="highlight-text chat-room-name">Chat Room</span></h2>
                </Col>
                <Col xs="auto">
                    <Button 
                        variant="primary"
                        onClick={leaveChatRoom}
                    >
                        Exit chat room
                    </Button>
                </Col>
            </Row>
            <Row className="px-5">
                <Col sm={12}>
                    <MessageContainer messages={messages}/>
                </Col>
                <Col sm={12}>
                    <SendMessageForm sendMessage={sendMessage}/>
                </Col>
            </Row>
        </Container>
    )
}

export default ChatRoom;