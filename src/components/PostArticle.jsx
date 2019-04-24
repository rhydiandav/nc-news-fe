import React, { Component } from 'react';
import { postNewArticle } from '../api';
import { navigate } from '@reach/router';

export default class PostArticle extends Component {
  state = {
    topic: 'coding',
    title: '',
    body: ''
  };

  handleSubmit = e => {
    e.preventDefault();
    const { title, body, topic } = this.state;
    const article = {
      title,
      body,
      topic,
      author: this.props.loggedInUser
    };
    postNewArticle(article).then(article => {
      this.setState({
        topic: 'coding',
        title: '',
        body: ''
      });
      navigate(`/articles/${article.article_id}`);
    });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    console.log(this.props.loggedInUser);
    return (
      <div className="content-card">
        <form onSubmit={this.handleSubmit}>
          Topic:{' '}
          <select name="topic" onChange={this.handleChange}>
            <option value="coding">Coding</option>
            <option value="cooking">Cooking</option>
            <option value="football">Football</option>
          </select>
          Title: <input type="text" name="title" onChange={this.handleChange} />
          Body: <input type="text" name="body" onChange={this.handleChange} />
          <input type="submit" value="Post" />
        </form>
      </div>
    );
  }
}
