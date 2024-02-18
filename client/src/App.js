import React, {useEffect, createContext, useReducer, useContext} from "react";
import "./App.css";
import {BrowserRouter,Routes, Route, useNavigate} from 'react-router-dom';
import Home from './components/screens/Home';
import Signup from './components/screens/Signup';
import Signin from './components/screens/Signin';
import Profile from "./components/screens/Profile";
import CreatePost from "./components/screens/CreatePost";
import UserProfile from "./components/screens/UserProfile";
import SubscribedUserPosts from "./components/screens/SubscribesUserPost";
import {reducer, initialState} from "./reducer/userReducer"

export const UserContext = createContext()

const Routing=()=>{
  const nevigate = useNavigate()
  const {state, dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER", payload:user})
    }else{
      nevigate('/signin')
    }
  },[])
  return(
    <Routes>
      <Route exact path='/' element={<Home/>} />
      <Route exact path='/signin' element={<Signin/>} />
      <Route exact path='/signup' element={<Signup/>} />
      <Route exact path='/profile' element={<Profile/>} />
      <Route exact path='/createpost' element={<CreatePost/>} />
      <Route exact path='/profile/:userid' element={<UserProfile/>} />
      <Route exact path='/myfollowingpost' element={<SubscribedUserPosts/>} />
    </Routes>
  )

}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <UserContext.Provider value={{state, dispatch}} >
      <BrowserRouter>
       <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
