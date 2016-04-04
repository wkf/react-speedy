import classNames from 'classnames';

const makeProblem = ([cause, severity, link], i) => {
  const a = link && <a className="problem__link" href={link}>Learn more</a>;
  return (
    <li
        key={"problem" + i}
        className={classNames('problem', 'problem--' + severity, 'medium')}
    >
      <span>{cause}{a}</span>
    </li>
  );
};

const ProblemsList = ({store}) => {
  const problems = [
    [
      "SSL protects your sensitive information. Use Netlify to add SSL with a single click.",
      "critical",
      "#",
      (store) => !store.get().theirResults.usesHttps
    ],
    [
      "Sites that use HTTP2 load faster. Netlify uses HTTP2 by default.",
      "normal",
      "#",
      (store) => !store.get().theirResults.usesHttp2
    ]
  ].filter(([c, s, l, shouldShow]) => shouldShow(store)).map(makeProblem);

  if (problems.length > 0) {
    return (
      <section className="problems">
        <h4>Things to improve</h4>
        <ul>{problems}</ul>
      </section>
    );
  } else {
    return <section className="problems--empty"></section>;
  }
};

export default ProblemsList;
