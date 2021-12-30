import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import "./Navbar.css"
import { BiSearchAlt2 } from "react-icons/bi";

function Navbar() {
    let history = useHistory()
    const [show, handleShow] = useState(false)
    const transitionNavBar = () => {
        if (window.scrollY > 100) {
            handleShow(true)
        } else {
            handleShow(false)
        }
    }
    const handleSubmit=(e)=>{
            e.preventDefault()
            console.log('1111');

    }
    useEffect(() => {
        window.addEventListener('scroll', transitionNavBar)

        return () => {
            window.removeEventListener('scroll', transitionNavBar)
        }
    }, [])
    return (
        <div className={`nav ${ show && 'nav_black'}`}>
            <div className="nav_content">
                <div className='logo-outer'>
                    <img className="logo" src="" alt="logo" onClick={() => history.push('/')} />
                    {/* <img className="avatar" src="" alt="avatar" /> */}
                </div>
                <div class="search-box">
                    <button class="btn-search"
                    onClick={handleSubmit}>
                    <BiSearchAlt2/>
                    </button>
                    <input type="text" class="input-search" placeholder="Type to Search..." />
                </div>



            </div>
        </div>
    )
}

export default Navbar
