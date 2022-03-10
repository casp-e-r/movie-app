import React from 'react'
import './Footer.css'
import {SiThemoviedatabase,SiGithub} from 'react-icons/si'

function Footer() {
    return (
        <div className='footer-container'>
            <div className='footer-logo'>
            <SiThemoviedatabase className='logo-icon'/>
            <a href='https://github.com/casp-e-r/movie-app' target='_blank'><SiGithub className='logo-icon'/></a>
            
            </div>
        </div>
    )
}

export default Footer
