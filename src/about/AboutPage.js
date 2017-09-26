import React, { Component } from 'react';
import './AboutPage.css';

class AboutPage extends Component {
  render() {
    return (
			<div>
				<p className="topic">
					Meet the Anime All Stars!
				</p>
				<div className="ui three column stackable grid container">	
 	      	<div className="column" id="christopher">
						<img className="img-member" src={require("./christopher.png")} alt="Christopher Gutierrez"></img>
						<br/>
						<p className="member_name">Christopher Gutierrez</p>
						<p className="member_info">About</p>
						<p className="member_info">Role</p>
					</div>
  	      <div className="column" id="corbin">
						<img className="img-member" src={require("./corbin.jpg")} alt="Corbin Rogerson"></img>
						<br/>
						<p className="member_name">Corbin Rogerson</p>
						<p className="member_info">About</p>
						<p className="member_info">Role</p>
					</div>
  	      <div className="column" id="david">
						<img className="img-member" src={require("./david.png")} alt="David Malone"></img>
						<br/>
						<p className="member_name">David Malone</p>
						<p className="member_info">About</p>
						<p className="member_info">Role</p>
					</div>
    	    <div className="column" id="joshua">
						<img className="img-member" src={require("./joshua.jpg")} alt="Joshua Ondrusek"></img>
						<br/>
						<p className="member_name">Joshua Ondrusek</p>
						<p className="member_info">About</p>
						<p className="member_info">Role</p>
					</div>
					<div className="column" id="nelson">
						<img className="img-member" src={require("./nelson.png")} alt="Nelson Swindler"></img>
						<br/>
						<p className="member_name">Nelson Swindler</p>
						<p className="member_info">About</p>
						<p className="member_info">Role</p>
					</div>
					<div className="column" id="randy">
						<img className="img-member" src={require("./randy.jpg")} alt="Randy Thai"></img>
						<br/>
						<p className="member_name">Randy Thai</p>
						<p className="member_info">About</p>
						<p className="member_info">Role</p>
					</div>
				</div>
				<p className="topic">
					Tools
				</p>
				<br/>
				<div className="ui four column stackable grid container">
					<div className="column" id="github">
						<a href="https://github.com/nicharesuk/idb"><img className="img-tool" src={require("./github.png")} alt="Github"></img></a>
					</div>
					<div className="column" id="googlecloudplatform">
						<img className="img-tool" src={require("./googlecloudplatform.png")} alt="Google Cloud Platform"></img>
					</div>
					<div classname="column" id="namecheap">
						<img className="img-tool" src={require("./namecheap.png")} alt="Namecheap"></img>
					</div>
					<div className="column" id="planitpoker">
						<img className="img-tool" src={require("./planitpoker.png")} alt="PlanITPoker"></img>
					</div>
					<div className="column" id="python">
						<img className="img-tool" src={require("./python.png")} alt="PlanITPoker"></img>
					</div>
					<div className="column" id="reactjs">
						<img className="img-tool" src={require("./reactjs.png")} alt="ReactJS"></img>
					</div>
					<div className="column" id="semanticui">
						<img className="img-tool" src={require("./semanticui.png")} alt="SemanticUI"></img>
					</div>
					<div className="column" id="slack">
						<img className="img-tool" src={require("./slack.png")} alt="Slack"></img>
					</div>
					<div className="column" id="trello">
						<a href="https://trello.com/b/KrhsKbmQ/weebmd"><img className="img-tool" src={require("./trello.png")} alt="Slack"></img></a>
					</div>
				</div>
			</div>
    );
  }
}

export default AboutPage;

