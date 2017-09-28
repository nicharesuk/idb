import React, { Component } from 'react';
import './AboutPage.css';

class AboutPage extends Component {
  render() {
    return (
			<div className="about_container">
				<div id="team">
					<p className="topic">
						Meet the Anime All Stars!
					</p>
					<div className="ui three column stackable grid container">
						<div className="column" id="christopher">
							<img className="img-member" src={require("./christopher.png")} alt="Christopher Gutierrez"></img>
							<p className="member_name">Christopher Gutierrez</p>
							<p className="member_info">Front-End Developer</p>
							<p className="member_info">About</p>
						</div>
						<div className="column" id="corbin">
							<img className="img-member" src={require("./corbin.jpg")} alt="Corbin Rogerson"></img>
							<p className="member_name">Corbin Rogerson</p>
							<p className="member_info">Back-End Developer</p>
							<p className="member_info">Head Weeb</p>
						</div>
						<div className="column" id="david">
							<img className="img-member" src={require("./david.png")} alt="David Malone"></img>
							<p className="member_name">David Malone</p>
							<p className="member_info">Front-End Developer</p>
							<p className="member_info">Believes the Back-End is a black box that does what it tells him to do</p>
						</div>
						<div className="column" id="joshua">
							<img className="img-member" src={require("./joshua.jpg")} alt="Joshua Ondrusek"></img>
							<p className="member_name">Joshua Ondrusek</p>
							<p className="member_info">Back-End Engineer</p>
							<p className="member_info">About</p>
						</div>
						<div className="column" id="nelson">
							<img className="img-member" src={require("./nelson.jpg")} alt="Nelson Swindler"></img>
							<p className="member_name">Nelson Swindler</p>
							<p className="member_info">Front-End Developer</p>
							<p className="member_info">About</p>
						</div>
						<div className="column" id="randy">
							<img className="img-member" src={require("./randy.jpg")} alt="Randy Thai"></img>
							<p className="member_name">Randy Thai</p>
							<p className="member_info">Front-End Developer</p>
							<p className="member_info">Occasionally writes code</p>
						</div>
					</div>
				</div>
				<div id="stats">
					<p className="topic">
						The Stats
					</p>
					<div className="stats_info">
						<p>Apiary API</p>
						<p><a href="https://github.com/nicharesuk/idb">Github Repository</a></p>
						<p>Technical Report</p>
						<p><a href="https://trello.com/b/KrhsKbmQ/weebmd">Trello Board</a></p>
					</div>
				</div>
				<div id="data">
					<p className="topic">
						The Data
					</p>
					<div className="ui two column stackable grid container" id="data">
						<div className="column" id="anilist">
							<p className="data_name">AniList API</p>
							<p className="data_info"><a href="http://anilist-api.readthedocs.io/en/latest/">http://anilist-api.readthedocs.io/en/latest/</a></p>
						</div>
						<div className="column" id="jikan">
							<p className="data_name">Jikan.me API</p>
							<p className="data_info"><a href="https://jikan.me/">https://jikan.me/</a></p>
						</div>
					</div>
				</div>
				<div id="tools">
					<p className="topic">
						The Toolbox
					</p>
					<div className="ui four column stackable grid container">
						<div className="column" id="apiary">
							<img className="img-tool" src={require("./apiary.png")} alt="Apiary"></img>
							<p className="tool_name">Apiary</p>
							<p className="tool_info">API Design, Development & Documentation</p>
						</div>
						<div className="column" id="github">
							<img className="img-tool" src={require("./github.png")} alt="GitHub"></img>
							<p className="tool_name">GitHub</p>
							<p className="tool_info">Version Control Repository</p>
						</div>
						<div className="column" id="googlecloudplatform">
							<img className="img-tool" src={require("./googlecloudplatform.png")} alt="Google Cloud Platform"></img>
							<p className="tool_name">Google Cloud Platform</p>
							<p className="tool_info">Cloud Computing Service</p>
						</div>
						<div className="column" id="namecheap">
							<img className="img-tool" src={require("./namecheap.png")} alt="Namecheap"></img>
							<p className="tool_name">Namecheap</p>
							<p className="tool_info">Domain Name Registrar</p>
						</div>
						<div className="column" id="planitpoker">
							<img className="img-tool" src={require("./planitpoker.png")} alt="PlanITpoker"></img>
							<p className="tool_name">PlanITpoker</p>
							<p className="tool_info">Online Scrum Planning</p>
						</div>
						<div className="column" id="reactjs">
							<img className="img-tool" src={require("./reactjs.png")} alt="ReactJS"></img>
							<p className="tool_name">ReactJS</p>
							<p className="tool_info">Javascript Library for Building UI</p>
						</div>
						<div className="column" id="semanticui">
							<img className="img-tool" src={require("./semanticui.png")} alt="Semantic UI"></img>
							<p className="tool_name">Semantic UI</p>
							<p className="tool_info">UI Component Framework</p>
							</div>
						<div className="column" id="slack">
							<img className="img-tool" src={require("./slack.png")} alt="Slack"></img>
							<p className="tool_name">Slack</p>
							<p className="tool_info">Team Collaboration Tools and Services</p>
						</div>
						<div className="column" id="trello">
							<img className="img-tool" src={require("./trello.png")} alt="Trello"></img>
							<p className="tool_name">Trello</p>
							<p className="tool_info">Project Issue Tracker</p>
						</div>
					</div>
				</div>
			</div>
    );
  }
}

export default AboutPage;

