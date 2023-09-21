import {
  Route,
  Link,
  Routes,
  useNavigate

} from "react-router-dom"

import ChatPage from "./components/ChatPage/ChatPage";
import LoginPage from "./components/LoginPage/LoginPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import React, { useEffect } from "react";
import firebase from "./firebase";

import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./redux/actions/user_action";

function App() {

  let dispatch = useDispatch();
  let navigate = useNavigate();
  const isLoading = useSelector(state => state.user.isLoading)

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      console.log('user', user)

      //로그인이 된 상태
      if (user) {
        navigate('/')
        dispatch(setUser(user))
      }
      else {
        navigate('/login')
      }
    })
  }, []);

  if (isLoading) {
    return (
      <div>
        ...loading
      </div>
    )
  }
  else {
    return (
      <Routes>
        <Route exact path='/' Component={ChatPage} />
        <Route exact path='/login' Component={LoginPage} />
        <Route exact path='/register' Component={RegisterPage} />
      </Routes>
    );
  }
}

export default App;
