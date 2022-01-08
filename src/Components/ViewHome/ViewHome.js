import React from 'react'
import Banner from '../Banner/Banner'
import Container from '../Container/Container'
import Footer from '../Footer/Footer'

export default function ViewHome() {
    return (
        <div style={{'position':'relative'}}>
        
            <Banner />
            <Container />
            <Footer/>
        </div>
    )
}
