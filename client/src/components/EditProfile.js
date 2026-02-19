import React, { useRef, useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import TopNavigation from './TopNavigation';
import { useSelector } from 'react-redux';



function EditProfile() {

    let [profilePic,setProfilePic] = useState("https://pulse.brninfotech.com/media/auth/images/no-pic3.png")

    let firstNameInputRef = useRef();
    let lastNameInputRef = useRef();
    let ageInputRef = useRef();
    let emailInputRef = useRef();
    let passwordInputRef = useRef();
    let mobileNoInputRef = useRef();
    let profilePicInputRef = useRef();

    let userDetails = useSelector((store)=>{
        return store.userDetails
    })

    useEffect(()=>{
   firstNameInputRef.current.value =userDetails.firstName;
   lastNameInputRef.current.value =userDetails.lastName;
   ageInputRef.current.value =userDetails.age;
   emailInputRef.current.value =userDetails.email;
   mobileNoInputRef.current.value =userDetails.mobileNo;
    setProfilePic(`/${userDetails.profilePic}`) 
    },[])

    let onUpdateProfile = async ()=>{
     let dataToSend = new FormData();
     dataToSend.append("firstName",firstNameInputRef.current.value)
     dataToSend.append("lastName",lastNameInputRef.current.value)
     dataToSend.append("age",ageInputRef.current.value)
     dataToSend.append("email",emailInputRef.current.value)
     dataToSend.append("password",passwordInputRef.current.value)
     dataToSend.append("mobileNo",mobileNoInputRef.current.value);

    for(let i=0;i<profilePicInputRef.current.files.length;i++){
   dataToSend.append("profilePic",profilePicInputRef.current.files[i])
    }

     let reqOptions = {
        method:"PATCH",
        body:dataToSend,
    
     }

     let JSONData = await fetch("/updateProfile",reqOptions);
     let JSOData = await JSONData.json();
     console.log(JSOData)
     alert(JSOData.msg)
    }
  return (
    <div className="App">
        <TopNavigation></TopNavigation>
      <form>
        <h2>Edit Profile</h2>
        <div>
            <label>First Name</label>
            <input ref={firstNameInputRef}></input>
        </div>
        <div>
            <label>Last Name</label>
            <input ref={lastNameInputRef}></input>
        </div>
        <div>
            <label>Age</label>
            <input ref={ageInputRef}></input>
        </div>
        <div>
            <label>Email</label>
            <input ref={emailInputRef} readOnly></input>
        </div>
        <div>
            <label>Password</label>
            <input ref={passwordInputRef}></input>
        </div>
        <div>
            <label>Mobile.No</label>
            <input ref={mobileNoInputRef}></input>
        </div>
        <div>
            <label>Profile Pic</label>
            <input ref={profilePicInputRef} type='file' onChange={(e)=>{
         let selectedPath = URL.createObjectURL(e.target.files[0]);
         setProfilePic(selectedPath); 
            }}></input>
            <div style={{border: "2px solid black",width:"180px",height:"180px"}}>
                <img src={profilePic} alt=""></img>
            </div>
        </div>
        <div>
          
     <button type="button" onClick={()=>{
             onUpdateProfile()
            }}>updateProfile</button>
        </div>
      </form>
      
    </div>
  )
}

export default EditProfile
