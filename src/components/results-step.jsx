import Loader from 'react-loader';
import Tooltip from 'react-tooltip';
import classNames from 'classnames';

const no = <svg className="icon icon--error"><use xlinkHref="#icon-error"/></svg>;
const yes = <svg className="icon icon--check"><use xlinkHref="#icon-check"/></svg>;
const info = <svg className="icon icon--info"><use xlinkHref="#icon-info"/></svg>;

const arrow = <div className="rc-tooltip-arrow-inner"/>;

const makeRow = ([header, theirs, ours, infoText], i) => {
  const id = "row" + i;

  return (
    <tr key={id}>
      <th scope="row" className="th--row">
        <div className="target" data-tip data-for={id}>
          {header}
          {info}
          <Tooltip class="tooltip" id={id} place="right" type="dark" effect="solid" event="click">{infoText}</Tooltip>
        </div>
      </th>
      <td className="results-table__entry--theirs">{theirs}</td>
      <td className="results-table__entry--ours">{ours}</td>
    </tr>
  );
};

const ResultsTable = ({store}) => {
  const {url, ourResults, theirResults} = store.get();

  const rows = [
    [
      "Time to download HTML",
      theirResults.downloadTime,
      ourResults.downloadTime,
      "This is the time it takes to download the entire HTML page. The DOMContentLoaded event does not fire until this has completed, so JavaScript apps will typically not run until after this phase is complete."
    ],
    [
      "Server supports HTTPS",
      theirResults.usesHttps ? yes : no,
      ourResults.usesHttps ? yes : no,
      "This determines if your site supports HTTPS, which improves search rank, gives access to better analytics, protects content and users from man-in-the-middle attacks, and ensures access to technologies that don't allow insecure HTTP."
    ],
    [
      "DNS time",
      theirResults.dnsTime,
      ourResults.dnsTime,
      "Every time someone visits your site, their browser looks up your site’s IP address before it loads the page, and may happen multiple times. Slow DNS increases the time before your visitors see your content."
    ],
    [
      "Connection time",
      theirResults.connectionTime,
      ourResults.connectionTime,
      "Every visitor’s browser must connect to to your site’s IP address to receive content. The speed of the connection depends on the visitor’s network speed, your server’s response time, and the peering agreement between each network."
    ],
    [
      "Time to first byte",
      theirResults.timeToFirstByte,
      ourResults.timeToFirstByte,
      "This is an important meteric that measures the time it takes between when your visitor’s browser connects to your site and when it starts to receive HTML."
    ],
    [
      "HTTPS handshake time",
      theirResults.httpsTime,
      ourResults.httpsTime,
      "This is the time it takes a visitor’s browser and your website’s IP address to negotiate an encrypted HTTPS connection."
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
    ],
    [
      "Modern SSL",
      no,
      yes,
      "This determines if your SSL certificate is outdated or insecure."
    ]
  ].map(makeRow);

  return (
    <table className="table">
      <thead>
        <tr width="400">
          <th scope="col" width="200"></th>
          <th scope="col" width="100">Your site</th>
          <th scope="col" width="100">Switch to Netlify</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
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
    ["Estimated search rank increas", "+12%"]
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
      "Add SSL to improve your search rank and protects your content and users",
      "critical",
      "https://www.netlify.com/blog/2014/10/03/five-reasons-you-want-https-for-your-static-site"
    ],
    [
      "Switch to HTTP2 to improve your site’s performance.",
      "normal"
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
