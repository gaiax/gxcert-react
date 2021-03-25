

const initialState = {
  isLoading: false,
  receiver: null,
}

export default function Reducer(state=initialState, action) {
  switch(action.type) {
    case "ISSUE":
      return Object.assign({}, state, {
        
      });
    case "GET_CERTIFICATES":
      return Object.assign({}, state, {
        certificates: action.certificates,
      });
    default:
      return state;
  }
}

