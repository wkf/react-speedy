const makeStat = ([name, value], i) => (
  <li key={"stat" + i} className="stat">
    <div className="stat__name medium">{name}</div>
    <div className="stat__value mega">{value}</div>
  </li>
);

const calculateDownloadSpeedDelta = (store) => {
  const {ourResults, theirResults} = store.get();
  const ours = ourResults.downloadTime;
  const theirs = theirResults.downloadTime;

  if (theirs > ours) {
    return '+' + Math.round((theirs / ours) * 100) + '%';
  } else if (theirs < ours) {
    return '-' + Math.round((ours / theirs) * 100) + '%';
  } else {
    return '+0%';
  }
};

const estimateConversionDelta = (store) => {
  const {ourResults: o, theirResults: t} = store.get();
  // FIXME: caching headers currently untracked
  //  1% per 100ms faster, 3% for https, 0.5% for using http2, 1% for caching headers
  const percent = Math.round(
    (t.downloadTime - o.downloadTime) / 100 + (!t.usesHttps ? 3 : 0) + (!t.usesHttp2 ? 0.5 : 0));

  return percent < 0 ? (percent + '%') : ('+' + percent + '%');
};

const estimateSearchRankDelta = (store) => {
  const {ourResults: o, theirResults: t} = store.get();
  //  1% per 100ms faster, 2% for https, 1% for using http2
  const percent = Math.round(
    (t.downloadTime - o.downloadTime) / 100 + (!t.usesHttps ? 2 : 0) + (!t.usesHttp2 ? 1 : 0));

  return percent < 0 ? (percent + '%') : ('+' + percent + '%');
};

const StatsList = ({store}) => {
  const stats = [
    ['Download speed', calculateDownloadSpeedDelta(store)],
    ['Estimated conversion increase', estimateConversionDelta(store)],
    ['Estimated search rank increase', estimateSearchRankDelta(store)]
  ].map(makeStat);

  return (
    <section className="stats">
      <ul className="stats-list">{stats}</ul>
    </section>
  );
};

export default StatsList;
