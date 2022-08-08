import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  convertEmail = () => {
    const { gravatarEmail } = this.props;
    const email = md5(gravatarEmail).toString();
    return email;
  }

  render() {
    const { name, score } = this.props;
    return (
      <div>
        <img src={ `https://www.gravatar.com/avatar/${this.convertEmail()}` } alt="Imagem do jogador" data-testid="header-profile-picture" />
        <p data-testid="header-player-name">
          Nome:
          {' '}
          {name}
        </p>
        <p data-testid="header-score">
          Score:
          {' '}
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
