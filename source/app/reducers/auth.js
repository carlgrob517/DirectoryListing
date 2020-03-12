import * as actionTypes from "@actions/actionTypes";
const initialState = {
  login: {
    success: false
  },
  user: {
    lang: "en"
  }
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        login: action.data
      };
    default:
      return state;
  }
};
