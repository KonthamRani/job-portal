import {auth} from '../../FireBaseConfig/FireBaseConfig'
import React,{useContext} from 'react'

import {UserContext} from '../../context/UserContext'
import btn from '../../assets/btn.png'
import './Auth.css'
import {  signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {useNavigate} from 'react-router-dom'
import {db} from "../../FireBaseConfig/FireBaseConfig"
import {doc,setDoc,getDoc} from 'firebase/firestore';
import toastMessage from '../../Util/toastMessages';

function Auth({type}) {
  const navigate=useNavigate();
  const provider = new GoogleAuthProvider();
  const [userData,dispatch]=useContext(UserContext);
  const redirectUser=async(email)=>{
    //call firebase func to check user exists or not
    let u=await getDoc(doc(db,"users",email))
    let userInfoFromDb=null
    if(u.exists()){
      toastMessage("User already exists","info")
      userInfoFromDb=u.data();
      console.log('user data',u.data())
    }

    if(type==='candidate'){
      
      console.log(userData)
      //if user exists in db
if(userInfoFromDb){
  if(userInfoFromDb.userType==='candidate'){
    dispatch({
      type:'SET_USER_INFO',
      payload:userInfoFromDb
    })

    navigate('/candidate/profile')
  }
  else{
    toastMessage("This id is already registered as employer","info")
    
    return;
  }
}
//user not exist
else{
  navigate('/candidate/onboarding')
}
    }
    else{
      if(userInfoFromDb){
        if(userInfoFromDb.userType==='employer'){
          dispatch({
            type:'SET_USER_INFO',
            payload:userInfoFromDb
          })
          navigate('/employer/profile')
        }
        else{
          toastMessage("This id is already registered as candidate","info");
          return;
        }
      }
      //user not exist
      else{
        dispatch({
          type:'SET_USER_INFO',
          payload:userInfoFromDb
        })
        navigate('/employer/onboarding')
      }
    }
  }
  
  
  const signIn=()=>{

    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result,'result');
        const user=result.user;
        const {email,displayName,photoURL}=user;
        console.log(email,displayName,photoURL,"user")
        dispatch({
          type:'LOGIN',
          payload:{
            email,displayName,photoURL
          }
        })
        
        redirectUser(email);
      }).catch((error) => {
        console.log(error,'error')
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
