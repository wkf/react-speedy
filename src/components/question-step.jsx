import classNames from 'classnames';
import Loader from 'react-loader';

const LOADER_OPTIONS = {
  width: 2,
  length: 5,
  radius: 7
};

const onChange = ({store}, n, e) =>
  store.update({questions: {[n]: {selected: {$set: e.target.value}}}});

const onNext = ({nextStep}, e) => {
  e.preventDefault();
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
          onChange={onChange.bind(null, props, props.number)}
      />
      <label className="radio-button__label" htmlFor={o}>{o}</label>
    </div>
  ));

  return (
    <section className="bb bb-muted mt-90 mb-90">
      <header className="loader">
        <h1 className="loader__title mb-40">{props.store.get().url}</h1>
        <Loader parentClassName="loader__spinner" loaded={false} options={LOADER_OPTIONS}/>
      </header>
      <section className="question">
        <h4 className="mt-0 mb-30">{question.title}</h4>
        <form>
          <div>{options}</div>
          <button
              type="submit"
              className={classNames('mt-30', 'mb-40', {
                  'simple-button': true,
                  'simple-button--inactive': !getQuestion(props).selected
                })}
              onClick={onNext.bind(null, props)}
          >Next</button>
        </form>
      </section>
    </section>
  );
};

export default QuestionStep;
