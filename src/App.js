import {initializeApp} from "firebase/app"
import { getAuth} from "firebase/auth";
import './App.css';
import {useAuthState} from "react-firebase-hooks/auth";
import SignIn from "./components/SignIn";
import ChatScreen from "./components/ChatScreen";
import {getFirestore} from "firebase/firestore";

const app_data = initializeApp({
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId
} )

const auth = getAuth(app_data);
const db = getFirestore(app_data);

function App() {

  const [user] = useAuthState(auth);
  

  return (
    <div className="App">
      {user?<ChatScreen auth={auth} db={db}/>:<SignIn auth={auth} />}
        </div>
  );
}

export default App;
