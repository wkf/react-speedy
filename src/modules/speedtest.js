const STUB_RESULTS = {
  dnsTime: 1000,
  connectionTime: 1000,
  timeToFirstByte: 1000,
  downloadTime: 10000,
  usesHttps: true,
  httpsTime: 100,
  usesSecureCipher: false,
  usesSecureAlgorithm: false
};

const STUB_TIMEOUT = 5000;
const API_BASE_URL = 'https://api.netlify.com/api/v1/';
const DOWNLOAD_SPEED = 610;

export const testSiteStub = (url, onSuccess, onError) => {
  console.log('Waiting ' + STUB_TIMEOUT + 'ms, and then returning stubbed results!');
  window.setTimeout(() => onSuccess(STUB_RESULTS), STUB_TIMEOUT);
};

const checkStatus = (res) => {
  if(res.status >= 200 && res.status < 300) {
    return res;
  } else {
    const e = new Error(res.statusText);
    e.response = res;
    throw e;
  }
};

const parseResponse = (res) => {
  return res.json();
};

const createSpeedtest = ({url}) => {
  return window.fetch(API_BASE_URL + 'speed_tests', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({url})
  }).then(checkStatus).then(parseResponse);
};

const delay = (ms) => new Promise((resolve, reject) => window.setTimeout(resolve, ms));

const getSpeedtest = ({id}) => {
  return window.fetch(API_BASE_URL + 'speed_tests/' + id, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(checkStatus).then(parseResponse);
};

const nsToMs = (ns) => ns / 1000000;
const averageForKey = (rs, k) => rs.reduce((acc, r) => acc + r[k], 0) / rs.length;

const estimateDownloadTime = (contentSize) =>
  Math.max(contentSize / DOWNLOAD_SPEED, 50);

const parseResults = (results) => {
  const _results =  Object.keys(results).map((k) => {
    return {
      contentSize: results[k].content_size,
      dnsTime: nsToMs(results[k].dns_resolve),
      connectionTime: nsToMs(results[k].connect),
      timeToFirstByte: nsToMs(results[k].first_byte),
      downloadTime: nsToMs(results[k].complete_load),
      httpsTime: nsToMs(results[k].tls_handshake),
      usesHttps: (results[k].is_https && results[k].error_code === ""),
      badCertificates: (results[k].is_https && results[k].error_code === "bad_certificates")
    };
  });

  const contentSize = averageForKey(_results, 'contentSize');

  return {
    ourResults: {
      dnsTime: 0.5,
      connectionTime: 2,
      timeToFirstByte: 2,
      downloadTime: estimateDownloadTime(contentSize),
      usesHttps: true,
      usesHttp2: true,
      httpsTime: 2,
      usesSecureCipher: true,
      usesSecureAlgorithm: true
    },
    theirResults: {
      contentSize: averageForKey(_results, 'contentSize'),
      dnsTime: averageForKey(_results, 'dnsTime'),
      connectionTime: averageForKey(_results, 'connectionTime'),
      timeToFirstByte: averageForKey(_results, 'timeToFirstByte'),
      downloadTime: averageForKey(_results, 'downloadTime'),
      httpsTime: averageForKey(_results, 'httpsTime'),
      usesHttps: _results.reduce((acc, r) => acc || r.usesHttps, false),
      badCertificates: _results.reduce((acc, r) => acc || r.badCertificates, false)
    }};
};

const waitForSpeedtests = (updateResults, {id}, retries = 10, r = 0) => {
  getSpeedtest({id}).then(({results}) => {

    if (Object.keys(results).length > 0 ) {
      updateResults(parseResults(results));
    }

    if (r < retries) {
      return delay(500).then(() => waitForSpeedtests(updateResults, {id}, retries, r + 1));
    } else {
      //******************
      // updateResults({
      //   ourResults: {
      //     dnsTime: 0.5,
      //     connectionTime: 2,
      //     timeToFirstByte: 2,
      //     downloadTime: 100,
      //     usesHttps: true,
      //     usesHttp2: true,
      //     httpsTime: 2,
      //     usesSecureCipher: true,
      //     usesSecureAlgorithm: true
      //   },
      //   theirResults: {
      //     dnsTime: 10,
      //     connectionTime: 20,
      //     timeToFirstByte: 200,
      //     downloadTime: 1000,
      //     usesHttps: false,
      //     usesHttp2: false,
      //     httpsTime: 2,
      //     usesSecureCipher: false,
      //     usesSecureAlgorithm: false
      //   }
      // });
      //******************

      return retries;
    }
  });
};

export const runSpeedtestOnSite = (url, onUpdate, onError) => {
  createSpeedtest({url})
    .then(waitForSpeedtests.bind(null, onUpdate))
    .catch((e) => {
      console.log('Error response from API server:', e);
      onError(e);
    });
};
