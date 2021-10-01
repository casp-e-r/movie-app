import React from "react";
import Banner from "./Components/Banner/Banner";
import Navbar from "./Components/NavBar/Navbar";
import "./App.css"
import Row from "./Components/Row/Row";
import requests from "./requests";


function App() {
  return (
    <div className="App">
      <Navbar/>
      <Banner/>
      <Row title="Netflix originals" url={requests.NetflixOriginals} isLargeRow /> 
      <Row title="Action" url={requests.Action}  />
      <Row title="Top Rated" url={requests.TopRated}  />
      <Row title="Top Rated" url={requests.TvMovie}  />
      <Row title="Horror" url={requests.Horror}  />
      <Row title="Sci-Fi" url={requests.Scifi}  />   
      <Row title="Romance" url={requests.Romance}  />
      <Row title="Comedy" url={requests.Comedy}  />
      <Row title="Drama" url={requests.Drama}  />
     

    </div>
  );
}

export default App;
