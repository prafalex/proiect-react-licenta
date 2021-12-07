import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { Imageside } from "./Image-side";
export default function ResetPassword() {
  const emailRef = useRef();
  const { resetPass } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setMessage("")
      setError("")
      setLoading(true)
      await resetPass(emailRef.current.value)
      setMessage("Verify your mail to reset password")
      
    } catch (error) {
      setError("Failed to reset password")
      console.log(error)
    }
    
    setLoading(false);
  }

  return (
    <>
      <div className=" container d-flex align-items-center
    justify-content-center" style={{ minHeight: "100vh" }}>
        <div className="row gx-2 justify-content-center">
          <div className="col-md-6">
            <Card>
              <Card.Body>
                <h2 className="text-center mb-4">Reset Password</h2>
                {message && <Alert variant="success">{message}</Alert>}
                {error && <Alert variant="danger">{error}</Alert>}
                
                <Form onSubmit={handleSubmit}>
                  <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" ref={emailRef} required />
                  </Form.Group>
                  <Button disabled={loading} className="w-100 mt-2" type="submit">
                    Reset
                  </Button>
                  <div className="w-100 text-center mt-3">
                    <Link to="/login">Back to Log In</Link>
                  </div>
                </Form>
              </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
              Need an account ? <Link to="/signup">Sign Up</Link>
            </div>
          </div>
          <div className="col-md-6 rounded ">
            <Imageside />
          </div>
        </div>
      </div>
    </>
  );
}
