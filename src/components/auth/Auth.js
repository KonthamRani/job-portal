import React,{useContext} from 'react'

import {UserContext} from '../../context/UserContext'
import authLogo from '../../assets/authlogo.png'
import btn from '../../assets/btn.png'
import './Auth.css'
import {  signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {auth} from '../../FireBaseConfig/FireBaseConfig'


function Auth({type}) {
  const provider = new GoogleAuthProvider();
  const [userData,dispatch]=useContext(UserContext);
  const signIn=()=>{

    signInWithPopup(auth, provider)
      .then((result) => {
        const User=result;
        const {email,displayName,photoURL}=User;
        dispatch({
          type:'LOGIN',
          payload:{
            email,displayName,photoURL
          }
        })
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }
  return (
    <div>
      <div className='auth-container'>

      
      <h1>
     Welcome {type}!!
      </h1>
      <h3>Please Sign IN</h3>
      <div>
        <button onClick={signIn}>
          <img width='100px' src={btn}/>
        </button>
      </div>
      </div>
      {/* <div>
        
          <img  src={authLogo}/>
        
      </div> */}
    </div>
  )
}

export default Auth
