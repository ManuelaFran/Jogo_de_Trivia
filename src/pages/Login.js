import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getRequestToken from '../service/apiToken';
import { saveEmailAction, saveNameAction } from '../redux/actions';

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
    const { email, name } = this.state;
    const { history, saveEmailAction: sendEmail, saveNameAction: sendName } = this.props;
    sendEmail(email);
    sendName(name);
    history.push('/game');
  }

  render() {
    const { name, email } = this.state;
    const { history } = this.props;
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
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ () => history.push('/settings') }
          >
            Settings
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  saveEmailAction: PropTypes.func.isRequired,
  saveNameAction: PropTypes.func.isRequired,
};
const mapDispatchToProps = (dispatch) => ({
  saveEmailAction: (state) => dispatch(saveEmailAction(state)),
  saveNameAction: (state) => dispatch(saveNameAction(state)),
});

export default connect(null, mapDispatchToProps)(Login);
