import Loader from 'react-loader';
import Popover from 'react-popover';
import Tappable from 'react-tappable';
import classNames from 'classnames';

const no = <svg className="icon icon--error"><use xlinkHref="#icon-error"/></svg>;
const yes = <svg className="icon icon--check"><use xlinkHref="#icon-check"/></svg>;
const info = <svg className="icon icon--info"><use xlinkHref="#icon-info"/></svg>;

const arrow = <div className="rc-tooltip-arrow-inner"/>;

const isVisiblePopover = (id, {store}) =>
  store.get().visiblePopoverId === id;

const togglePopover = (id, {store}) =>
  store.update({visiblePopoverId: {$set: isVisiblePopover(id, {store}) ? null : id}});

const makeRow = ([header, theirs, ours, infoText, store], i) => {
  const id = "row" + i;

  return (
    <tr key={id}>
      <th scope="row" className="th--row">
        <Popover
            place="right"
            body={infoText}
            isOpen={isVisiblePopover(id, {store})}
            onOuterAction={togglePopover.bind(null, id, {store})}
        >
          <Tappable className="toggle" onTap={togglePopover.bind(null, id, {store})}>
            {header}{info}
          </Tappable>
        </Popover>
      </th>
      <td className="results-table__entry--theirs">{theirs}</td>
      <td className="results-table__entry--ours">{ours}</td>
    </tr>
  );
};

const ResultsTable = ({store}) => {
  const {url, ourResults, theirResults} = store.get();

  const results = [
    [
      "HTML download time",
      theirResults.downloadTime,
      ourResults.downloadTime,
      "Netlify is better, here's why..."
    ],
    [
      "HTTPS?",
      theirResults.usesHttps ? yes : no,
      ourResults.usesHttps ? yes : no,
      "HTTPS is important for a number of reasons - see why HTTPS for static sites article."
    ],
    [
      "DNS time",
      theirResults.dnsTime,
      ourResults.dnsTime,
      "Every new visitor to your site will need to do a DNS lookup before their browser can even start connecting to your site. Some setups requires multiple DNS lookups before the browser can get the final IP address to connect to, so if your DNS is slow, new visitors to your site will have to wait for the DNS lookups to complete."
    ],
    [
      "Connection time",
      theirResults.connectionTime,
      ourResults.connectionTime,
      "This is the time it takes for your browser to establish a connection to the IP address returned after the DNS lookup. It will typically depend on the quality of the network connection and the peering agreements between the end user and the server responding to the browser's request."
    ],
    [
      "Time to first byte",
      theirResults.timeToFirstByte,
      ourResults.timeToFirstByte,
      "This is a very important metric for performance. It's the time it takes from the browser starts connecting to the IP address returned by the DNS lookup, and until it starts receiving HTML. This is the point where the browser has the chance to start parsing and rendering things on the screen."
    ],
    [
      "HTTPS handshake time",
      theirResults.httpsTime,
      ourResults.httpsTime,
      "If HTTPS is enabled, this is the time it takes to negotiate the encrypted connection between the browser and the server at the IP address returned from the...?"
    ],
    [
      "Secure cipher?",
      theirResults.usesSecureCipher ? yes : no,
      ourResults.usesSecureCipher ? yes : no,
      "We won't show the raw data for this. But in some cases the server will be configured to use an old encryption mechanism that's no longer secure when using HTTPS. If we spot this, we can link people to the full SSL test at SSLLabs where they'll be told that their SSL setup is bad and insecure."
    ],
    [
      "Secure algorithm?",
      theirResults.usesSecureAlgorithm ? yes : no,
      ourResults.usesSecureAlgorithm ? yes : no,
      "From the start of 2015, Chrome and Firebox both started to mark all sites using an SSL certificate based on the older SHA1 standard as insecure. So if you have HTTPS enabled but one of these older certificates, you won't get the advantage of a pretty green lock in the browser. In this case we should also link to SSLLabs so they can get scary warnings."
    ]
  ].map(xs => xs.concat(store)).map(makeRow);

  return (
    <section>
      <table className="table">
        <thead>
          <tr width="400">
            <th scope="col" width="200"></th>
            <th scope="col" width="100">Your site</th>
            <th scope="col" width="100">Switch to Netlify</th>
          </tr>
        </thead>
        <tbody>{results}</tbody>
      </table>
    </section>
  );
};

const makeStat = ([name, value], i) => (
  <li key={"stat" + i} className="stat">
    <div className="stat__name medium">{name}</div>
    <div className="stat__value mega">{value}</div>
  </li>
);

const StatsList = ({store}) => {
  const stats = [
    ["Download speed", "+1000%"],
    ["Estimated conversion increase", "+13.5%"],
    ["Estimated search rank increase", "+12%"]
  ].map(makeStat);

  return <ul className="stats">{stats}</ul>;
};

const makeProblem = ([cause, severity, link = null], i) => {
  const a = link && <a href={link}>Learn more</a>;

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
      "#"
    ],
    [
      "Sites that use HTTP2 load faster. Netlify uses HTTP2 by default.",
      "normal",
      "#"
    ]
  ].map(makeProblem);

  return (
    <section className="problems">
      <h4>Things to improve</h4>
      <ul>{problems}</ul>
    </section>
  );
};

const makeBenefit = ([description, link = null], i) => {
  const a = link && <a href={link}>Learn more</a>;

  return (
    <li key={"benefit" + i} className="benefit medium">
      <span>{description}{a}</span>
    </li>
  );
};

const BenefitsList = ({store}) => {
  const benefits = [
    ["With Netlify, get HTTPS for free with one click."],
    ["What makes Netlify so much faster and more secure?", "#"],
    ["Using rails? Your site has to build every page it shows a visitor, causing slow load times. By switching to static, you can dramatically increase your site's performance.", "#"]
  ].map(makeBenefit);

  return (
    <section className="benefits">
      <h4>Why you should switch</h4>
      <ul>{benefits}</ul>
    </section>
  );
};

const ResultsStep = ({store}) => {
  const {url} = store.get();

  return (
    <div className="results">
      <Loader loaded={true}>
        <header>
          <h3 className="muted">
            See how <a className="url" href={url}>{url}</a> would improve by switching to Netlify.
          </h3>
        </header>
        <StatsList store={store}/>
        <ResultsTable store={store}/>
        <ProblemsList store={store}/>
        <BenefitsList store={store}/>
        <section className="switch">
          <a className="button--switch" href="#">See how easy it is to switch</a>
        </section>
      </Loader>
    </div>
  );
};

export default ResultsStep;
