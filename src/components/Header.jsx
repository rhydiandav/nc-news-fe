import React, { Component } from 'react';
import { navigate, Link } from '@reach/router';
import '../styles/Header.css';
import { fetchTopics } from '../api';

export default class Header extends Component {
  state = { topics: [] };

  handleTopicChange = e => {
    this.props.setCurrentTopic(e.target.value);
    e.target.value === 'front-page'
      ? navigate('/')
      : navigate(`/topics/${e.target.value}`);
  };

  componentDidMount() {
    fetchTopics()
      .then(({ data: { topics } }) => {
        this.setState({ topics });
      })
      .catch(err => {
        navigate('/error', {
          replace: true,
          state: {
            msg: err.response.data.msg
          }
        });
      });
  }

  render() {
    return (
      <div className="header">
        <h1>
          <Link to="/">
            <mark>&#60;</mark> NC News <mark>/&#62;</mark>
          </Link>{' '}
        </h1>

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
        <div className="account-buttons">
          {!this.props.loggedInUser && (
            <>
              <Link to="/users/new">
                <button className="red-button">Sign Up</button>
              </Link>

              <Link to="/login">
                <button className="black-button">Log In</button>
              </Link>
            </>
          )}
          {this.props.loggedInUser && (
            <>
              <Link to={`/users/${this.props.loggedInUser}`}>
                <button className="black-button">
                  <i className="fas fa-user" /> {this.props.loggedInUser}
                </button>
              </Link>
              <button
                className="black-button"
                onClick={() => {
                  this.props.logOut();
                }}
              >
                Log Out
              </button>
            </>
          )}
        </div>
      </div>
    );
  }
}
