import React from "react";
import Banner from "./Components/Banner/Banner";
import Navbar from "./Components/NavBar/Navbar";
import "./App.css"
import { BrowserRouter as Router, Route } from "react-router-dom";
import Container from './Components/Container/Container'
import  Loading from "./context";
import ViewMovie from "./Components/ViewMovie/ViewMovie";

import Footer from "./Components/Footer/Footer";
import axios from "./axios";
import { API_KEY } from "./constants/constants";
import ViewTitle from "./Components/ViewTitle/ViewTitle";
import Search from "./Components/Search/Search";
import ViewHome from "./Components/ViewHome/ViewHome";
import Cast from "./Components/ViewMovie/Cast/Cast";



function App() {
  
  // axios.get(`/search/multi?api_key=${API_KEY}&language=en-US&query=ss&page=1&include_adult=false`).then(e=>
  //   console.log(e.data.results))
  return (
    <div className="app">
      
      <Router>
        
          <Navbar />
          <div className="main">
            <Loading>
          <Route exact path='/'>
            <ViewHome/>
          </Route>
          <Route path='/search/:query'>
            <Search/>
          </Route>
          <Route path='/view/:id'>
            <ViewMovie />
            <></>
            {/* <Episodes/> */}
          </Route>
          <Route exact path='/:title'>
            <ViewTitle/>
          </Route>
          </Loading>
          </div>
          {/* <Footer/> */}
        
      </Router>
     

    </div>
  );
}

export default App;
