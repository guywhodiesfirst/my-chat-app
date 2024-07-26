import { Row, Col, Container } from "react-bootstrap"
import MessageContainer  from "./messageContainer"
import SendMessageForm from "./sendMessageForm";

const ChatRoom = ({messages, sendMessage}) => {
    return(
        <Container className="chat-container">
            <Row className="px-5 py-">
                <Col sm={10}>
                    <h2>Chat Room</h2>
                </Col>
                <Col>
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