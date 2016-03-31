const onGo = ({nextStep}) =>
  nextStep();

const onChange = ({store}, e) =>
  store.update({url: {$set: e.target.value}});

const UrlFormStep = (props) => (
  <div>
    <h2>Test your current site and see how much faster it can be!</h2>
    <input type="text" value={props.store.get().url} onChange={onChange.bind(null, props)}/>
    <button type="button" onClick={onGo.bind(null, props)}>go</button>
  </div>
);

export default UrlFormStep;
