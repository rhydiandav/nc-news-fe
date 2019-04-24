import React, { Component } from 'react';
import { fetchTopic } from '../api';
import { Link } from '@reach/router';

export default class TopicCard extends Component {
  state = {
    topic: { slug: 'front-page', description: 'All topics...' }
  };

  componentDidMount() {
    if (this.props.slug === 'front-page') {
      this.setState({
        topic: { slug: 'front-page', description: 'All topics...' }
      });
    } else {
      fetchTopic(this.props.slug).then(({ topic }) => {
        this.setState({ topic });
      });
    }
  }

  componentDidUpdate(prevState) {
    if (prevState.slug !== this.props.slug) {
      if (this.props.slug === 'front-page') {
        this.setState({
          topic: { slug: 'front-page', description: 'All topics...' }
        });
      } else {
        fetchTopic(this.props.slug).then(({ topic }) => {
          this.setState({ topic });
        });
      }
    }
  }

  render() {
    return (
      <div className="topic-key content-card">
        <h3>{`${this.state.topic.slug[0].toUpperCase()}${this.state.topic.slug.slice(
          1
        )}`}</h3>
        <h4>{`${this.state.topic.description}`}</h4>
        <p>Total articles: {this.props.total_count}</p>
        <p>All articles...</p>
        <p>Sort by: </p>

        <Link to="/articles/new">
          {this.props.loggedInUser && <button>New Article</button>}
        </Link>
      </div>
    );
  }
}
