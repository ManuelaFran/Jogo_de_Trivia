import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getRequestToken from '../service/apiToken';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleBtnValidation = () => {
    const { name, email } = this.state;
    if (name && email) {
      return true;
    }
    return false;
  }

  handleBtn = async () => {
    const token = await getRequestToken();
    localStorage.setItem('token', token);
    const { history } = this.props;
    history.push('/game');
  }

  render() {
    const { name, email } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="inputName">
            Name
            <input
              onChange={ this.handleChange }
              value={ name }
              name="name"
              data-testid="input-player-name"
              type="text"
              id="inputName"
            />
          </label>
          <label htmlFor="inputEmail">
            Email
            <input
              value={ email }
              onChange={ this.handleChange }
              name="email"
              data-testid="input-gravatar-email"
              type="text"
              id="inputEmail"
            />
          </label>
          <button
            disabled={ !this.handleBtnValidation() }
            type="button"
            data-testid="btn-play"
            onClick={ this.handleBtn }
          >
            Play
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default Login;
