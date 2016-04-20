import update from 'react-addons-update';

export default (state = {}, action) => {
  switch (action.type) {
    case 'TOGGLE_POPOVER':
      return update(state, {
        visibleId: {
          $set: (state.visibleId === action.id ? null : action.id)
        }
      });
    default:
      return state;
  };
};
