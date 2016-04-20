import {validateUrlish} from '../modules/urlish';
import {runSpeedtestOnSite} from '../modules/speedtest';

export const updateUrlish = (url) => ({
  type: 'UPDATE_URLISH', url, isValidUrl: validateUrlish(url)
});

export const answerQuestion = (id, answer) => ({
  type: 'ANSWER_QUESTION', id, answer
});

export const updateSpeedtestResults = (ourResults, theirResults) => ({
  type: 'UPDATE_SPEEDTEST_RESULTS', ourResults, theirResults
});

export const updateSpeedtestError = (error) => ({
  type: 'UPDATE_SPEEDTEST_ERROR', error
});

export const runSpeedtest = (url) =>
  (dispatch) =>
    runSpeedtestOnSite(
      url,
      ({ourResults, theirResults}) =>
        dispatch(updateSpeedtestResults(ourResults, theirResults)),
      (error) => dispatch(updateSpeedtestError(error))
    );
