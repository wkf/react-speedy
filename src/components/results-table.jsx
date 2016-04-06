import Popover from 'react-popover';
import Tappable from 'react-tappable';

const no = <svg className="icon icon--error"><use xlinkHref="#icon-error"/></svg>;
const yes = <svg className="icon icon--check"><use xlinkHref="#icon-check"/></svg>;
const info = <svg className="icon icon--info"><use xlinkHref="#icon-info"/></svg>;

const isVisiblePopover = (id, {store}) =>
  store.get().visiblePopoverId === id;

const togglePopover = (id, {store}) =>
  store.update({visiblePopoverId: {$set: isVisiblePopover(id, {store}) ? null : id}});

const makeEntries = ([theirs, ours, format, compare]) => {
  const [_theirs, _ours] = [format(theirs), format(ours)];

  switch (compare(theirs, ours)) {
    case "better":
      return [
        <td className="results-table__entry results-table__entry--better">{_theirs}</td>,
        <td className="results-table__entry results-table__entry--worse">{_ours}</td>
      ];
    case "worse":
      return [
        <td className="results-table__entry results-table__entry--worse">{_theirs}</td>,
        <td className="results-table__entry results-table__entry--better">{_ours}</td>
      ];
    default:
      return [
        <td className="results-table__entry results-table__entry--tie">{_theirs}</td>,
        <td className="results-table__entry results-table__entry--tie">{_ours}</td>
      ];
  }
};

const makeRow = ([header, theirs, ours, infoText, format, compare, store], i) => {
  const id = "row" + i;
  const [theirEntry, ourEntry] = makeEntries([theirs, ours, format, compare]);

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
      {theirEntry}
      {ourEntry}
    </tr>
  );
};

const formatMs = (x) => {
  if (x <= 0) {
    return '0ms';
  } else if (x < 1) {
    return '<1ms';
  } else {
    return Math.round(x) + 'ms';
  }
};

const compareMs = (x, y) => {
  const _x = Math.round(x);
  const _y = Math.round(y);

  if (x === y) {
    return "tie";
  } else if (x < y) {
    return "better";
  } else {
    return "worse";
  }
};

const formatNoop = (x) => x;

const compareBool = (x, y) => {
  if (x === y) {
    return "tie";
  } else if (x) {
    return "better";
  } else {
    return "worse";
  }
};

const ResultsTable = ({store}) => {
  const {url, ourResults, theirResults} = store.get();

  const results = [
    [
      "HTML download time",
      theirResults.downloadTime,
      ourResults.downloadTime,
      "The time it takes before the whole HTML page has been downloaded by the browser. Scripts included at the end of the page won't start loading at all before this point. The DOMContentLoaded event on the page won't fire before this step has been completed. Typically any JavaScript you run on the page, won't start doing things before this phase is complete.",
      formatMs,
      compareMs
    ],
    [
      "HTTPS?",
      theirResults.usesHttps ? yes : no,
      ourResults.usesHttps ? yes : no,
      "Hyper Text Transfer Protocol Secure (HTTPS) is the secure version of HTTP, the protocol over which data is sent between your browser and the website that you are connected to. It means all communications between your browser and the website are encrypted.",
      formatNoop,
      compareBool
    ],
    [
      "DNS time",
      theirResults.dnsTime,
      ourResults.dnsTime,
      "Every new visitor to your site will need to do a DNS lookup before their browser can even start connecting to your site. Some setups requires multiple DNS lookups before the browser can get the final IP address to connect to, so if your DNS is slow, new visitors to your site will have to wait for the DNS lookups to complete.",
      formatMs,
      compareMs
    ],
    [
      "Time to first byte",
      theirResults.timeToFirstByte,
      ourResults.timeToFirstByte,
      "This is a very important metric for performance. It's the time it takes from the browser starts connecting to the IP address returned by the DNS lookup, and until it starts receiving HTML. This is the point where the browser has the chance to start parsing and rendering things on the screen.",
      formatMs,
      compareMs
    ],
    [
      "HTTPS handshake time",
      theirResults.httpsTime,
      ourResults.httpsTime,
      "If HTTPS is enabled, this is the time it takes to negotiate the encrypted connection between the browser and the server at the IP address returned from the DNS lookup.",
      formatMs,
      compareMs
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
