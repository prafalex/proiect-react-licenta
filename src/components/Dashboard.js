import React, { useState } from 'react'
import { Card, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const [error, setError] = useState('')
  const { currentUser, logout, getImage } = useAuth()
  const navigate = useNavigate()
  async function handleLogout() {
    setError('')

    try {
      await logout()
      navigate('/')
    } catch (error) {
      console.log(error)
      setError('Failed to Log Out')
    }
  }

  return (
    <>
      <div
        className="d-flex align-items-center
    justify-content-center"
        style={{ minHeight: '100vh' }}
      >
        <div className="w-100" style={{ maxWidth: '500px' }}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Profile</h2>
              <div className="align-items-center justify-content-center w-100 d-flex ">
                {getImage() && (
                  <img
                    
                    src={`${getImage()}`}
                    alt="profile"
                    style={{ height: 100, width: 100, borderRadius: 100 / 2 }}
                  />
                )}
              </div>
              {error && <Alert variant="danger">{error}</Alert>}
              <div className="mt-4 text-center">
              <strong className="text-center"> Email : </strong>{' '}
              {currentUser.email}
              </div>
              <Link
                to="/profile-updating"
                className="btn btn-primary w-100 mt-3"
              >
                {' '}
                Update Profile{' '}
              </Link>
              <div className="mt-2 text-center">
                <Link to="/"className="btn btn-outline-primary mx-2" >Back to Home
 </Link>
                <Button variant="outline-danger" onClick={handleLogout}>
                  Log Out
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  )
}
