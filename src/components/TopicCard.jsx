import React, { Component } from 'react';
import { fetchTopic } from '../api';

export default class TopicCard extends Component {
  state = {
    topic: { slug: 'Front Page', description: 'All topics...' }
  };

  getTopicDetails = () => {
    if (this.props.slug === 'front-page') {
      this.setState({
        topic: { slug: 'Front Page', description: 'All topics...' }
      });
    } else {
      fetchTopic(this.props.slug).then(({ data: { topic } }) => {
        this.setState({ topic });
      });
    }
  };

  componentDidMount() {
    this.getTopicDetails();
  }

  componentDidUpdate(prevState) {
    if (prevState.slug !== this.props.slug) {
      this.getTopicDetails();
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
      </div>
    );
  }
}
