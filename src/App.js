import React from 'react';
import { Router } from '@reach/router';
import './App.css';
import Header from './components/Header';
import Article from './components/Article';
import Articles from './components/Articles';
import Footer from './components/Footer';
import Login from './components/Login';
import Users from './components/Users';
import User from './components/User';
import PostArticle from './components/PostArticle';
import NewUser from './components/NewUser';
import Error from './components/Error';

class App extends React.Component {
  state = {
    currentTopic: 'front-page',
    loggedInUser: localStorage.loggedInUser || ''
  };

  setCurrentTopic = currentTopic => {
    this.setState({ currentTopic });
  };

  logIn = username => {
    this.setState({ loggedInUser: username });
    localStorage.setItem('loggedInUser', username);
  };

  logOut = () => {
    this.setState({ loggedInUser: '' });
    localStorage.removeItem('loggedInUser');
  };

  render() {
    return (
      <div className="App">
        <div className="content-wrap">
          <Header
            setCurrentTopic={this.setCurrentTopic}
            logOut={this.logOut}
            loggedInUser={this.state.loggedInUser}
          />
          <Router className="router">
            <Articles path="/" loggedInUser={this.state.loggedInUser} />
            <Articles
              path="/topics/:slug"
              loggedInUser={this.state.loggedInUser}
            />
            <PostArticle
              path="/articles/new"
              loggedInUser={this.state.loggedInUser}
            />
            <Article
              path="/articles/:id"
              loggedInUser={this.state.loggedInUser}
            />
            <Login path="/login" logIn={this.logIn} />
            <Users path="/users" />
            <User
              path="/users/:username"
              loggedInUser={this.state.loggedInUser}
            />
            <NewUser path="/users/new" logIn={this.logIn} />
            <Error path="/error" default />
          </Router>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
