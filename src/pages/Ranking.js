import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { clearScoreAction } from '../redux/actions';

class Ranking extends Component {
  render() {
    const { history, clearScoreAction: clearScore } = this.props;
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    return (
      <div>
        <p data-testid="ranking-title">Ranking</p>
        <div>
          {
            ranking.map((item, index) => (
              <div key={ index }>
                <img
                  src={ item.gravatarEmail }
                  alt={ item.name }
                />
                <p
                  data-testid={ `player-name-${index}` }
                >
                  { item.name }
                </p>
                <p
                  data-testid={ `player-score-${index}` }
                >
                  { item.score }
                </p>
              </div>
            ))
          }
        </div>
        <button
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
