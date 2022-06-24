import React from "react"
//import { Container } from "react-bootstrap";
import {BrowserRouter as Router,Routes,Route ,Navigate} from "react-router-dom" 
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import SignUp from "./SignUp";
import Dashboard from "./Dashboard"
import Login from "./Login"
import ResetPassword from "./ResetPassword"
import Test from "./Test"
import Home from "./Home"
import Update from "./Update"
import Relogin from "./ReLogin"
import back from "./utilities/back.jpg"
import NotFound from "./NotFound"

var backGround = {
  backgroundImage: `url(${back})`
}

function PrivateRoute({children}){
  const {currentUser}=useAuth()
  return currentUser? children : <Navigate to="/login"/>

}

function Notlogin({children}){
  const {currentUser}=useAuth()
  return !currentUser? children : <Navigate to="/"/>

}

function App() {
  return (
    <div style={{backgroundImage: `url(${back})`, minHeight:'100vh'
  }} > 
        <Router>
          <AuthProvider>
            <Routes>
            <Route path="*" element={<NotFound/>} />
              <Route path="/" element={<Test/>} />
            </Routes>
          </AuthProvider>
         </Router>
      </div>
  );
}

export default App;
