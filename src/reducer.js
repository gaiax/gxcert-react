

const initialState = {
  isLoading: false,
  certificateImage: null,
  issueTo: null,
  certificates: [],
  myPageIsLoading: false,
  myProfile: null,
  name: "",
  icon: null,
}

export default function Reducer(state=initialState, action) {
  switch(action.type) {
    case "ON_CLICK_ISSUE_BUTTON":
      return Object.assign({}, state, {
        isLoading: true,
      }); 
    case "START_UPDATE_USER_SETTING":
      return Object.assign({}, state, {
        isLoading: true,
      }); 
    case "UPDATE_USER_SETTING":
      return Object.assign({}, state, {
        isLoading: false,
      }); 
    case "ISSUE":
      return Object.assign({}, state, {
        isLoading: false,
      });
    case "GET_CERTIFICATES":
      return Object.assign({}, state, {
        certificates: action.payload,
        myPageIsLoading: false,
      });
    case "ON_CHANGE_CERTIFICATE_IMAGE":
      return Object.assign({}, state, {
        certificateImage: action.payload,
      });
    case "ON_CHANGE_ISSUE_TO":
      return Object.assign({}, state, {
        issueTo: action.payload,
      });
    case "START_GETTING_CERTIFICATES":
      return Object.assign({}, state, {
        myPageIsLoading: true,
      });
    case "GET_MYPROFILE":
      return Object.assign({}, state, {
        myProfile: action.payload,
      });
    case "ON_CHANGE_NAME":
      return Object.assign({}, state, {
        name: action.payload,
      });
    case "ON_CHANGE_ICON":
      return Object.assign({}, state, {
        icon: action.payload,
      });
    default:
      return state;
  }
}

