import React, { Component } from 'react';
import { vote } from '../api';

import '../styles/VotePanel.css';

export default class VotePanel extends Component {
  state = {
    voteChange: 0,
    isLoading: false
  };

  handleVoteClick = amount => {
    this.setState({ isLoading: true });
    vote(this.props.item, amount).then(() =>
      this.setState(prevState => ({
        voteChange: prevState.voteChange + amount,
        isLoading: false
      }))
    );
  };

  render() {
    return (
      <div className="vote-panel">
        <button
          className="vote-button"
          onClick={() => this.handleVoteClick(1)}
          disabled={
            !this.props.loggedInUser ||
            this.state.voteChange === 1 ||
            this.state.isLoading
          }
        >
          <i className="fas fa-caret-up" />
        </button>
        <p>{this.props.item.votes + this.state.voteChange}</p>
        <button
          className="vote-button"
          onClick={() => this.handleVoteClick(-1)}
          disabled={
            !this.props.loggedInUser ||
            this.state.voteChange === -1 ||
            this.state.isLoading
          }
        >
          <i className="fas fa-caret-down" />
        </button>
      </div>
    );
  }
}
