import React, { useState,useEffect } from 'react'
import { useHistory } from 'react-router'
import "./Navbar.css"

function Navbar() {
    let history = useHistory()
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
            <img className="logo" src="" alt="logo" onClick={()=>history.push('/')} />
            {/* <img className="avatar" src="" alt="avatar" /> */}
            <div class="search-box">
            <button class="btn-search"><i class="fas fa-search"></i></button>
            <input type="text" class="input-search" placeholder="Type to Search..."/>
            </div>
        </div>
        </div>
    )
}

export default Navbar
