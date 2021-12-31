import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import "./Navbar.css"
import { BiSearchAlt2 } from "react-icons/bi";

function Navbar() {
    let history = useHistory()
    const [show, handleShow] = useState(false)
    const [search, setSearch] = useState('')
    const transitionNavBar = () => {
        if (window.scrollY > 100) {
            handleShow(true)
        } else {
            handleShow(false)
        }
    }
    const handleSubmit=(e)=>{
            search.length!=0  && 
            history.push(`/search/${search}`)

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
                    <BiSearchAlt2 />
                    </button>
                    <input 
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                    type="text" class="input-search" placeholder=" Search..." />
                </div>



            </div>
        </div>
    )
}

export default Navbar
