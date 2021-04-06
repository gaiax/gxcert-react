

const initialState = {
  uid: null,
  isLoading: false,
  certificateImage: null,
  issueTo: null,
  certificates: [],
  certificatesIIssuesed: [],
  myPageIsLoading: false,
  myProfile: null,
  name: "",
  icon: null,
  title: "",
  errorMessage: null,
  message: null,
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
      if ((!state.name || state.name.trim() === "") && (!state.icon)) {
        return Object.assign({}, state, {
          isLoading: false,
          errorMessage: "The input fields are empty.",
        });
      }
      if (action.error) {
        return Object.assign({}, state, {
          isLoading: false,
          errorMessage: "Failed to update your setting.",
        });
      }
      return Object.assign({}, state, {
        isLoading: false,
        message: "Successfully updated your setting.",
      }); 
    case "ISSUE":
      if (state.issueTo === null || state.certificateImage === null || state.title.trim() === "") {
        return Object.assign({}, state, {
          isLoading: false,
          errorMessage: "Fill the input fields.",
        });
        return;
      }
      if (action.error) {
        return Object.assign({}, state, {
          isLoading: false,
          errorMessage: "Failed to issue the certificate.",
        });
      }
      return Object.assign({}, state, {
        isLoading: false,
        message: "Successfully issuesed the certificate.",
      });
    case "GET_CERTIFICATES":
      if (action.error) {
        return Object.assign({}, state, {
          myPageIsLoading: false,
          errorMessage: "Failed to fetch your certificates.",
        });
      }
      return Object.assign({}, state, {
        certificates: action.payload,
        myPageIsLoading: false,
      });
    case "GET_CERTIFICATES_I_ISSUESED":
      if (action.error) {
        return Object.assign({}, state, {
          myPageIsLoading: false,
          errorMessage: "Failed to fetch the certificates that you issuesed.",
        });
      }
      return Object.assign({}, state, {
        certificatesIIssuesed: action.payload,
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
    case "ON_CHANGE_TITLE":
      return Object.assign({}, state, {
        title: action.payload,
      });
    case "START_GETTING_CERTIFICATES":
      return Object.assign({}, state, {
        myPageIsLoading: true,
      });
    case "START_GETTING_CERTIFICATES_I_ISSUESED":
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
    case "CLOSE_MODAL":
      return Object.assign({}, state, {
        message: null,
        errorMessage: null,
      });
    case "ON_COPY_ID":
      return Object.assign({}, state, {
        message: "Successfully copied your ID",
      });
    default:
      return state;
  }
}

