import React from "react";

import Navbar from "./Components/NavBar/Navbar";
import "./App.css"
import { BrowserRouter as Router, Route } from "react-router-dom";
import ViewMovie from "./Components/ViewMovie/ViewMovie";

import Footer from "./Components/Footer/Footer";

import ViewTitle from "./Components/ViewTitle/ViewTitle";
import ViewHome from "./Components/ViewHome/ViewHome";
import ViewSearch from "./Components/Search/ViewSearch";



function App() {

  return (
    <div className="app">
      <link rel="shortcut icon" href="/fs.jpeg"></link>
      <meta name="decription" content="web app serving details of movies and tv shows made by aswin using TMDB Api" />
      <Router>
        
          <Navbar />
          <div className="main">
            
          <Route exact path='/'>
            <ViewHome/>
          </Route>
          <Route path='/search/:query'>
            <ViewSearch/>
          </Route>
          <Route path='/view/:id'>
            <ViewMovie />
          </Route>
          <Route exact path='/:title'>
            <ViewTitle/>
          </Route>
         
          </div>
          <Footer/>
        
      </Router>
     

    </div>
  );
}

export default App;
