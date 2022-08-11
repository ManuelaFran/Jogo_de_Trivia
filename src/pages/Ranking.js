import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { clearScoreAction } from '../redux/actions';
import './Ranking.css';

class Ranking extends Component {
  render() {
    const { history, clearScoreAction: clearScore } = this.props;
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <div>
          {
            ranking.map((item, index) => (
              <div className="ranking" key={ index }>
                <img
                  className="img-ranking"
                  src={ item.gravatarEmail }
                  alt={ item.name }
                />
                <p
                  className="name-ranking"
                  data-testid={ `player-name-${index}` }
                >
                  { item.name }
                </p>
                <p
                  className="score-ranking"
                  data-testid={ `player-score-${index}` }
                >
                  { item.score }
                </p>
              </div>
            ))
          }
        </div>
        <button
          className="btn-go-home"
          type="button"
          data-testid="btn-go-home"
          onClick={ () => {
            clearScore();
            history.push('/');
          } }
        >
          Play Again
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  clearScoreAction: (state) => dispatch(clearScoreAction(state)),
});

Ranking.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  clearScoreAction: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Ranking);
