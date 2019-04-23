import React, { Component } from 'react';
import '../styles/Header.css';

export default class Header extends Component {
  state = { topics: [] };

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
        <h1>NC News</h1>

        <select name="article-select" className="article-select">
          <option value="front-page">Front Page</option>
          {this.state.topics.map(({ slug }) => {
            return (
              <option key={slug} value={slug}>
                {`${slug[0].toUpperCase()}${slug.slice(1)}`}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
}
