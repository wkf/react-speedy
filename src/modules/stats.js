export const calculateDownloadSpeedDelta = (ourResults, theirResults) => {
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

export const estimateConversionDelta = (ourResults, theirResults) => {
  const [o, t] = [ourResults, theirResults];
  // FIXME: caching headers currently untracked
  //  1% per 100ms faster, 3% for https, 0.5% for using http2, 1% for caching headers
  const percent = Math.round(
    (t.downloadTime - o.downloadTime) / 100 + (!t.usesHttps ? 3 : 0) + (!t.usesHttp2 ? 0.5 : 0));

  return percent < 0 ? (percent + '%') : ('+' + percent + '%');
};

export const estimateSearchRankDelta = (ourResults, theirResults) => {
  const [o, t] = [ourResults, theirResults];
  //  1% per 100ms faster, 2% for https, 1% for using http2
  const percent = Math.round(
    (t.downloadTime - o.downloadTime) / 100 + (!t.usesHttps ? 2 : 0) + (!t.usesHttp2 ? 1 : 0));

  return percent < 0 ? (percent + '%') : ('+' + percent + '%');
};
