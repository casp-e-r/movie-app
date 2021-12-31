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
import axios from "./axios";
import { API_KEY } from "./constants/constants";
import ViewTitle from "./Components/ViewTitle/ViewTitle";
import Search from "./Components/Search/Search";



function App() {
  
  // axios.get(`/search/multi?api_key=${API_KEY}&language=en-US&query=ss&page=1&include_adult=false`).then(e=>
  //   console.log(e.data.results))
  return (
    <div className="App">
      
      <Router>
        
          <Navbar />
          <Route exact path='/'>
            <Banner />
            <Container />
          </Route>
          <Route path='/search/:query'>
            <Search/>
          </Route>
          <Route path='/view/:id'>
            <Tv>
            <ViewMovie />
            {/* <Episodes/> */}
            </Tv>
          </Route>
          <Route exact path='/:title'>
            <ViewTitle/>
          </Route>
          {/* <Footer/> */}
        
      </Router>
     

    </div>
  );
}

export default App;
