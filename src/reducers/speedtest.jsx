import update from 'react-addons-update';

export default (state = {answers: []}, action) => {
  switch (action.type) {
    case 'UPDATE_URL':
      return update(state, {
        url: {$set: action.url}
      });
    case 'UPDATE_URLISH':
      return update(state, {
        urlish: {$set: action.urlish}
      });
    case 'ANSWER_QUESTION':
      return update(state, {
        answers: {[action.id]: {$set: action.answer}}
      });
    case 'UPDATE_SPEEDTEST_RESULTS':
      return update(state, {
        resultsLoaded: {$set: true},
        ourResults: {$set: action.ourResults},
        theirResults: {$set: action.theirResults}
      });
    case 'UPDATE_SPEEDTEST_ERROR':
      return update(state, {
        apiError: {$set: action.error}
      });
    case 'SYNC_LOCATION_TO_STORE':
      return update(state, {
        urlish: {$set: action.urlish},
        answers: {$set: action.answers}
      });
    default:
      return state;
  };
};
