import React from 'react';
import {connect} from 'react-redux';
import UrlFormStep from '../components/url-form-step';
import QuestionStep from '../components/question-step';
import ResultsStep from '../components/results-step';
import {
  updateUrlish,
  runSpeedtest,
  answerQuestion,
  syncLocationToStore
} from '../actions/speedtest';
import {validateUrlish} from '../modules/urlish';

const questions = [
  {
    number: 0,
    title: 'Is your site static?',
    options: ['Yes', 'No', 'Not Sure'],
    show: (as) => !as[0]
  },
  {
    number: 1,
    title: 'Is your site mode with any of these tools?',
    options: ['Wordpress', 'Drupal', 'Joomla', 'Xpress', 'Rails', 'Other', 'Not Sure'],
    show: (as) => !as[1] && as[0] !== 'Yes'
  }
];

const makeQuestionStep = (props, question) => (
  <QuestionStep {...props}
    key={"question-" + question.number}
    question={question}
    answer={props.answers[question.number]}
    show={question.show(props.answers)}
  />
);

class Speedtest extends React.Component {
  componentDidMount() {
    const {location, runSpeedtest, syncLocationToStore} = this.props;

    syncLocationToStore(location);
    validateUrlish(location.query.u) && runSpeedtest(location.query.u);
  }

  componentWillUnmount() {
    // TODO: abort speedtest
  }

  render() {
    const steps = [
      <UrlFormStep {...this.props} key="url-form" show={!this.props.url}/>,
      makeQuestionStep(this.props, questions[0]),
      makeQuestionStep(this.props, questions[1]),
      <ResultsStep {...this.props} key="displaying-results"/>
    ];

    return steps.filter((c) => c.props.show !== false)[0];
  }
}

const mapStateToProps = ({speedtest}, {location}) =>
  Object.assign({}, speedtest, {location});

const mapDispatchToProps = dispatch => ({
  runSpeedtest: (url) => dispatch(runSpeedtest(url)),
  updateUrlish: (urlish) => dispatch(updateUrlish(urlish)),
  answerQuestion: (id, answer) => dispatch(answerQuestion(id, answer)),
  syncLocationToStore: (location) => dispatch(syncLocationToStore(location))
});

export default connect(mapStateToProps, mapDispatchToProps)(Speedtest);
