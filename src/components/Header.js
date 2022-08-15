import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Header.css';

class Header extends Component {
  convertEmail = () => {
    const { gravatarEmail } = this.props;
    const email = md5(gravatarEmail).toString();
    return email;
  }

  render() {
    const { name, score } = this.props;
    return (
      <div className="header-container">
        <img className="header-img" src={ `https://www.gravatar.com/avatar/${this.convertEmail()}` } alt="Imagem do jogador" data-testid="header-profile-picture" />
        <p className="header-name" data-testid="header-player-name">
          Name:
          {' '}
          {name}
        </p>
        <p className="header-score" data-testid="header-score">
          Score:
          {score}
        </p>
      </div>
    );
  }
}

Header.propTypes = {
  gravatarEmail: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};
const mapStateToProps = (state) => ({
  gravatarEmail: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
});

export default connect(mapStateToProps, null)(Header);
