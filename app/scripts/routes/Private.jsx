import React from 'react';
import Helmet from 'react-helmet';
import { Switch, Route, Redirect } from 'react-router-dom';

import Titlebar from 'components/Titlebar';
import PopularTitles from 'containers/PopularTitles';
import Videos from 'containers/Videos';

export default class Private extends React.Component {
  state = {
    title: '',
  };

  setTitle = (title) => {
    this.setState({
      title,
    });
  }

  render() {
    return (
      <div key="Private" className="app__private app__route">
        <Helmet onClientStateChange={(newState) => this.setState({ title: newState.title })} />
        <Titlebar title={this.state.title} />
        <div className="app__container">
          {
            // <div className="app__private__header">
            // </div>
          }
          <div className="app__private__content">
            <Switch>
              <Route path="/popular/series" render={() => <Videos programType="series" title="Popular Series" initComplete={this.setTitle} max={21} />} />
              <Route path="/popular/movies" render={() => <Videos programType="movies" title="Popular Movies" initComplete={this.setTitle} max={21} />} />
              <Route exact path="/popular" render={() => <PopularTitles title="Popular Titles" initComplete={this.setTitle} />} />
              <Redirect to="/" />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}
