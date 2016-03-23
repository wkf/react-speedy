import Workflow from './workflow';
import UrlFormStep from './url-form-step';
import QuestionStep from './question-step';
import WaitingStep from './waiting-step';
import ResultsStep from './results-step';

const SpeedyWorkflow = ({store}) => (
  <Workflow store={store}>
    <UrlFormStep key="url-form" store={store}/>
    <QuestionStep key="question-0" store={store} number={0}/>
    <QuestionStep key="question-1" store={store} number={1}/>
    <WaitingStep key="awaiting-results" store={store}/>
    <ResultsStep key="displaying-results" store={store}/>
  </Workflow>
);

export default SpeedyWorkflow;
