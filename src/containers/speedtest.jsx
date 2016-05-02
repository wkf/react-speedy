import React from 'react';
import {connect} from 'react-redux';
import UrlFormStep from '../components/url-form-step';
import QuestionStep from '../components/question-step';
import ResultsStep from '../components/results-step';
import {
  updateUrlish,
  runSpeedtest,
  answerQuestion,
  syncRouteToStore
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
    const {route, runSpeedtest, syncRouteToStore} = this.props;

    syncRouteToStore(route);
    validateUrlish(route.location.query.u)
      && runSpeedtest(route.location.query.u, route.params.id);
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

const mapStateToProps = ({speedtest}, route) =>
  Object.assign({}, speedtest, {route});

const mapDispatchToProps = dispatch => ({
  runSpeedtest: (url, id) => dispatch(runSpeedtest(url, id)),
  updateUrlish: (urlish) => dispatch(updateUrlish(urlish)),
  answerQuestion: (id, answer) => dispatch(answerQuestion(id, answer)),
  syncRouteToStore: (location) => dispatch(syncRouteToStore(location))
});

export default connect(mapStateToProps, mapDispatchToProps)(Speedtest);
