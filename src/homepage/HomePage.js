import React, { Component } from 'react';
import styles from './HomePage.scss';
class HomePage extends Component {
render() {
return (
<div id="homepageBody">
	{/* <div id="themeButton">
		<div className="dropdown">
			<button className="dropbtn">Themes</button>
			<div className="dropdown-content">
				<a href="#">Default(Edge)</a>
				<a href="#">Theme2(Light)</a>
			</div>
		</div> 
	</div> */}
	<div>
		<h1>
			weebMD
		</h1>
		<h2>
			Thanks Doc!
		</h2>
	</div>
	<div className="ui two column stackable grid container">	
		<div className="column" id="Anime">
			<img className={styles.moduleImage} src={require("./Lelouch.jpg")} alt="Find Anime"></img>
			<br/>
			<p className={styles.moduleName}>Anime</p>
		</div>
		<div className="column" id="Manga">
			<img className={styles.moduleImage} src={require("./OnePiece.jpg")} alt="Find Manga"></img>
			<br/>
			<p className={styles.moduleName}>Manga</p>
		</div>
		<div className="column" id="Characters">
			<img className={styles.moduleImage} src={require("./Alucard.png")} alt="Find Character"></img>
			<br/>
			<p className={styles.moduleName}>Characters</p>
		</div>
		<div className="column" id="People">
			<img className={styles.moduleImage} src={require("./Miyazaki.jpg")} alt="Find Person"></img>
			<br/>
			<p className={styles.moduleName}>People</p>
		</div>

	</div>
</div>
);
}
}

export default HomePage;
