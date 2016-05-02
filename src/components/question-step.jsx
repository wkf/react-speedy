import Loader from './loader';

const onSelect = ({question, answerQuestion}, e) => {
  answerQuestion(question.number, e.target.value);
};

const QuestionStep = (props) => {
  const options = props.question.options.map((o, i) => (
    <div className="radio-button" key={i}>
      <input
          type="radio"
          name="question"
          value={o}
          checked={props.answer === o}
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
        <h1 className="loader__title mb-40">{props.url}</h1>
        <Loader loaded={props.resultsLoaded}/>
      </header>
      <section className="question mb-60">
        <h4 className="mt-0 mb-30">{props.question.title}</h4>
        <form>{options}</form>
      </section>
    </section>
  );
};

export default QuestionStep;
