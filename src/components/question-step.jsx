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
    <div className="radio-button-option" key={i}>
      <input
          type="radio"
          name="question"
          value={o}
          checked={question.selected === o}
          onChange={onChange.bind(null, props, props.number)}
      />
      <label htmlFor={o}>{o}</label>
    </div>
  ));

  return (
    <section className="bb bb-muted mt-90 mb-90">
      <div className="status--small">
        <h1 className="mb-40">{props.store.get().url}</h1>
        <Loader loaded={false} options={LOADER_OPTIONS}/>
      </div>
      <div className="question">
        <header>
          <h4 className="mt-0 mb-30">{question.title}</h4>
        </header>
        <form className="form">
          <div>{options}</div>
          <button
              type="submit"
              className={classNames('mt-30', 'mb-40', {
                  'question__button': true,
                  'question__button--inactive': !getQuestion(props).selected
                })}
              onClick={onNext.bind(null, props)}
          >Next</button>
        </form>
      </div>
    </section>
  );
};

export default QuestionStep;
