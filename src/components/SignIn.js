import {GoogleAuthProvider,signInWithPopup } from "firebase/auth";
import "./signIn.css"

function SignIn(props)
{
    const googleProvider = new GoogleAuthProvider();

    async function signInGoogle()
    {
        try{
            await signInWithPopup(props.auth,googleProvider)
        }
        catch(err){
            console.log(err)
        }
    }

    
    return(
        <div className="screen">
            <h2 align="center" className="title">Chat!</h2>
            <button onClick={signInGoogle}>Sign in</button>
            
        </div>
    )
}

export default SignIn;