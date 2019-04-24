import React from 'react';
import { Router } from '@reach/router';
import './App.css';
import Header from './components/Header';
import SubHeader from './components/SubHeader';
import Article from './components/Article';
import Articles from './components/Articles';
import Footer from './components/Footer';
import Login from './components/Login';

class App extends React.Component {
  state = {
    currentTopic: 'front-page',
    loggedInUser: ''
  };

  setCurrentTopic = currentTopic => {
    this.setState({ currentTopic });
  };

  logIn = username => {
    this.setState({ loggedInUser: username });
  };

  logOut = () => {
    this.setState({ loggedInUser: '' });
  };

  render() {
    return (
      <div className="App">
        <Header
          setCurrentTopic={this.setCurrentTopic}
          logOut={this.logOut}
          loggedInUser={this.state.loggedInUser}
        />
        <SubHeader topic={this.state.currentTopic} />
        <Router className="router">
          <Articles path="/" />
          <Articles path="/topics/:slug" />
          <Article path="/articles/:id" />
          <Login path="/login" logIn={this.logIn} />
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
