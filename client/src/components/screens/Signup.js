import React from "react";
import NavBar from "../Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import M from "materialize-css";

const Signup = () =>{

    const nevigate = useNavigate()
    const [name, setName]= useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [image, setImage] = useState("")
    const [url, setUrl] = useState(undefined)
    useEffect(()=>{
        if(url){
            uploadFields()
        }
    },[url])

    const uploadPic = ()=>{
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

    const uploadFields = ()=>{
        if(!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            return M.toast({html:"Invalid email", classes:"#f44336 red"})
        }
        fetch("/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name:name,
                password:password,
                email:email,
                pic:url
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html:data.error, classes:"#f44336 red"})
            }
            else{
                M.toast({html:data.message, classes:"#64dd17 light-green accent-4"})
                nevigate('/signin')
            }
        }).catch(err=>{
            console.log(err)
        })
    }
    const PostData = ()=>{
        if(image){
            uploadPic()
        }else{
            uploadFields()
        }
    }

    return(
        <div>
            <NavBar />
            <div className="mycard">
                <div className="card auth-card input-field">
                    <h2>Instagram</h2>
                    <input type="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} />
                    <input type="text" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                    <div className="file-field input-field">
                        <div className="btn #64b5f6 blue darken-1">
                            <span>Upload pic</span>
                            <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
                        </div>
                    <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                    </div>
                    </div>
                    <button className="btn waves-effect waves-light #64b5f6 blue darken-1" onClick={()=>PostData()}>Signup</button>
                    <h5><Link to="/signin">Already have an account ?</Link></h5>
                </div>
            </div>
        </div>
    )
}

export default Signup