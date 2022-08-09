import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Ranking extends Component {
  render() {
    const { history } = this.props;
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
          onClick={ () => history.push('/') }
        >
          Play Again
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default Ranking;
