import React from "react"
//import { Container } from "react-bootstrap";
import {BrowserRouter as Router,Routes,Route ,Navigate} from "react-router-dom" 
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import SignUp from "./SignUp";
import Dashboard from "./Dashboard"
import Login from "./Login"
import ResetPassword from "./ResetPassword"
import Home from "./Home"
import Update from "./Update"
import Relogin from "./ReLogin"
import back from "./utilities/back.jpg"
import NotFound from "./NotFound"
//import Web3 from "web3"

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
    
    <div style={backGround} className="vh-100"> 
        <Router>
          <AuthProvider>
            <Routes>
            <Route path="*" element={<NotFound/>} />
            <Route path="/relogin" element={
              
                <PrivateRoute> <Relogin />  </PrivateRoute>
              } />
            <Route path="/" exact element={
          <Home/>    
            } />

            <Route path="/dashboard" element={
                <PrivateRoute> <Dashboard />  </PrivateRoute>
              } />
              <Route path="/profile-updating" element={
                <PrivateRoute> <Update />  </PrivateRoute>
              } />
              <Route path="/signup" element={
                <Notlogin><SignUp/> </Notlogin>
              } />
              <Route path="/login" element={
                <Notlogin><Login/> </Notlogin>
              } />
              <Route path="/password-reset" element={<ResetPassword/>} />
            </Routes>
          </AuthProvider>
         </Router>
      </div>
    

   
    
    
  );
}

export default App;
