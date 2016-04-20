import {connect} from 'react-redux';
import Workflow from './workflow';
import UrlFormStep from '../components/url-form-step';
import QuestionStep from '../components/question-step';
import ResultsStep from '../components/results-step';
import {
  updateUrlish, runSpeedtest, answerQuestion
} from '../actions/speedtest';

const questions = [
  {
    number: 0,
    title: 'Is your site static?',
    options: ['Yes', 'No', 'Not Sure']
  },
  {
    number: 1,
    title: 'Is your site mode with any of these tools?',
    options: ['Wordpress', 'Drupal', 'Joomla', 'Xpress', 'Rails', 'Other', 'Not Sure']
  }
];

const Speedtest = (props) => (
  <Workflow>
    <UrlFormStep
        key="url-form"
        url={props.url}
        isValidUrl={props.isValidUrl}
        updateUrlish={props.updateUrlish}
        runSpeedtest={props.runSpeedtest}
    />
    <QuestionStep
        key="question-0"
        url={props.url}
        question={questions[0]}
        answer={props.answers[0]}
        resultsLoaded={props.resultsLoaded}
        answerQuestion={props.answerQuestion}
    />
    <QuestionStep
        key="question-1"
        url={props.url}
        question={questions[1]}
        answer={props.answers[1]}
        show={props.showQuestion1}
        resultsLoaded={props.resultsLoaded}
        answerQuestion={props.answerQuestion}
    />
    <ResultsStep
        key="displaying-results"
        url={props.url}
        apiError={props.apiError}
        resultsLoaded={props.resultsLoaded}
        ourResults={props.ourResults}
        theirResults={props.theirResults}
        answers={props.answers}
    />
  </Workflow>
);

const mapStateToProps = ({
  speedtest: {
    url, isValidUrl, resultsLoaded, apiError, ourResults, theirResults, answers
  }
}) => ({
  url,
  isValidUrl,
  resultsLoaded,
  apiError,
  ourResults,
  theirResults,
  answers,
  showQuestion1: (questions[0].selected !== 'Yes')
});

const mapDispatchToProps = dispatch => ({
  updateUrlish: (urlish) => dispatch(updateUrlish(urlish)),
  runSpeedtest: (urlish) => dispatch(runSpeedtest(urlish)),
  answerQuestion: (id, answer) => dispatch(answerQuestion(id, answer))
});

export default connect(mapStateToProps, mapDispatchToProps)(Speedtest);
