import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavMenu from '../shared/NavMenu';
import axios from 'axios';
import { ForceGraph, ForceGraphNode, ForceGraphLink } from 'react-vis-force';

class VisualizationPage extends Component {

  state = {
    nodes: new Set(),
    links: [],
    windowWidth: 0,
    windowHeight: 0,
    clicked: -1,
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({ windowWidth: window.innerWidth, windowHeight: window.innerHeight});
  }

  componentDidMount = () => {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    this.getAllData();
  }

  getAllData = () => {
    this.getAllArtists().then((response) => {
      response.data.map(artist => this.addArtist(artist.artist_id));
    });
  }

  addArtist = (id) => {
    this.getArtist(id).then((response) => {
      this.processArtist(response.data);
    });
  }

  getAllArtists = () => {
    return axios({
      method: 'get',
      url: 'http://poupon.me/api/artists',
      headers: {'Content-Type': 'application/json'},
    });
  }

  getArtist = (id) => {
    return axios({
      method: 'get',
      url: `http://poupon.me/api/artists/${id}`,
      headers: {'Content-Type': 'application/json'},
    });
  }

  processArtist = (artist) => {
    const artist_key = `artist-${artist.artist.artist_id}`;
    const nodes = this.state.nodes;
    const links = this.state.links;

    nodes.add(artist_key);

    artist.albums.forEach((album) => {
      const album_key = `album-${album.album_id}`;
      nodes.add(album_key);
      links.push({source: artist_key, target: album_key});
    });

    artist.cities.forEach((city) => {
      const city_key = `city-${city.city_id}`;
      nodes.add(city_key);
      links.push({source: artist_key, target: city_key});
    });

    this.setState({
      nodes,
      links,
    });
  }

  getColor = (key) => {
    if        (key.startsWith('album')) {
      return "blue";
    } else if (key.startsWith('artist')) {
      return "red";
    } else if (key.startsWith('city')) {
      return "green";
    } else {
      return "";
    }
  }

  render() {
    //console.log(window.innerWidth);

    const nodes = Array.from(this.state.nodes);
    const links = this.state.links;

    return (
      <div>
        <NavMenu
          pages={this.props.pages}
          searchText={this.props.searchText}
          handleSubmit={this.props.handleSubmit} />
        <div style={{height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <ForceGraph
            zoom
            simulationOptions={
              {
                animate: true,
                height: this.state.windowHeight,
                width: this.state.windowWidth,
              }
            }>
            {nodes.map((node, index) => (
              <ForceGraphNode
                key={node}
                onClick={() => this.setState({clicked: index})}
                showLabel={this.state.clicked === index}
                node={{id: node, labelAttr: "labelAttr"}}
                fill={this.getColor(node)} />)
            )}
            {links.map(link => <ForceGraphLink key={`${link.source}-${link.target}`} link={link} />)}
          </ForceGraph>
        </div>
      </div>
    );
  }
}

VisualizationPage.propTypes = {
  pages: PropTypes.array,
  searchText: PropTypes.string,
  handleSubmit: PropTypes.func,
  page: PropTypes.number,
}

export default VisualizationPage;
