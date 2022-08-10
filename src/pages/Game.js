import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { saveScoreAction } from '../redux/actions';

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
    const { history } = this.props;
    if (indexQuestion === +'4') {
      history.push('/feedback');
    }
    clearTimeout(this.timer);
    this.setState({ indexQuestion: indexQuestion + 1,
      colorBtn: false,
      timer: 30,
    });
  }

  handleScore = (difficulty) => {
    const { timer } = this.state;
    const { saveScoreAction: setScore } = this.props;
    this.setState({ colorBtn: true });
    const easy = (Number('10') + timer);
    const medium = (Number('10') + (timer * 2));
    const hard = Number('10') + (timer * Number('3'));
    switch (difficulty) {
    case 'easy':
      return setScore(easy);
    case 'medium':
      return setScore(medium);
    default:
      return setScore(hard);
    }
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
                            onClick={ () => {
                              clearTimeout(this.timer);
                              this.handleScore(quest.difficulty);
                            } }
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
                          onClick={ () => {
                            clearTimeout(this.timer);
                            this.setState({ colorBtn: true });
                          } }
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
                {
                  colorBtn === true || timer === 0 ? (
                    <button
                      data-testid="btn-next"
                      type="button"
                      onClick={ this.handleNextQuestion }
                    >
                      Next
                    </button>
                  ) : null
                }
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
  saveScoreAction: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  saveScoreAction: (state) => dispatch(saveScoreAction(state)),
});

export default connect(null, mapDispatchToProps)(Game);
