import React, { Component } from 'react';
import style from './App.scss';
import { Menu } from 'semantic-ui-react';
import HomePage from '../homepage/HomePage';
import ShowsPage from '../shows/ShowsPage';
import CharactersPage from '../characters/CharactersPage';
import PeoplePage from '../people/PeoplePage';
import MangaPage from '../manga/MangaPage';
import AboutPage from '../about/AboutPage';
import { Link, Switch, Route } from 'react-router-dom';

const pages = [
  {
    name: "Homepage",
    link: "/",
    node: <HomePage />,
  },
  {
    name: "Anime",
    link: "/shows",
    node: <ShowsPage />,
  },
  {
    name: "Characters",
    link: "/characters",
    node: <CharactersPage />,
  },
  {
    name: "Manga",
    link: "/manga",
    node: <MangaPage />,
  },
  {
    name: "Voice Actors",
    link: "/people",
    node: <PeoplePage />,
  },
  {
    name: "About",
    link: "/about",
    node: <AboutPage />,
  },
];

class App extends Component {

  render() {
    return (
      <div className={style.appContainer}>
        <div className={style.header}>
          <Menu inverted pointing secondary size='large'>
            {pages.map(page => {
              return (
                <Link key={page.name} to={page.link}>
                  <Menu.Item
                    as='div'
                    active={page.link === "/" ? window.location.href.endsWith("/#/") : window.location.href.includes(page.link)}>
                    {page.name}
                  </Menu.Item>
                </Link>
              );
            })}
          </Menu>
        </div>
        <Switch>
          {pages.map(page => {
            return (
              <Route
                key={page.name}
                exact={page.link === "/"}
                path={page.link} 
                render={() => page.node} />
            );
          })}
        </Switch>
      </div>
    );
  }
}

export default App;
