import {useState } from "react";
import "./messageForm.css"
import { addDoc,serverTimestamp} from "firebase/firestore";

function MessageForm(props)
{
    const [formVal,setFormVal] = useState();

    async function sendMessage(event)
    {
        event.preventDefault();
        const {uid,photoURL} = props.auth.currentUser;
        await addDoc(props.msgRef,{
            text:formVal,
            createdAt: serverTimestamp(),
            uid,
            photoURL
        })
        setFormVal("")
        props.getMessages();
        props.dummy.current.scrollIntoView({behaviour : "smooth"})
    }
    return(
    <form onSubmit={sendMessage}>
        <input value={formVal} onChange={(event)=>setFormVal(event.target.value)} />
        <button type="submit">🚀</button>
    </form>)
}

export default MessageForm;