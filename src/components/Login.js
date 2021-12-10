import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Imageside } from "./Image-side";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch (error) {
      setError("Failed to sign in");
      console.log(error);
    }

    setLoading(false);
  }

  return (
    <>
      <div
        
        className=" container d-flex align-items-center
    justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "1200px" }}>
          <div className="row gx-2 justify-content-center">
            <div className="col-md-6">
              <Card>
                <Card.Body>
                  <h2 className="text-center mb-4">Log In</h2>
                  {error && <Alert variant="danger">{error}</Alert>}
                  <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" ref={emailRef} required />
                    </Form.Group>
                    <Form.Group id="password">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        ref={passwordRef}
                        required
                      />
                    </Form.Group>
                    <Button disabled={loading} className="w-100 mt-2" type="submit">
                      Log In
                    </Button>
                    <Link to="/login">
                      <Button variant="outline-primary" className="w-100 mt-3">
                        Connect with MetaMask 🦊 
                      </Button>
                    </Link>
                    <div className="w-100 text-center mt-2">
                      <Link to="/password-reset"> Reset Password</Link>
                    </div>
                  </Form>
                  <div className="w-100 text-center mt-2">
                    Need an account ? <Link to="/signup">Sign Up</Link>
                  </div>
                </Card.Body>
              </Card>
            </div>
            <div class="col-md-6 rounded ">
              <Imageside />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
