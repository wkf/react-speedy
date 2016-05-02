import {push} from 'react-router-redux';
import {validateUrlish} from '../modules/urlish';
import {createSpeedtest, waitForSpeedtests} from '../modules/speedtest';

export const syncStoreToRoute = () =>
  (dispatch, getState) => {
    const {speedtest} = getState();
    dispatch(push({
      pathname: '/speedtest' + (speedtest.id ? '/' + speedtest.id : ''),
      query: {
        u: speedtest.urlish,
        a0: speedtest.answers[0],
        a1: speedtest.answers[1]
      }
    }));
  };

export const syncRouteToStore = (route) => ({
  type: 'SYNC_LOCATION_TO_STORE',
  id: route.params.id,
  urlish: route.location.query.u,
  answers: [
    route.location.query.a0,
    route.location.query.a1
  ]
});

export const updateId = (id) =>
  (dispatch) => {
    dispatch({type: 'UPDATE_ID', id});
    dispatch(syncStoreToRoute());
  };

export const updateUrl = (url) =>
  (dispatch) => {
    dispatch({type: 'UPDATE_URL', url});
    dispatch(syncStoreToRoute());
  };

export const updateUrlish = (urlish) => ({
  type: 'UPDATE_URLISH', urlish
});

export const answerQuestion = (id, answer) =>
  (dispatch) => {
    dispatch({type: 'ANSWER_QUESTION', id, answer});
    dispatch(syncStoreToRoute());
  };

export const updateSpeedtestResults = (ourResults, theirResults) => ({
  type: 'UPDATE_SPEEDTEST_RESULTS', ourResults, theirResults
});

export const updateSpeedtestError = (error) => ({
  type: 'UPDATE_SPEEDTEST_ERROR', error
});

const maybeCreateSpeedtest = (url, id) =>
  id ? Promise.resolve({id}) : createSpeedtest({url});

export const runSpeedtest = (url, id) =>
  (dispatch) => {
    if(validateUrlish(url)) {
      dispatch(updateUrl(url));
      maybeCreateSpeedtest(url, id).then(({id}) => {
        dispatch(updateId(id));
        return waitForSpeedtests(
          ({ourResults, theirResults}) =>
            dispatch(updateSpeedtestResults(ourResults, theirResults)),
          {id});
      }).catch((e) => {
        throw new Error('Action Error - runSpeedtest got error from server.', e);
      });
    } else {
      throw new Error('Action Error - runSpeedtest called with invalid URL.');
    }
  };
