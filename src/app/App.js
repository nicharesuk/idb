import React, { Component } from 'react';
import './App.css';
import { Menu } from 'semantic-ui-react';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="header">
          <Menu inverted pointing secondary size='large'>
            <Menu.Item as='a' active>Shows</Menu.Item>
            <Menu.Item as='a'>Characters</Menu.Item>
            <Menu.Item as='a'>Studios</Menu.Item>
            <Menu.Item as='a'>Manga</Menu.Item>
          </Menu>
        </div>
      </div>
    );
  }
}

export default App;
