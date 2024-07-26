import { useState } from "react";
import { Button, Form, Row, Col, Container, Image } from "react-bootstrap";
import mainPageImage from "../assets/main-page-art.jpg";
import "../App.css";

const WaitingRoom = ({ joinChatRoom }) => {
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (username && room) {
            joinChatRoom(username, room);
        }
    };

    return (
        <Container fluid className="full-screen">
            <Row>
                <Col xs={8}>
                    <Container className="img-container">
                        <Image src={mainPageImage} fluid className="img"/>
                    </Container>
                </Col>
                <Col>
                    <Form className="form-container" onSubmit={handleSubmit}>
                        <Row className="px-5 my-5">
                            <Col sm={12}>
                                <h1 className='font-weight-light'>Welcome!</h1>
                            </Col>
                        </Row>
                        <Row className="px-5 py-5">
                            <Col sm={12}>
                                <Form.Group>
                                    <Form.Control
                                        placeholder="Username"
                                        value={username}
                                        onChange={e => setUsername(e.target.value)}
                                        className="input-margin"
                                    />
                                    <Form.Control
                                        placeholder="Chat room"
                                        value={room}
                                        onChange={e => setRoom(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col sm={12}>
                                <hr />
                                <Button variant="primary" type="submit" disabled={!(username && room)}>
                                    Join
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default WaitingRoom;