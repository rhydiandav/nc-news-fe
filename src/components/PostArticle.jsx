import React, { Component } from 'react';
import { postNewArticle } from '../api';
import { navigate } from '@reach/router';
import SubHeader from './SubHeader';
import { fetchTopics } from '../api';

export default class PostArticle extends Component {
  state = {
    topic: 'coding',
    title: '',
    body: '',
    topics: []
  };

  handleSubmit = e => {
    e.preventDefault();
    const { title, body, topic } = this.state;
    const articleToPost = {
      title,
      body,
      topic,
      author: this.props.loggedInUser
    };
    postNewArticle(articleToPost)
      .then(article => {
        this.setState({
          topic: 'coding',
          title: '',
          body: ''
        });
        navigate(`/articles/${article.article_id}`);
      })
      .catch(err => {
        navigate('/error', {
          replace: true,
          state: {
            msg: err.response.data.msg
          }
        });
      });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
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
      <>
        <SubHeader topic="New Article" />
        <div className="content-card">
          <form onSubmit={this.handleSubmit}>
            Topic:{' '}
            <select name="topic" onChange={this.handleChange}>
              {this.state.topics.map(({ slug }) => {
                return (
                  <option value={slug} key={slug}>
                    {slug[0].toUpperCase() + slug.slice(1)}
                  </option>
                );
              })}
            </select>
            Title:{' '}
            <input
              type="text"
              name="title"
              onChange={this.handleChange}
              required={true}
            />
            Body:{' '}
            <input
              type="text"
              name="body"
              onChange={this.handleChange}
              required={true}
            />
            <input type="submit" value="Post" />
          </form>
        </div>
      </>
    );
  }
}
