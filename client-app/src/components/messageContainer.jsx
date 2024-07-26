import { useEffect, useRef } from "react";
import "../App.css";

const MessageContainer = ({ messages }) => {
    const messageRefEnd = useRef(null)
    useEffect(() => {
        messageRefEnd.current?.scrollIntoView({ behavior: "smooth"})
    }, [messages])
    return (
        <div className="message-container">
            {
                messages.map((message, index) => 
                <table key={index} className="message-table">
                    <tbody>
                        <tr>
                            {message.username == "admin"
                                ? <td><span className="user-joined-highlighted">{message.msg}</span></td>
                                : <td><span className="message-sender-highlighted">{message.username}:</span> {message.msg}</td>
                            }
                        </tr>
                    </tbody>
                </table> )
            }
            <div ref={messageRefEnd}/>
        </div>
    );
}

export default MessageContainer;