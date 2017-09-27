import React, { Component } from 'react';
import './HomePage.css';
class HomePage extends Component {
  render() {
    return (
      <div>
      <div className="dropdown">
  <button className="dropbtn">Themes</button>
  <div className="dropdown-content">
    <a href="#">Defualt(Edge)</a>
    <a href="#">Theme2(Light)</a>
  </div>
</div> 
      <h1>
      weebMD
        </h1>
        <h2>
        Thanks Doc!
        </h2>
        <div className="ui two column stackable grid container">	
 	      	<div className="column" id="Anime">
						<img className="moduleImage" src={require("./Lelouch.jpg")} alt="Find Anime"></img>
						<br/>
							<p className="moduleName">Anime</p>
						</div>
						 	      	<div className="column" id="Manga">
						<img className="moduleImage" src={require("./OnePiece.jpg")} alt="Find Manga"></img>
						<br/>
							<p className="moduleName">Manga</p>
						</div>
						 	      	<div className="column" id="Characters">
						<img className="moduleImage" src={require("./Alucard.png")} alt="Find Character"></img>
						<br/>
							<p className="moduleName">Characters</p>
						</div>
						 	      	<div className="column" id="People">
						<img className="moduleImage" src={require("./Miyazaki.jpg")} alt="Find Person"></img>
						<br/>
							<p className="moduleName">People</p>
						</div>

					</div>
      </div>
    );
  }
}

export default HomePage;
