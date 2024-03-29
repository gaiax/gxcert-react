
import initialState from "./initialState";
import ModalType from "./modalType";

export default function Reducer(state=initialState, action) {
  switch(action.type) {
    case "ON_CLICK_ISSUE_BUTTON":
      return Object.assign({}, state, {
        modal: ModalType.ISSUE,
        isIssuing: true,
      }); 
    case "START_UPDATE_USER_SETTING":
      return Object.assign({}, state, {
        modal: ModalType.NORMAL,
        isLoading: true,
        message: "Updating your setting...",
      }); 
    case "UPDATE_USER_SETTING":
      if ((!state.name || state.name.trim() === "") && (!state.icon)) {
        return Object.assign({}, state, {
          modal: ModalType.NORMAL,
          isLoading: false,
          message: null,
          errorMessage: "The input fields are empty.",
        });
      }
      if (action.error) {
        return Object.assign({}, state, {
          modal: ModalType.NORMAL,
          isLoading: false,
          message: null,
          errorMessage: "Failed to update your setting.",
        });
      }
      return Object.assign({}, state, {
        modal: ModalType.NORMAL,
        isLoading: false,
        message: "Successfully updated your setting.",
      }); 
    case "ISSUE":
      if (state.issueTo === null || state.certificateImage === null || state.title.trim() === "") {
        return Object.assign({}, state, {
          modal: ModalType.ISSUE,
          isIssuing: false,
          issueError: true,
        });
        return;
      }
      if (action.error) {
        return Object.assign({}, state, {
          modal: ModalType.ISSUE,
          isIssuing: false,
          issueError: true,
        });
      }
      return Object.assign({}, state, {
        modal: ModalType.ISSUE,
        isIssuing: false,
        issueError: false,
      });
    case "GET_CERTIFICATES":
      if (action.error) {
        return Object.assign({}, state, {
          modal: ModalType.NORMAL,
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
          modal: ModalType.NORMAL,
          myPageIsLoading: false,
          errorMessage: "Failed to fetch the certificates that you issued.",
        });
      }
      return Object.assign({}, state, {
        certificatesIIssued: action.payload,
        myPageIsLoading: false,
      });
    case "GET_CERTIFICATES_IN_USER_PAGE":
      if (action.error) {
        return Object.assign({}, state, {
          certificatesInUserPage: [],
          userPageIsLoading: false,
        });
      }
      return Object.assign({}, state, {
        certificatesInUserPage: action.payload,
        userPageIsLoading: false,
      });
    case "GET_CERTIFICATES_I_ISSUESED_IN_USER_PAGE":
      if (action.error) {
        return Object.assign({}, state, {
          certificatesIIssuedInUserPage: [],
          userPageIsLoading: false,
        });
      }
      return Object.assign({}, state, {
        certificatesIIssuedInUserPage: action.payload,
        userPageIsLoading: false,
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
        tabInMyPage: 0,
      });
    case "START_GETTING_CERTIFICATES_I_ISSUESED":
      return Object.assign({}, state, {
        myPageIsLoading: true,
        tabInMyPage: 1,
      });
    case "START_GETTING_CERTIFICATES_IN_USER_PAGE":
      return Object.assign({}, state, {
        userPageIsLoading: true,
        tabInUserPage: 0,
      });
    case "START_GETTING_CERTIFICATES_I_ISSUESED_IN_USER_PAGE":
      return Object.assign({}, state, {
        userPageIsLoading: true,
        tabInUserPage: 1,
      });
    case "GET_MYPROFILE":
      return Object.assign({}, state, {
        myProfile: action.payload,
      });
    case "ON_CHANGE_NAME":
      return Object.assign({}, state, {
        name: action.payload,
      });
    case "ON_CHANGE_DESCRIPTION":
      return Object.assign({}, state, {
        description: action.payload,
      });
    case "ON_CHANGE_ICON":
      return Object.assign({}, state, {
        icon: action.payload,
      });
    case "CLOSE_MODAL":
      return Object.assign({}, state, {
        modal: 0,
        isLoading: false,
        message: null,
        errorMessage: null,
      });
    case "ON_COPY_ID":
      return Object.assign({}, state, {
        modal: ModalType.NORMAL,
        message: "Successfully copied your ID",
      });
    case "CHANGE_TAB_TO_ISSUESER":
      return Object.assign({}, state, {
        tabInMyPage: 1,
      });
    case "CHANGE_TAB_TO_MY_CERTIFICATES":
      return Object.assign({}, state, {
        tabInMyPage: 0,
      });
    case "FETCH_PROFILE_IN_USER_PAGE":
      if (action.error) {
        return Object.assign({}, state, {
          profileInUserPage: null,
          nameInUserPage: null,
          userIsNotFound: true,
        });
      }
      return Object.assign({}, state, {
        profileInUserPage: action.payload,
        nameInUserPage: action.payload.nameInIpfs,
        userIsNotFound: false,
      });
    case "FETCH_ICON_IN_USER_PAGE":
      return Object.assign({}, state, {
        iconInUserPage: action.payload,
      });
    case "LOGOUT":
      return initialState;
    case "INITIALIZE_CLIENT":
      return Object.assign({}, state, {
        client: action.payload,
        modal: ModalType.NORMAL,
        isLoading: false,
      });
    case "LOADING":
      return Object.assign({}, state, {
        modal: ModalType.NORMAL,
        isLoading: true,
      });
    case "OPEN_EXPORT_MODAL":
      return Object.assign({}, state, {
        modal: ModalType.EXPORT,
      });
    case "CLOSE_EXPORT_MODAL":
      return Object.assign({}, state, {
        modal: 0,
      });
    default:
      return state;
  }
}

