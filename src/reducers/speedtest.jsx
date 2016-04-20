import update from 'react-addons-update';

export default (state = {answers: []}, action) => {
  switch (action.type) {
    case 'UPDATE_URLISH':
      return update(state, {
        url: {$set: action.url},
        isValidUrl: {$set: action.isValidUrl}
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
    default:
      return state;
  };
};
