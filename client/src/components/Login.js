import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';


function Login() {

    let navigate = useNavigate();
    let dispatch = useDispatch()
    let emailInputRef = useRef();
    let passwordInputRef = useRef();

    useEffect(()=>{
      if(localStorage.getItem("token")){
        // onValidateToken();
      }
    },[])

     let onValidateToken = async ()=>{
     let dataToSend = new FormData();
    
     dataToSend.append("token",localStorage.getItem("token"))
    
     let reqOptions = {
        method:"POST",
        body:dataToSend,
    
     }

     let JSONData = await fetch("/validateToken",reqOptions);
     let JSOData = await JSONData.json();
     console.log(JSOData)
     alert(JSOData.msg)
     if(JSOData.status === "Success"){
     dispatch({type:"login",data:JSOData.data})
      navigate("/dashboard")
     }
    }
   
    let onLogIn = async ()=>{
     let dataToSend = new FormData();
     
     dataToSend.append("email",emailInputRef.current.value)
     dataToSend.append("password",passwordInputRef.current.value)
    
     let reqOptions = {
        method:"POST",
        body:dataToSend,
    
     }

     let JSONData = await fetch("/login",reqOptions);
     let JSOData = await JSONData.json();
     console.log(JSOData)
     alert(JSOData.msg)
     if(JSOData.status === "Success"){
     localStorage.setItem("token",JSOData.data.token)
     dispatch({type:"login",data:JSOData.data})
      navigate("/dashboard")
     }
    }
  return (
    <div className="App">
      <form>
        <h2>Login</h2>
        
        <div>
            <label>Email</label>
            <input ref={emailInputRef}></input>
        </div>
        <div>
            <label>Password</label>
            <input ref={passwordInputRef}></input>
        </div>
        
        <div>
             <button type="button" onClick={()=>{
             onLogIn()
            }}>Click Here to Login</button>
        </div>
      </form>
      <br></br>
      <br></br>
      <Link to="/signup">Signup</Link>
    </div>
  )
}

export default Login
