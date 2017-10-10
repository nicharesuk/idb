import React, { Component } from 'react';
import styles from './AboutPage.scss';

class AboutPage extends Component {
  render() {
    return (
			<div className={styles.about_container}>
				<div id="team">
					<p className={styles.topic}>
						Meet the Anime All Stars!
					</p>
					<div className="ui three column stackable grid container">
						<div className="column" id="christopher">
							<img className={styles.img_member} src={require("./assets/images/christopher.jpg")} alt="Christopher Gutierrez"></img>
							<p className={styles.member_name}>Christopher Gutierrez</p>
							<p className={styles.member_info}>Front-End Developer</p>
							<p className={styles.member_info}>Funny Text Here</p>
						</div>
						<div className="column" id="corbin">
							<img className={styles.img_member} src={require("./assets/images/corbin.jpg")} alt="Corbin Rogerson"></img>
							<p className={styles.member_name}>Corbin Rogerson</p>
							<p className={styles.member_info}>Back-End Developer</p>
							<p className={styles.member_info}>Head Weeb</p>
						</div>
						<div className="column" id="david">
							<img className={styles.img_member} src={require("./assets/images/david.png")} alt="David Malone"></img>
							<p className={styles.member_name}>David Malone</p>
							<p className={styles.member_info}>Front-End Developer</p>
							<p className={styles.member_info}>Believes the Back-End is a black box that does what it tells him to do</p>
						</div>
						<div className="column" id="joshua">
							<img className={styles.img_member} src={require("./assets/images/joshua.jpg")} alt="Joshua Ondrusek"></img>
							<p className={styles.member_name}>Joshua Ondrusek</p>
							<p className={styles.member_info}>Back-End Developer</p>
							<p className={styles.member_info}>Does what Corbin tells him to do</p>
						</div>
						<div className="column" id="nelson">
							<img className={styles.img_member} src={require("./assets/images/nelson.jpg")} alt="Nelson Swindler"></img>
							<p className={styles.member_name}>Nelson Swindler</p>
							<p className={styles.member_info}>Front-End Developer</p>
							<p className={styles.member_info}>Chief Bug Creator</p>
						</div>
						<div className="column" id="randy">
							<img className={styles.img_member} src={require("./assets/images/randy.jpg")} alt="Randy Thai"></img>
							<p className={styles.member_name}>Randy Thai</p>
							<p className={styles.member_info}>Front-End Developer</p>
							<p className={styles.member_info}>Occasionally writes code</p>
						</div>
					</div>
				</div>
				<div id="stats">
					<p className={styles.topic}>
						The Stats
					</p>
					<div className={styles.stats_info}>
						<p><a href="http://docs.weebmd.apiary.io/#">Apiary API</a></p>
						<p><a href="https://github.com/nicharesuk/idb">Github Repository</a></p>
						<p><a href="https://utexas.app.box.com/s/12veh1vpkd48wn90j1tztlnslcl6ockg">Technical Report</a></p>
						<p><a href="https://trello.com/b/KrhsKbmQ/weebmd">Trello Board</a></p>
					</div>
				</div>
				<div id="data">
					<p className={styles.topic}>
						The Data
					</p>
					<div className="ui two column stackable grid container" id="data">
						<div className="column" id="anilist">
							<p className={styles.data_name}>AniList API</p>
							<p className={styles.data_info}><a href="http://anilist-api.readthedocs.io/en/latest/">http://anilist-api.readthedocs.io/en/latest/</a></p>
						</div>
						<div className="column" id="jikan">
							<p className={styles.data_name}>Jikan.me API</p>
							<p className={styles.data_info}><a href="https://jikan.me/">https://jikan.me/</a></p>
						</div>
					</div>
				</div>
				<div id="tools">
					<p className={styles.topic}>
						The Toolbox
					</p>
					<div className="ui four column stackable grid container">
						<div className="column" id="apiary">
							<img className={styles.img_tool} src={require("./assets/images/apiary.png")} alt="Apiary"></img>
							<p className={styles.tool_name}>Apiary</p>
							<p className={styles.tool_info}>API Design Development & Documentation</p>
						</div>
						<div className="column" id="github">
							<img className={styles.img_tool} src={require("./assets/images/github.png")} alt="GitHub"></img>
							<p className={styles.tool_name}>GitHub</p>
							<p className={styles.tool_info}>Version Control Repository</p>
						</div>
						<div className="column" id="googlecloudplatform">
							<img className={styles.img_tool} src={require("./assets/images/googlecloudplatform.png")} alt="Google Cloud Platform"></img>
							<p className={styles.tool_name}>Google Cloud Platform</p>
							<p className={styles.tool_info}>Cloud Computing Service</p>
						</div>
						<div className="column" id="namecheap">
							<img className={styles.img_tool} src={require("./assets/images/namecheap.png")} alt="Namecheap"></img>
							<p className={styles.tool_name}>Namecheap</p>
							<p className={styles.tool_info}>Domain Name Registrar</p>
						</div>
						<div className="column" id="planitpoker">
							<img className={styles.img_tool} src={require("./assets/images/planitpoker.png")} alt="PlanITpoker"></img>
							<p className={styles.tool_name}>PlanITpoker</p>
							<p className={styles.tool_info}>Online Scrum Planning</p>
						</div>
						<div className="column" id="reactjs">
							<img className={styles.img_tool} src={require("./assets/images/reactjs.png")} alt="ReactJS"></img>
							<p className={styles.tool_name}>ReactJS</p>
							<p className={styles.tool_info}>Javascript Library for Building UI</p>
						</div>
						<div className="column" id="semanticui">
							<img className={styles.img_tool} src={require("./assets/images/semanticui.png")} alt="Semantic UI"></img>
							<p className={styles.tool_name}>Semantic UI</p>
							<p className={styles.tool_info}>UI Component Framework</p>
							</div>
						<div className="column" id="slack">
							<img className={styles.img_tool} src={require("./assets/images/slack.png")} alt="Slack"></img>
							<p className={styles.tool_name}>Slack</p>
							<p className={styles.tool_info}>Team Collaboration Tools and Services</p>
						</div>
						<div className="column" id="trello">
							<img className={styles.img_tool} src={require("./assets/images/trello.png")} alt="Trello"></img>
							<p className={styles.tool_name}>Trello</p>
							<p className={styles.tool_info}>Project Issue Tracker</p>
						</div>
					</div>
				</div>
			</div>
    );
  }
}

export default AboutPage;

