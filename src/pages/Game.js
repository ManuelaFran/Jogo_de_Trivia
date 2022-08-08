import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Game extends Component {
  constructor() {
    super();
    this.timer = null;
    this.state = {
      questions: [],
      indexQuestion: 0,
      colorBtn: false,
      timer: 30,
      allAnswers: [],
    };
  }

  componentDidMount() {
    this.fetchQuestions();
  }

  componentDidUpdate() {
    this.handleTimer();
  }

  fetchQuestions = async () => {
    const token = localStorage.getItem('token');
    const URL = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const response = await fetch(URL);
    const result = await response.json();
    if (result.response_code !== 0) {
      const { history } = this.props;
      localStorage.removeItem('token');
      history.push('/');
    }
    const allAnswers = result.results
      .map((element) => [element.correct_answer, ...element.incorrect_answers]
        .sort(() => Math.random() - Number('0.5')));
    this.setState({
      questions: result.results,
      allAnswers,
    });
  }

  handleTimer = () => {
    const { timer } = this.state;
    if (timer > 0) {
      this.timer = setTimeout(() => {
        this.setState({
          timer: timer - 1,
        });
      }, '1000');
    }
  }

  handleNextQuestion = () => {
    const { indexQuestion } = this.state;
    clearTimeout(this.timer);
    this.setState({ indexQuestion: indexQuestion + 1,
      colorBtn: false,
      timer: 30,
    });
  }

  render() {
    const { questions, indexQuestion, colorBtn, timer, allAnswers } = this.state;
    return (
      <div>
        <Header />
        <p>
          {timer}
        </p>
        <section>
          {
            questions.map((quest, index) => (
              <div key={ index }>
                <p data-testid="question-category">{quest.category}</p>
                <p data-testid="question-text">{quest.question}</p>
                <div data-testid="answer-options">
                  {
                    allAnswers[indexQuestion].map((answer, indexAnswer) => {
                      if (answer === quest.correct_answer) {
                        return (
                          <button
                            disabled={ timer <= 0 }
                            onClick={ () => this.setState({ colorBtn: true }) }
                            className={ colorBtn ? 'rightAnswer' : null }
                            data-testid="correct-answer"
                            type="button"
                            key={ indexAnswer }
                          >
                            {answer}
                          </button>
                        );
                      }
                      return (
                        <button
                          disabled={ timer <= 0 }
                          onClick={ () => this.setState({ colorBtn: true }) }
                          className={ colorBtn ? 'wrongAnswer' : null }
                          data-testid={ `wrong-answer-${indexAnswer}` }
                          type="button"
                          key={ indexAnswer }
                        >
                          {answer}
                        </button>
                      );
                    })
                  }
                </div>
                <button
                  type="button"
                  onClick={ this.handleNextQuestion }
                >
                  Next
                </button>
              </div>
            ))[indexQuestion]
          }
        </section>
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default Game;
