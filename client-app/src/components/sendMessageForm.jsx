import { useState } from "react"
import { Form, InputGroup, Button } from "react-bootstrap"

const SendMessageForm = ({ sendMessage }) => {
    const[message, setMessage] = useState('')

    return (
    <Form onSubmit={e => {
        e.preventDefault()
        sendMessage(message)
        setMessage('')
    }}>
        <InputGroup className="mb-3">
            <Form.Control 
                onChange={e => setMessage(e.target.value)} value={message}
                placeholder="Input message here...">
            </Form.Control>
            <Button variant="primary" type="submit" disabled={!message}>Send message</Button>
        </InputGroup>
    </Form>
)}

export default SendMessageForm