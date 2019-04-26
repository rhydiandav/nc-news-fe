import React, { Component } from 'react';
import { navigate, Link } from '@reach/router';
import '../styles/Header.css';

export default class Header extends Component {
  state = { topics: [] };

  handleTopicChange = e => {
    this.props.setCurrentTopic(e.target.value);
    e.target.value === 'front-page'
      ? navigate('/')
      : navigate(`/topics/${e.target.value}`);
  };

  componentDidMount() {
    fetch('http://n-c-news.herokuapp.com/api/topics')
      .then(res => {
        return res.json();
      })
      .then(({ topics }) => {
        this.setState({ topics });
      });
  }

  render() {
    return (
      <div className="header">
        <Link to="/">
          <h1>
            <mark>&#60;</mark> NC News <mark>/&#62;</mark>
          </h1>
        </Link>

        <select
          name="article-select"
          className="article-select"
          onChange={this.handleTopicChange}
        >
          <option value="front-page">Front Page</option>
          {this.state.topics.map(({ slug }) => {
            return (
              <option key={slug} value={slug}>
                {`${slug[0].toUpperCase()}${slug.slice(1)}`}
              </option>
            );
          })}
        </select>

        {!this.props.loggedInUser && (
          <div>
            <button
              className="red-button"
              onClick={() => {
                navigate('/users/new');
              }}
            >
              Sign Up
            </button>
            <button
              className="black-button"
              onClick={() => {
                navigate('/login');
              }}
            >
              Log In
            </button>
          </div>
        )}
        {this.props.loggedInUser && (
          <div>
            <button
              className="black-button"
              onClick={() => {
                navigate(`/users/${this.props.loggedInUser}`);
              }}
            >
              <i className="fas fa-user" /> {this.props.loggedInUser}
            </button>
            <button
              className="black-button"
              onClick={() => {
                this.props.logOut();
              }}
            >
              Log Out
            </button>
          </div>
        )}
      </div>
    );
  }
}
