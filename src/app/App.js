import React, { Component } from 'react';
import './App.css';
import { Menu } from 'semantic-ui-react';
import HomePage from '../homepage/HomePage';
import ShowsPage from '../shows/ShowsPage';
import CharactersPage from '../characters/CharactersPage';
import PeoplePage from '../people/PeoplePage';
import MangaPage from '../manga/MangaPage';
import AboutPage from '../about/AboutPage';

const pages = [
  {
    name: "Homepage",
    node: <HomePage />,
  },
  {
    name: "Shows",
    node: <ShowsPage />,
  },
  {
    name: "Characters",
    node: <CharactersPage />,
  },
  {
    name: "People",
    node: <PeoplePage />,
  },
  {
    name: "Manga",
    node: <MangaPage />,
  },
  {
    name: "About",
    node: <AboutPage />,
  },
];

class App extends Component {
  state = {
    currentPage: "Homepage",
  };

  changePage = (nextPage) => {
    this.setState({
      currentPage: nextPage,
    });
  }

  render() {
    const pageElement = pages.filter(obj => obj.name === this.state.currentPage)[0].node;

    return (
      <div className="App">
        <div className="header">
          <Menu inverted pointing secondary size='large'>
            {pages.map(page => {
              return (
                <Menu.Item
                  as='a'
                  key={page.name}
                  onClick={() => this.changePage(page.name)}
                  active={this.state.currentPage === page.name}>
                  {page.name}
                </Menu.Item>
              );
            })}
          </Menu>
        </div>
        {pageElement}
      </div>
    );
  }
}

export default App;
