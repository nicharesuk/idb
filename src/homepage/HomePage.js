import React, { Component } from 'react';
import './HomePage.css';
import { ThemeChooser } from 'react-bootstrap-theme-switcher';
import { Carousel } from 'react-bootstrap';

class HomePage extends Component {
	render() {

		return (
			<div id="homepageBody">
				<ThemeChooser/>
				<div className="ui container">
					<Carousel>
						<Carousel.Item>
							<img className="carousel_img" src={require("./Lelouch.jpg")} alt="Lelouch"/>
						</Carousel.Item>
						<Carousel.Item>
							<img className="carousel_img" src={require("./OnePiece.jpg")} alt="One Piece"/>
						</Carousel.Item>
						<Carousel.Item>
							<img className="carousel_img" src={require("./Alucard.png")} alt="Alucard"/>
						</Carousel.Item>
						<Carousel.Item>
							<img className="carousel_img" src={require("./Miyazaki.jpg")} alt="Miyazaki"/>
						</Carousel.Item>
					</Carousel>
				</div>
			</div>
		);
	}
}

export default HomePage;
