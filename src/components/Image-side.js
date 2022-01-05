import React,{Component} from 'react'
import {Image} from 'react-bootstrap'
import img from "./utilities/placeholder.gif"

export class Imageside extends Component{
    render(){
        return(
            <>
                <Image rounded className="w-100" src={img}  fluid/>
            </>
        )
    }
}