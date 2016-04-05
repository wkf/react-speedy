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
      "HTTPS protects your sensitive information. Use Netlify to add HTTPS with a single click.",
      "critical",
      "https://www.netlify.com/blog/2014/10/03/five-reasons-you-want-https-for-your-static-site",
      (store) => !store.get().theirResults.usesHttps
    ],
    [
      "Sites that use HTTP2 load faster. Netlify uses HTTP2 by default.",
      "normal",
      null,
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
