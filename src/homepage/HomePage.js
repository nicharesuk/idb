import React, { Component } from 'react';
import './HomePage.css';
import { ThemeChooser } from 'react-bootstrap-theme-switcher';
class HomePage extends Component {
	render() {
		return (
			<div id="homepageBody">
				<ThemeChooser/>
			</div>
		);
	}
}

export default HomePage;
