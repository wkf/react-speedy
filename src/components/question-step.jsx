import Loader from 'react-loader';
import Question from './question';

const QuestionStep = (props) => (
  <div>
    <h2>{props.store.get().url}</h2>
    <Loader loaded={false}/>
    <Question store={props.store} number={props.number}/>
    <button type="button" onClick={props.prevStep}>prev</button>
    <button type="button" onClick={props.nextStep}>next</button>
  </div>
);

export default QuestionStep;
