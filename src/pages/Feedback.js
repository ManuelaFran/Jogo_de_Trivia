import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { assertions } = this.props;
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
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(Feedback);
