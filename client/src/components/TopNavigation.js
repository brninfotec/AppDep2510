import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

function TopNavigation() {
  let userDetails = useSelector((store)=>{
    return store.userDetails
  });

  let navigate = useNavigate()

  useEffect(()=>{
    if(userDetails && userDetails.email){

    }else{
    navigate("/")
    }
  },[])
  return (
    
     <nav>
     <Link to="/dashboard">Dashboard</Link>  
     <Link to="/tasks">Tasks</Link>  
     <Link to="/leaves">Leaves</Link> 
     <Link to="/editProfile">EditProfile</Link>
     <Link to="/">Signout</Link> 
    </nav> 
    
  )
}

export default TopNavigation
