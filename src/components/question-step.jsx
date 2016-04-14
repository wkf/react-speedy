import Loader from 'react-loader';

import {LOADER_OPTIONS} from '../constants';

const onSelect = ({store, nextStep, number}, e) => {
  store.update({questions: {[number]: {selected: {$set: e.target.value}}}});
  nextStep();
};

const getQuestion = ({store, number}) =>
  store.get().questions[number];

const QuestionStep = (props) => {
  const question = getQuestion(props);
  const options = question.options.map((o, i) => (
    <div className="radio-button" key={i}>
      <input
          type="radio"
          name="question"
          value={o}
          checked={question.selected === o}
          onChange={onSelect.bind(null, props)}
      />
      <label
          htmlFor={o}
          className="radio-button__label"
          onClick={onSelect.bind(null, props)}
      >{o}</label>
    </div>
  ));

  return (
    <section className="bb bb-muted mt-90 mb-90">
      <header className="loader">
        <h1 className="loader__title mb-40">{props.store.get().url}</h1>
        <Loader parentClassName="spinner" loaded={props.store.get().resultsLoaded} options={LOADER_OPTIONS}/>
      </header>
      <section className="question mb-60">
        <h4 className="mt-0 mb-30">{question.title}</h4>
        <form>{options}</form>
      </section>
    </section>
  );
};

export default QuestionStep;
