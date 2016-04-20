import {
  calculateDownloadSpeedDelta, estimateConversionDelta, estimateSearchRankDelta
} from '../modules/stats';

const makeStat = ([name, value], i) => (
  <li key={"stat" + i} className="stat">
    <div className="stat__name medium">{name}</div>
    <div className="stat__value mega">{value}</div>
  </li>
);

const StatsList = ({ourResults, theirResults}) => {
  const stats = [
    ['Download speed', calculateDownloadSpeedDelta(ourResults, theirResults)],
    ['Estimated conversion increase', estimateConversionDelta(ourResults, theirResults)],
    ['Estimated search rank increase', estimateSearchRankDelta(ourResults, theirResults)]
  ].map(makeStat);

  return (
    <section className="stats">
      <ul className="stats-list">{stats}</ul>
    </section>
  );
};

export default StatsList;
