import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavMenu from '../shared/NavMenu';
import axios from 'axios';
import Graph from 'react-graph-vis';

class VisualizationPage extends Component {

  state = {
    nodes: {},
    links: [],
    windowWidth: 0,
    windowHeight: 0,
    clicked: -1,
    numArtists: -1,
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
      this.setState({numArtists: response.data.length})
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

  sanitizeName = (name) => {
    if (name.length > 10) {
      return `${name.substr(0, 8)}...`
    }
    return name;
  }

  processArtist = (artist) => {
    const artist_id = `${artist.artist.artist_id}-artist`;
    const nodesToAdd = [];
    const linksToAdd = [];

    nodesToAdd.push({id: artist_id, name: this.sanitizeName(artist.artist.name), color: "#e04141"});

    artist.albums.forEach((album) => {
      const album_id = `${album.album_id}-album`;
      nodesToAdd.push({id: album_id, name: this.sanitizeName(album.name), color: "#7be041"});
      linksToAdd.push({from: artist_id, to: album_id});
    });

    artist.cities.forEach((city) => {
      const city_id = `${city.city_id}-city`;
      nodesToAdd.push({id: city_id, name: city.name, color: "#41e0c9"});
      linksToAdd.push({from: city_id, to: artist_id});
    });

    this.setState((state) => {
      const nodes = state.nodes;
      const links = state.links;
      nodesToAdd.forEach(node => nodes[node.id] = node);
      linksToAdd.forEach(link => links.push(link));
      return {...state, nodes, links};
    });
  }

  render() {

    const graph = {
      nodes: Object.values(this.state.nodes).map(node => ({id: node.id, label: node.name, color: node.color})),
      edges: this.state.links.map(link => ({ from: link.from, to: link.to }))
    };

    const options = {
      layout: {
        hierarchical: false
      },
      edges: {
        color: "#000000"
      }
    };

    const num_artists = graph.nodes.filter(node => node.id.endsWith("artist")).length;

    if (num_artists !== this.state.numArtists) {
      return (
        <div style={{height: "100%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
          <div>
            <h1>Loading</h1>
            <h2>{Math.round((num_artists / this.state.numArtists) * 100)}%</h2>
          </div>
        </div>
      );
    }

    return (
      <div>
        <NavMenu
          pages={this.props.pages}
          searchText={this.props.searchText}
          handleSubmit={this.props.handleSubmit} />
        <div style={{height: '100%', width: '100%'}}>
          <Graph graph={graph} options={options} style={{ height: `${this.state.windowHeight}px` }} />
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
