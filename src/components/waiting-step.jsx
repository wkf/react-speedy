import Loader from 'react-loader';

const WaitingStep = (props) => (
  <div>
    <h2>{props.store.get().url}</h2>
    <Loader loaded={false}/>
    <h2>waiting for results</h2>
    <button type="button" onClick={props.prevStep}>prev</button>
    <button type="button" onClick={props.nextStep}>next</button>
  </div>
);

export default WaitingStep;
