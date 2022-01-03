import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
export default function Update() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [errorlogin,setEL]=useState(false)
  const [image,setImage]=useState("");
  const { currentUser, passUpdate, emailUpdate ,uploadImage} = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  

  function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    setLoading(true);
    setError("");
    const promise = [];

    if (emailRef.current.value !== currentUser.email) {
      promise.push(emailUpdate(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promise.push(passUpdate(passwordRef.current.value));
    }

    if(image){
      promise.push(uploadImage(image));
      
    }



    Promise.all(promise)
      .then(() => {
        navigate("/dashboard");
      })
      .catch((error) => {
        console.log(error.message)
        if(error.message=== "Firebase: This operation is sensitive and requires recent authentication. Log in again before retrying this request. (auth/requires-recent-login).")
        {setEL(true)}  
        setError("Update profile failed");
      })
      .finally(() => {
        setLoading(false);
      });
  }
  return (
    <>
      <div
      
        className="container d-flex align-items-center
    justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "500px" }}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Profile Updating</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              {errorlogin && <><Alert variant="danger">Please Log In again ! </Alert>
              <Link to="/relogin"><Button className="w-100 mb-2">Log In</Button> </Link>
              
              </> }
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    ref={emailRef}
                    required
                    defaultValue={currentUser.email}
                  />
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    ref={passwordRef}
                    placeholder="Leave empty for the same password"
                  />
                </Form.Group>
                <Form.Group id="password-confirm">
                  <Form.Label>Password Confirmation</Form.Label>
                  <Form.Control
                    type="password"
                    ref={passwordConfirmRef}
                    placeholder="Leave empty for the same password"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Choose your picture</Form.Label>
                  <Form.Control type="file"  onChange={(e)=>{setImage(e.target.files[0])}}/>
                </Form.Group>
                <Button disabled={loading} className="w-100 mt-2" type="submit">
                  Update profile
                </Button>
              </Form>
              <div className="w-100 text-center mt-2">
            <Link to="/dashboard">Cancel </Link>
          </div>
            </Card.Body>
          </Card>
          </div>
          
        
      </div>
    </>
  );
  
}

