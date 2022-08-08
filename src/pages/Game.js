import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      indexQuestion: 0,
    };
  }

  componentDidMount() {
    this.fetchQuestions();
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
    this.setState({
      questions: result.results,
    });
  }

  render() {
    const { questions, indexQuestion } = this.state;
    return (
      <div>
        <Header />
        <section>
          {
            questions.map((quest, index) => {
              const allAnswers = [quest.correct_answer, ...quest.incorrect_answers];
              return (
                <div key={ index }>
                  <p data-testid="question-category">{quest.category}</p>
                  <p data-testid="question-text">{quest.question}</p>
                  <div data-testid="answer-options">
                    {
                      allAnswers.sort(() => Math.random() - Number('0.5'))
                        .map((answer, indexAnswer) => {
                          if (answer === quest.correct_answer) {
                            return (
                              <button
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
                    onClick={ () => this.setState({ indexQuestion: indexQuestion + 1 }) }
                  >
                    Next
                  </button>
                </div>
              );
            })[indexQuestion]
          }
        </section>
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default connect()(Game);
