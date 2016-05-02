import {push} from 'react-router-redux';
import {validateUrlish} from '../modules/urlish';
import {runSpeedtestOnSite} from '../modules/speedtest';

export const syncStoreToLocation = () =>
  (dispatch, getState) => {
    const {speedtest} = getState();
    dispatch(push({
      pathname: 'speedtest',
      query: {
        u: speedtest.urlish,
        a0: speedtest.answers[0],
        a1: speedtest.answers[1]
      }
    }));
  };

export const syncLocationToStore = (location) => ({
  type: 'SYNC_LOCATION_TO_STORE',
  urlish: location.query.u,
  answers: [
    location.query.a0,
    location.query.a1
  ]
});

export const updateUrl = (url) => ({
  type: 'UPDATE_URL', url
});

export const updateUrlish = (urlish) => ({
  type: 'UPDATE_URLISH', urlish
});

export const answerQuestion = (id, answer) =>
  (dispatch) => {
    dispatch({type: 'ANSWER_QUESTION', id, answer});
    dispatch(syncStoreToLocation());
  };

export const updateSpeedtestResults = (ourResults, theirResults) => ({
  type: 'UPDATE_SPEEDTEST_RESULTS', ourResults, theirResults
});

export const updateSpeedtestError = (error) => ({
  type: 'UPDATE_SPEEDTEST_ERROR', error
});

export const runSpeedtest = (url) =>
  (dispatch) => {
    if(validateUrlish(url)) {
      dispatch(updateUrl(url));
      dispatch(syncStoreToLocation());
      return runSpeedtestOnSite(
        url,
        ({ourResults, theirResults}) =>
          dispatch(updateSpeedtestResults(ourResults, theirResults)),
        (error) => dispatch(updateSpeedtestError(error))
      );
    } else {
      throw new Error('Action Error - runSpeedtest called with invalid URL.');
    }
  };
