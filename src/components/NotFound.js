import React from 'react' 
//import NavBar from './Navbar'
import {Card,Button} from 'react-bootstrap'
import {ReactComponent as Image404} from './utilities/error-404-colour.svg'
import {Link} from "react-router-dom"
export default function NotFound(){
    return(
        <>
        
        <div className="container d-flex align-items-center 
        justify-content-center" style={{minHeight:"100vh"}}>
            <div className='w-100 mt-2' style={{maxWidth:"1200px"}}>
                <Card>
                    <Card.Body >
                        <div className="text-center" >
                         <Image404 style={{maxHeight:"50vh"}}/>
                        </div>
                        <h1 className="text-center mt-2/">This page was not found !</h1>
                        <h5 className="text-center">This is a 404 error, which means that you clicked on a bad link or entered
                            an invalid URL.
                            <br></br>You can go back to the main page by pressing the button down below.
                        </h5>
                        <div className='text-center mt-3'>
                            <Link to="/"><Button variant="primary" size="lg" className='' style={{width:'20rem'}}>Main Page</Button>
                            </Link> 
                       </div>
                    </Card.Body>
                </Card>
            </div>
        </div>
        </>
    )
}