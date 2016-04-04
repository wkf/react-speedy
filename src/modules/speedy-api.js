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

const parseResults = (res) => {
  return res.json();
};

export const testSite = (url, onSuccess, onError) => {
  window.fetch('https://api.netlify.com/api/v1/speed_tests', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'text/plain'
    },
    body: url
  }).then(checkStatus)
    .then(parseResults)
    .then(onSuccess)
    .catch((e) => {
      console.log('Error response from API server:', e);
      onError(e);
    });
};
