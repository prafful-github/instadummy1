import React from "react";
import NavBar from "../Navbar";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import M from "materialize-css";

const CreatePost = ()=>{

  const nevigate = useNavigate()
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [image, setImage] = useState("")
  const [url, setUrl] = useState("")

  useEffect(()=>{
    if(url){
    fetch("/createpost",{
      method:"post",
      headers:{
          "Content-Type":"application/json",
          "Authorization":"Bearer "+localStorage.getItem("jwt")
      },
      body:JSON.stringify({
          title:title,
          body:body,
          pic:url
      })
  }).then(res=>res.json())
  .then(data=>{
      console.log(data)
      if(data.error){
          M.toast({html:data.error, classes:"#f44336 red"})
      }
      else{
          M.toast({html:"Created post successfully", classes:"#64dd17 light-green accent-4"})
          nevigate('/')
      }
  }).catch(err=>{
      console.log(err)
  })
  }
  
  },[url])

  const postDetails = ()=>{
    const data = new FormData()
    data.append("file", image)
    data.append("upload_preset", "insta-clone")
    data.append("cloud_name","dhzt3cvgq")//cloudinary pe account banaya hai
    fetch("https://api.cloudinary.com/v1_1/dhzt3cvgq/image/upload", {
      method:"post",
      body:data
    })
    .then(res=>res.json())
    .then(data=>{
      setUrl(data.url)
    })
    .catch(err=>{
      console.log(err)
    })

  }

    return(
        <div>
            <NavBar />
            <div className="card input-filed" style={{margin:"30px auto", maxWidth:"500px", padding:"20px", textAlign:"center"}}>
                <input type="text" placeholder="title" value={title} onChange={(e)=>setTitle(e.target.value)} />
                <input type="text" placeholder="body" value={body} onChange={(e)=>setBody(e.target.value)} />
                <div className="file-field input-field">
                  <div className="btn #64b5f6 blue darken-1">
                    <span>Upload Image</span>
                    <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
                  </div>
                  <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                  </div>
                </div>
                <button className="btn waves-effect waves-light #64b5f6 blue darken-1" onClick={()=>postDetails()}>SUBMIT POST</button>
            </div>
        </div>
    )
}

export default CreatePost