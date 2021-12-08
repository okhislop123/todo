import { types } from '../actions';

const initialState = {
  todos: [],
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.FET_TODO:
      state.todos = payload;
      return { ...state };
    default:
      return state;
  }
};

export default reducer;
