import React, { useEffect } from 'react'
import Banner from '../Banner/Banner'
import Container from '../Container/Container'


export default function ViewHome() {
    useEffect(() => {
        document.title = 'catchy'
     }, []);
    return (
        <div style={{'position':'relative'}}>
        
            <Banner />
            <Container />
         
        </div>
    )
}
