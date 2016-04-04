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
    return '+' + ((theirs / ours) * 100) + '%';
  } else if (theirs < ours) {
    return '-' + ((ours / theirs) * 100) + '%';
  } else {
    return '+0%';
  }
};

const estimateConversionDelta = (store) => {
  // FIXME: actually estimate delta
  return '+13.5%';
};

const estimateSearchRankDelta = (store) => {
  // FIXME: actually estimate delta
  return '+12%';
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
