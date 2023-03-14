
import "./messageChat.css"
function MessageChat(props)
{

    const messageClass = props.message.uid === props.auth.currentUser.uid ? 'sent' : 'recieved';
    return(
        <div className={`msg ${messageClass}`}>
            <img src={props.message.photoURL} alt="your dp"></img>
            <p>{props.message.text}</p>
        </div>
    )
}

export default MessageChat