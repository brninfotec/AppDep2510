import React from 'react'
import TopNavigation from './TopNavigation'
import { useSelector } from 'react-redux'

function Dashboard() {
  let userDetails = useSelector((store)=>{
    return store.userDetails
  });
  console.log(userDetails)

  let onDeleteAccount = async ()=>{
    let dataToSend = new FormData()
    dataToSend.append("email",userDetails.email)

    let reqOptions ={
      method:"DELETE",
      body:dataToSend
    }
    let JSONData = await fetch("http://localhost:3333/deleteProfile",reqOptions)
    let JSOData = await JSONData.json();
    alert(JSOData.msg)
  }

  return (
    <div>
        <TopNavigation></TopNavigation>
      <h1>Dashboard</h1>
      <button type='button' onClick={()=>{
      onDeleteAccount()
      }}>Delete Profile</button>
      <h1>{userDetails.firstName}  {userDetails.lastName}</h1>
      <img src={`http://localhost:3333/${userDetails.profilePic}`} alt=''></img>
    </div>
  )
}

export default Dashboard
