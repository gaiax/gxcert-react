

const initialState = {
  isLoading: false,
  certificates: [],
}

export default function Reducer(state=initialState, action) {
  switch(action.type) {
    case "ISSUE":
      return state;
    case "GET_CERTIFICATES":
      return Object.assign({}, state, {
        certificates: action.payload,
      });
    default:
      return state;
  }
}

