

const initialState = {
  isLoading: false,
  certificateImage: null,
  issueTo: null,
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
    case "ON_CHANGE_CERTIFICATE_IMAGE":
      return Object.assign({}, state, {
        certificateImage: action.payload,
      });
    case "ON_CHANGE_ISSUE_TO":
      return Object.assign({}, state, {
        issueTo: action.payload,
      });
    default:
      return state;
  }
}

