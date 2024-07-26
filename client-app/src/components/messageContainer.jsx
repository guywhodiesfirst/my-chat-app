import "../App.css";

const MessageContainer = ({ messages }) => {
    return (
        <div>
            {
                messages.map((message, index) => 
                <table key={index} className="table table-striped table-bordered">
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
        </div>
    );
}

export default MessageContainer;