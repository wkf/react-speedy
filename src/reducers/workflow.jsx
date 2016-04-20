import update from 'react-addons-update';

export default (state = {step: 0}, action) => {
  switch (action.type) {
    case 'GOTO_WORKFLOW_STEP':
      return update(state, {
        step: {$set: action.step}
      });
    default:
      return state;
  };
};
