import React, { useState,useEffect } from 'react'
import "./Navbar.css"

function Navbar() {
    const [show , handleShow] = useState(false)
    const transitionNavBar=()=>{
        if(window.scrollY>100){
            handleShow(true)
        }else{
            handleShow(false)
        }
    }
    useEffect(() => {
        window.addEventListener('scroll',transitionNavBar)

        return () => {
            window.removeEventListener('scroll',transitionNavBar)
        }
    }, [])
    return (
        <div className={`nav ${show && 'nav_black'}`}>
            <div className="nav_content">
            <img className="logo" src="" alt="logo" />
            <img className="avatar" src="" alt="avatar" />
        </div>
        </div>
    )
}

export default Navbar
