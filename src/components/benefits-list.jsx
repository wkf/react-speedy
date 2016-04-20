const makeBenefit = ([description, link], i) => {
  const a = link && <a className="benefit__link" href={link}>Learn more</a>;

  return (
    <li key={"benefit" + i} className="benefit medium">
      <span>{description}{a}</span>
    </li>
  );
};

const alwaysShow = () => true;
const usesRails = (answers) => answers[1] === 'Rails';
const usesWordpress = (answers) => answers[1] === 'Wordpress';

const BenefitsList = (answers) => {
  const benefits = [
    [
      "With Netlify, get HTTPS and HTTP2 for free with one click.",
      null,
      alwaysShow
    ],
    [
      "What makes Netlify so much faster and more secure?",
      "https://www.netlify.com/why-static",
      alwaysShow
    ],
    [
      "79% of all Wordpress sites are susceptible to known vulnerabilities.",
      null,
      usesWordpress
    ],
    [
      "Using rails? Your site has to build every page it shows a visitor, causing slow load times. By switching to static, you can dramatically increase your site's performance.",
      null,
      usesRails
    ]
  ].filter(([d, l, shouldShow]) => shouldShow(answers)).map(makeBenefit);

  if (benefits.length > 0) {
    return (
      <section className="benefits">
        <h4>Why you should switch</h4>
        <ul>{benefits}</ul>
      </section>
    );
  } else {
    return <section className="benefits--empty"></section>;
  }
};

export default BenefitsList;
