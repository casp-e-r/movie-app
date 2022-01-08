import React from "react";

import Navbar from "./Components/NavBar/Navbar";
import "./App.css"
import { BrowserRouter as Router, Route } from "react-router-dom";

import  Loading from "./context";
import ViewMovie from "./Components/ViewMovie/ViewMovie";

import Footer from "./Components/Footer/Footer";


import ViewTitle from "./Components/ViewTitle/ViewTitle";

import ViewHome from "./Components/ViewHome/ViewHome";

import ViewSearch from "./Components/Search/ViewSearch";




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
            {/* <Search/> */}
            <ViewSearch/>
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
          <Footer/>
        
      </Router>
     

    </div>
  );
}

export default App;
