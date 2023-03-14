
import {signOut } from "firebase/auth"
import {getDocs,collection,query,orderBy,limit} from "firebase/firestore";
import { useState, useEffect,useRef } from "react";
import MessageChat from './MessageChat';
import MessageForm from './MessageForm';
import "./chatScreen.css"

function ChatScreen(props)
{   
    console.log("function")
    const [messagesList,setMessagesList] = useState()
    const messagesRef = collection(props.db,"messages")
    const dummy = useRef()
    async function getMessages(){ 
      try{
        const data2 = query(messagesRef,orderBy("createdAt" , "desc"),limit(25))
        //const data = await get(q)
        const data = await getDocs(data2)
        console.log(data2)
        const filtered_data = data.docs.map((doc)=>({...doc.data(),id:doc.id}))
        setMessagesList(filtered_data)
      }
      catch(err){
        console.log(err)
      }}
    useEffect( ()=>{
      
      
    getMessages()   
  },[])
    return(
        <div className='screen'>
          <div className="header">
            <img src={props.auth.currentUser.photoURL} alt="ur face"/>
            <p>{props.auth.currentUser.displayName}</p>
            <button onClick={async()=>await signOut(props.auth)}>Log out</button>
          </div>
            <div className="window">
            <div ref={dummy}></div>
                {messagesList && messagesList.map(msg => <MessageChat message={msg} key={msg.id} auth={props.auth}/>)}
                
            </div>
            
            <MessageForm auth={props.auth} msgRef={messagesRef} getMessages={getMessages} dummy={dummy}/>
            
        </div>
    )
}

export default ChatScreen;