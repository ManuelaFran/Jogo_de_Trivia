import PropTypes from 'prop-types';
import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  componentDidMount() {
    this.setInfoLocalStorage();
  }

  convertEmail = () => {
    const { gravatarEmail } = this.props;
    const email = md5(gravatarEmail).toString();
    return email;
  }

  setInfoLocalStorage = () => {
    const { name, score } = this.props;
    const emailConverted = this.convertEmail();
    const objRanking = {
      name,
      score,
      picture: emailConverted,
    };
    if (!JSON.parse(localStorage.getItem('ranking'))) {
      localStorage.setItem('ranking', JSON.stringify([]));
    }
    const readRanking = JSON.parse(localStorage.getItem('ranking'));
    const newRanking = [...readRanking, objRanking].sort((a, b) => b.score - a.score);
    localStorage.setItem('ranking', JSON.stringify(newRanking));
  }

  render() {
    const { assertions, score, history } = this.props;
    const menorTres = <p data-testid="feedback-text">Could be better...</p>;
    const maiorTres = <p data-testid="feedback-text">Well Done!</p>;
    const tres = 3;
    return (
      <div>
        <p>Feedback</p>
        <Header />
        {
          assertions >= tres ? maiorTres : menorTres
        }
        <p data-testid="feedback-total-score">{score}</p>
        <p data-testid="feedback-total-question">{assertions}</p>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => history.push('/') }
        >
          Play Again
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ () => history.push('/ranking') }
        >
          Ranking
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
});

export default connect(mapStateToProps)(Feedback);
