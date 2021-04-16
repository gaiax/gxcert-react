import CertClient from "./client";

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
  tabInMyPage: 0,
  iconInUserPage: null,
  nameInUserPage: null,
  profileInUserPage: null,
  userPageIsLoading: false,
  certificatesInUserPage: [],
  certificatesIIssuesedInUserPage: [],
  tabInUserPage: 0,
  client: null,
  address: null,
  description: "",
  userIsNotFound: false,
}

export default initialState;
