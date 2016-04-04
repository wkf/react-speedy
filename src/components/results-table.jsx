import Popover from 'react-popover';
import Tappable from 'react-tappable';

const no = <svg className="icon icon--error"><use xlinkHref="#icon-error"/></svg>;
const yes = <svg className="icon icon--check"><use xlinkHref="#icon-check"/></svg>;
const info = <svg className="icon icon--info"><use xlinkHref="#icon-info"/></svg>;

const isVisiblePopover = (id, {store}) =>
  store.get().visiblePopoverId === id;

const togglePopover = (id, {store}) =>
  store.update({visiblePopoverId: {$set: isVisiblePopover(id, {store}) ? null : id}});

const makeRow = ([header, theirs, ours, infoText, store], i) => {
  const id = "row" + i;

  return (
    <tr key={id}>
      <th className="results-table__row-header" scope="row">
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
      <td className="results-table__entry results-table__entry--theirs">{theirs}</td>
      <td className="results-table__entry results-table__entry--ours">{ours}</td>
    </tr>
  );
};

const ResultsTable = ({store}) => {
  const {url, ourResults, theirResults} = store.get();

  const results = [
    [
      "HTML download time",
      theirResults.downloadTime + 'ms',
      ourResults.downloadTime + 'ms',
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
      theirResults.dnsTime + 'ms',
      ourResults.dnsTime + 'ms',
      "Every new visitor to your site will need to do a DNS lookup before their browser can even start connecting to your site. Some setups requires multiple DNS lookups before the browser can get the final IP address to connect to, so if your DNS is slow, new visitors to your site will have to wait for the DNS lookups to complete."
    ],
    [
      "Connection time",
      theirResults.connectionTime + 'ms',
      ourResults.connectionTime + 'ms',
      "This is the time it takes for your browser to establish a connection to the IP address returned after the DNS lookup. It will typically depend on the quality of the network connection and the peering agreements between the end user and the server responding to the browser's request."
    ],
    [
      "Time to first byte",
      theirResults.timeToFirstByte + 'ms',
      ourResults.timeToFirstByte + 'ms',
      "This is a very important metric for performance. It's the time it takes from the browser starts connecting to the IP address returned by the DNS lookup, and until it starts receiving HTML. This is the point where the browser has the chance to start parsing and rendering things on the screen."
    ],
    [
      "HTTPS handshake time",
      theirResults.httpsTime + 'ms',
      ourResults.httpsTime + 'ms',
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
    <section className="results">
      <table className="results-table">
        <thead>
          <tr width="400">
            <th className="results-table__col-header" scope="col" width="200"></th>
            <th className="results-table__col-header" scope="col" width="100">Your site</th>
            <th className="results-table__col-header" scope="col" width="100">Switch to Netlify</th>
          </tr>
        </thead>
        <tbody>{results}</tbody>
      </table>
    </section>
  );
};

export default ResultsTable;
