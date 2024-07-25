import { useState } from "react"
import { Button, Form, Row, Col } from "react-bootstrap";
import "../App.css"

const WaitingRoom = ({ joinChatRoom }) => {
    const[username, setUsername] = useState();
    const[room, setRoom] = useState()
    return (
        <Form onSubmit={e => {
            e.preventDefault();
            joinChatRoom(username, room)
        }}>
            <Row className="px-5 py-5">
                <Col sm={12}>
                    <Form.Group>
                        <Form.Control placeholder="Username" onChange={e => setUsername(e.target.value)} className="input-margin"/>    
                        <Form.Control placeholder="Chat room" onChange={e => setRoom(e.target.value)}/>    
                    </Form.Group> 
                </Col>
                <Col sm={12}>
                    <hr/>
                    <Button variant="success" type="submit" >Join</Button>
                </Col>
            </Row>
        </Form>
    )
}

export default WaitingRoom