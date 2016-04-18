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

const makeRow = ([show, header, theirs, ours, infoText, format, compare, store], i) => {
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

  if (_x === _y) {
    return "tie";
  } else if (_x < _y) {
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

const alwaysShow = (store) => true;
const usesHttps = (store) =>  store.get().theirResults.usesHttps;

const ResultsTable = ({store}) => {
  const {url, ourResults, theirResults} = store.get();

  const results = [
    [
      alwaysShow,
      "Time to download HTML",
      theirResults.downloadTime,
      ourResults.downloadTime,
      "This is the time it takes to download the entire HTML page. The DOMContentLoaded event does not fire until this has completed, so JavaScript apps will typically not run until after this phase is complete.",
      formatMs,
      compareMs
    ],
    [
      alwaysShow,
      "Server supports HTTPS",
      theirResults.usesHttps ? yes : no,
      ourResults.usesHttps ? yes : no,
      "This determines if your site supports HTTPS, which improves search rank, gives access to better analytics, protects content and users from man-in-the-middle attacks, and ensures access to technologies that don't allow insecure HTTP.",
      formatNoop,
      compareBool
    ],
    [
      alwaysShow,
      "DNS time",
      theirResults.dnsTime,
      ourResults.dnsTime,
      "Every time someone visits your site, their browser looks up your site’s IP address before it loads the page, and may happen multiple times. Slow DNS increases the time before your visitors see your content.",
      formatMs,
      compareMs
    ],
    [
      alwaysShow,
      "Time to first byte",
      theirResults.timeToFirstByte,
      ourResults.timeToFirstByte,
      "This is an important meteric that measures the time it takes between when your visitor’s browser connects to your site and when it starts to receive HTML.",
      formatMs,
      compareMs
    ],
    [
      usesHttps,
      "HTTPS handshake time",
      theirResults.httpsTime,
      ourResults.httpsTime,
      "This is the time it takes a visitor’s browser and your website’s IP address to negotiate an encrypted HTTPS connection.",
      formatMs,
      compareMs
    ]
  ].filter(([shouldShow]) => shouldShow(store)).map(xs => xs.concat(store)).map(makeRow);

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
