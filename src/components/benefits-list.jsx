const makeBenefit = ([description, link], i) => {
  const a = link && <a className="benefit__link" href={link}>Learn more</a>;

  return (
    <li key={"benefit" + i} className="benefit medium">
      <span>{description}{a}</span>
    </li>
  );
};

const alwaysShow = (store) => true;
const usesRails = (store) => store.get().questions[1].selected === 'Rails';
const usesWordpress = (store) => store.get().questions[1].selected === 'Wordpress';

const BenefitsList = ({store}) => {
  const benefits = [
    [
      "With Netlify, get HTTPS for free with one click.",
      null,
      alwaysShow
    ],
    [
      "What makes Netlify so much faster and more secure?",
      "#",
      alwaysShow
    ],
    [
      "79% of all Wordpress sites are susceptible to known vulnerabilities.",
      "#",
      usesWordpress
    ],
    [
      "Using rails? Your site has to build every page it shows a visitor, causing slow load times. By switching to static, you can dramatically increase your site's performance.",
      "#",
      usesRails
    ]
  ].filter(([d, l, shouldShow]) => shouldShow(store)).map(makeBenefit);

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
