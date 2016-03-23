import Loader from 'react-loader';
import ResultsTable from './results-table';

const ResultsStep = (props) => (
  <div>
    <h2>{props.store.get().url}</h2>
    <h3>Results</h3>
    <ResultsTable store={props.store}/>
    <button type="button" onClick={props.prevStep}>prev</button>
    <button type="button" onClick={props.nextStep}>next</button>
  </div>
);

export default ResultsStep;
