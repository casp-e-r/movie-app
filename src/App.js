import React from "react";
import Banner from "./Components/Banner/Banner";
import Navbar from "./Components/NavBar/Navbar";
import "./App.css"
import { BrowserRouter as Router, Route } from "react-router-dom";
import Container from './Components/Container/Container'
import  Tv from "./context";
import ViewMovie from "./Components/ViewMovie/ViewMovie";
import Episodes from "./Components/Episodes/Episodes";
import Footer from "./Components/Footer/Footer";


function App() {
  
  return (
    <div className="App">
      
      <Router>
        
          <Navbar />
          <Route exact path='/'>
            <Banner />
            <Container />
          </Route>
          <Route path='/:id'>
            <Tv>
            <ViewMovie />
            {/* <Episodes/> */}
            </Tv>
          </Route>
        
      </Router>
     

    </div>
  );
}

export default App;
