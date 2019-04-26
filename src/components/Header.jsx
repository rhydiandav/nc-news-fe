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

        {!this.props.loggedInUser && (
          <div className="account-buttons">
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
          <div className="account-buttons">
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
