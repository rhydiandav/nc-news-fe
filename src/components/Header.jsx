import React, { Component } from 'react';
import { navigate, Link } from '@reach/router';
import '../styles/Header.css';

export default class Header extends Component {
  state = { topics: [] };

  handleClick = e => {
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
        {!this.props.loggedInUser && (
          <button
            onClick={() => {
              navigate('/login');
            }}
          >
            Log In
          </button>
        )}
        {this.props.loggedInUser && (
          <button
            onClick={() => {
              this.props.logOut();
            }}
          >
            Log Out
          </button>
        )}
        <select name="article-select" className="article-select">
          <option value="front-page" onClick={this.handleClick}>
            Front Page
          </option>
          {this.state.topics.map(({ slug }) => {
            return (
              <option key={slug} value={slug} onClick={this.handleClick}>
                {`${slug[0].toUpperCase()}${slug.slice(1)}`}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
}
