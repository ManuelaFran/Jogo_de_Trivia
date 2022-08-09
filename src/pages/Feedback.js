import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { player } = this.props;
    const menorTres = <p data-testid="feedback-text">Could be better...</p>;
    const maiorTres = <p data-testid="feedback-text">Well Done!</p>;
    const tres = 3;
    return (
      <div>
        <p>Feedback</p>
        <Header />
        {
          player.assertions >= tres ? maiorTres : menorTres
        }
        <p data-testid="feedback-total-score">{player.score}</p>
        <p data-testid="feedback-total-question">{player.assertions}</p>
      </div>
    );
  }
}

Feedback.propTypes = {
  player: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  player: state.player,
});

export default connect(mapStateToProps)(Feedback);
