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

const createSpeedTest = ({url}) => {
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

const getSpeedTest = ({id}) => {
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

const parseResults = (results) => {
  const _results =  Object.keys(results).map((k) => {
    return {
      dnsTime: nsToMs(results[k].dns_resolve),
      connectionTime: nsToMs(results[k].connect),
      timeToFirstByte: nsToMs(results[k].first_byte),
      downloadTime: nsToMs(results[k].complete_load),
      httpsTime: nsToMs(results[k].tls_handshake),
      usesHttps: (results[k].is_https && results[k].error_code === ""),
      badCertificates: (results[k].is_https && results[k].error_code === "bad_certificates")
    };
  });

  return {
    dnsTime: averageForKey(_results, 'dnsTime'),
    connectionTime: averageForKey(_results, 'connectionTime'),
    timeToFirstByte: averageForKey(_results, 'timeToFirstByte'),
    downloadTime: averageForKey(_results, 'downloadTime'),
    httpsTime: averageForKey(_results, 'httpsTime'),
    usesHttps: _results.reduce((acc, r) => acc || r.usesHttps, false),
    badCertificates: _results.reduce((acc, r) => acc || r.badCertificates, false)
  };
};

const waitForSpeedTests = (updateResults, {id}, retries = 10, r = 0) => {
  getSpeedTest({id}).then(({results}) => {

    if (Object.keys(results).length > 0 ) {
      updateResults(parseResults(results));
    }

    if (r < retries) {
      return delay(500).then(() => waitForSpeedTests(updateResults, {id}, retries, r + 1));
    } else {
      return retries;
    }
  });
};

export const testSite = (url, onUpdate, onError) => {
  createSpeedTest({url})
    .then(waitForSpeedTests.bind(null, onUpdate))
    .catch((e) => {
      console.log('Error response from API server:', e);
      onError(e);
    });
};
