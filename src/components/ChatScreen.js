
import {signOut } from "firebase/auth"
import {collection,query,orderBy,limit} from "firebase/firestore";
import { useRef } from "react";
import MessageChat from './MessageChat';
import MessageForm from './MessageForm';
import "./chatScreen.css"

import 'firebase/firestore';
import {useCollectionData} from "react-firebase-hooks/firestore"

function ChatScreen(props)
{   
    console.log("function")
    
    const messagesRef = collection(props.db,"messages")
    const dummy = useRef()
    const querySnapshot = query(messagesRef,orderBy("createdAt","desc"),limit(25))
    const [messagesList] = useCollectionData(querySnapshot,{idField:"id"})
    //const [messagesList,setMessagesList] = useState()
    
    /*async function getMessages(){ 
      try {
        const querySnapshot = await getDocs(query(messagesRef, orderBy("createdAt", "desc"), limit(25)));
        const data = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        if (JSON.stringify(data) !== JSON.stringify(messagesList)) {
          setMessagesList(data);
          console.log("if true")
        }
        
      } catch (err) {
        console.log(err);
      }
    }
    useEffect( ()=>{

    getMessages()   
  },[])*/
 
 
  
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
            
            <MessageForm auth={props.auth} msgRef={messagesRef} /*getMessages={getMessages}*/ dummy={dummy}/>
            
        </div>
    )
}

export default ChatScreen;