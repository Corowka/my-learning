const defaultState = {
  customers: 0,
};

export const customerReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "ADD_CUSTOMER":
      return { ...state, customers: ++state.customers };
    default:
      return state;
  }
};
