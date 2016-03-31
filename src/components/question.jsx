const onChange = ({store}, n, e) =>
  store.update({questions: {[n]: {selected: {$set: e.target.value}}}});

const Question = (props) => {
  const number = props.number;
  const question = props.store.get().questions[number];
  const options = question.options.map((o, i) => {
    return (
      <span key={i}>
        <input
            type="radio"
            name="question"
            value={o}
            checked={question.selected === o}
            onChange={onChange.bind(null, props, number)}
        />
        <label htmlFor={o}>{o}</label>
      </span>
    );
  });

  return (
    <div>
      <h4>{question.title}</h4>
      <form>{options}</form>
    </div>
  );
};

export default Question;
