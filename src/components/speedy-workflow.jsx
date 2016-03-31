import Workflow from './workflow';
import UrlFormStep from './url-form-step';
import QuestionStep from './question-step';
import ResultsStep from './results-step';

const shouldShowQuestion1 = ({store}) =>
  store.get().questions[0].selected != 'Yes';

const SpeedyWorkflow = ({store}) => (
  <Workflow store={store}>
    <UrlFormStep key="url-form" store={store}/>
    <QuestionStep key="question-0" store={store} number={0}/>
    <QuestionStep key="question-1" store={store} number={1} shouldShow={shouldShowQuestion1}/>
    <ResultsStep key="displaying-results" store={store}/>
  </Workflow>
);

export default SpeedyWorkflow;
