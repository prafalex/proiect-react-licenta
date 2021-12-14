import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { Imageside } from './Image-side'
import firebase from 'firebase/compat/app'

export default function Login() {
  //const emailRef = useRef()
  const passwordRef = useRef()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  //user.reauthenticate(credentials)

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError('')
      setLoading(true)
      const user = firebase.auth().currentUser
      var credentials = firebase.auth.EmailAuthProvider.credential(
        user.email,
        passwordRef.current.value,
      )
      await user.reauthenticateWithCredential(credentials)
      navigate('/profile-updating')
    } catch (error) {
      setError('Failed to sign in')
      console.log(error)
    }

    setLoading(false)
  }

  return (
    <>
      <div
        className=" container d-flex align-items-center
    justify-content-center"
        style={{ minHeight: '100vh' }}
      >
        <div className="w-100" style={{ maxWidth: '1200px' }}>
          <div className="row gx-2 justify-content-center">
            <div className="col-md-6">
              <Card>
                <Card.Body>
                  <h2 className="text-center mb-4">Re-Authentication</h2>
                  <h6 className="text-center mb-2">
                    To update your profile please enter your password!
                  </h6>
                  {error && <Alert variant="danger">{error}</Alert>}
                  <Form onSubmit={handleSubmit}>
                    <Form.Group id="password">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        ref={passwordRef}
                        required
                      />
                    </Form.Group>
                    <Button
                      disabled={loading}
                      className="w-100 mt-2"
                      type="submit"
                    >
                      Log In
                    </Button>
                    <div className="w-100 text-center mt-2">
                      <Link to="/password-reset"> Reset Password</Link>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </div>
            <div className="col-md-6 rounded ">
              <Imageside />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
