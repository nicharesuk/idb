import React, { Component } from 'react';
import style from './App.scss';
import HomePage from '../homepage/HomePage';
import AnimePage from '../anime/AnimePage';
import CharactersPage from '../characters/CharactersPage';
import ActorsPage from '../actors/ActorsPage';
import MangaPage from '../manga/MangaPage';
import SearchPage from '../search/SearchPage';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const pages = [
  {
    name: "Home",
    link: "/",
    node: (props) => <HomePage {...props} />,
  },
  {
    name: "Anime",
    link: "/anime",
    node: (props) => <AnimePage {...props} />,
  },
  {
    name: "Characters",
    link: "/characters",
    node: (props) => <CharactersPage {...props} />,
  },
  {
    name: "Manga",
    link: "/manga",
    node: (props) => <MangaPage {...props} />,
  },
  {
    name: "Actors",
    link: "/actors",
    node: (props) => <ActorsPage {...props} />,
  },
  {
    name: "Search",
    link: "/search",
    node: (props) => <SearchPage {...props} />,
  }
];

class App extends Component {

  state = {
    searchText: "",
  }

  handleSubmit = (searchText) => {
    this.setState({searchText});
    this.context.router.history.push('/search');
  }

  render() {
    return (
      <div className={style.appContainer}>
        <Switch>
          {pages.map(page => {
            return (
              <Route
                key={page.name}
                exact={page.link === "/"}
                path={page.link} 
                render={() => (
                  page.node({
                    pages: pages,
                    searchText: this.state.searchText,
                    handleSubmit: this.handleSubmit,
                  })
                )} />
            );
          })}
        </Switch>
      </div>
    );
  }
}

App.contextTypes = {
  router: PropTypes.shape({
    history: PropTypes.object.isRequired,
  }),
};

export default App;
