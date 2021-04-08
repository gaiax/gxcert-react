import CertClient from "../client"
import { fileInputToDataURL, createBlobFromImageDataURI, postCertificate, getImageOnIpfs } from "../image-upload";

const getMyProfile = () => async (dispatch) => {
  const client = CertClient();
  let profile;
  try {
    profile = await client.getProfile(client.address);
  } catch(err) {
    console.error(err);
    return;
  }
  const ipfsHash = profile.icon;
  let icon = null;
  if (ipfsHash) {
    try {
      icon = await getImageOnIpfs(ipfsHash);
    } catch(err) {
      icon = null;
    }
  }
  profile.icon = icon;
  dispatch({
    type: "GET_MYPROFILE",
    payload: profile,
  });
}
const getCertificates = () => async (dispatch) => {
  dispatch({
    type: "START_GETTING_CERTIFICATES",
    payload: null,
  });
  const client = CertClient();
  let certificates;
  try {
    certificates = await client.getCertificates();
  } catch(err) {
    console.error(err);
    dispatch({
      type: "GET_CERTIFICATES",
      payload: null,
      error: err,
    });
    return;
  }
  dispatch({
    type: "GET_CERTIFICATES",
    payload: certificates,
  });
}

const getCertificatesInUserPage = (address) => async (dispatch) => {
  dispatch({
    type: "START_GETTING_CERTIFICATES_IN_USER_PAGE",
    payload: null,
  });
  const client = CertClient();
  let certificates;
  try {
    certificates = await client.getCertificates(address);
  } catch(err) {
    console.error(err);
    dispatch({
      type: "GET_CERTIFICATES_IN_USER_PAGE",
      payload: null,
      error: err,
    });
    return;
  }
  dispatch({
    type: "GET_CERTIFICATES_IN_USER_PAGE",
    payload: certificates,
  });
}
const getCertificatesIIssuesed = () => async (dispatch) => {
  dispatch({
    type: "START_GETTING_CERTIFICATES_I_ISSUESED",
    payload: null,
  });
  const client = CertClient();
  let certificates;
  try {
    certificates = await client.getCertificatesIIssuesed();
  } catch(err) {
    console.error(err);
    dispatch({
      type: "GET_CERTIFICATES_I_ISSUESED",
      payload: null,
      error: err,
    });
    return;
  }
  dispatch({
    type: "GET_CERTIFICATES_I_ISSUESED",
    payload: certificates,
  });
}
const getCertificatesIIssuesedInUserPage = (address) => async (dispatch) => {
  dispatch({
    type: "START_GETTING_CERTIFICATES_I_ISSUESED_IN_USER_PAGE",
    payload: null,
  });
  const client = CertClient();
  let certificates;
  try {
    certificates = await client.getCertificatesIIssuesed(address);
  } catch(err) {
    console.error(err);
    dispatch({
      type: "GET_CERTIFICATES_I_ISSUESED_IN_USER_PAGE",
      payload: null,
      error: err,
    });
    return;
  }
  dispatch({
    type: "GET_CERTIFICATES_I_ISSUESED_IN_USER_PAGE",
    payload: certificates,
  });
}
const issue = () => async (dispatch, getState) => {
  dispatch({
    type: "ON_CLICK_ISSUE_BUTTON",
    payload: null,
    error: null,
  });
  const client = CertClient();
  const state = getState().state;
  const issueTo = state.issueTo;
  const image = state.certificateImage;
  const title = state.title.trim();
  if (issueTo === null || image === null || title === "") {
    dispatch({
      type: "ISSUE",
      payload: null,
      error: new Error("The certificate image or address is not set."),
    });
    return;
  }
  let ipfsHash = null;
  try {
    const imageData = await fileInputToDataURL(image);
    const blob = createBlobFromImageDataURI(imageData);
    ipfsHash = await postCertificate(blob);
  } catch(err) {
    dispatch({
      type: "ISSUE",
      payload: null,
      error: err,
    });
    return;
  }
  try {
    const certificate = client.createCertificateObject(title, ipfsHash, issueTo);
    await client.issueCertificate(certificate, issueTo);
  } catch(err) {
    dispatch({
      type: "ISSUE",
      payload: null,
      error: err,
    });
    return;
  }
  dispatch({
    type: "ISSUE",
    payload: null,
    error: null,
  });
}

const onChangeCertificateImage = (evt) => async (dispatch) => {
  dispatch({
    type: "ON_CHANGE_CERTIFICATE_IMAGE",
    payload: evt.target.files[0],
  });
}

const onChangeIssueTo = (evt) => async (dispatch) => {
  dispatch({
    type: "ON_CHANGE_ISSUE_TO",
    payload: evt.target.value,
  });
}

const onChangeName = (evt) => async (dispatch) => {
  dispatch({
    type: "ON_CHANGE_NAME",
    payload: evt.target.value,
  });
}

const onChangeIcon = (evt) => async (dispatch) => {
  dispatch({
    type: "ON_CHANGE_ICON",
    payload: evt.target.files[0],
  });
}
const onChangeTitle = (evt) => async (dispatch) => {
  dispatch({
    type: "ON_CHANGE_TITLE",
    payload: evt.target.value,
  });
}

const closeModal = () => async (dispatch) => {
  dispatch({
    type: "CLOSE_MODAL",
    payload: null,
  });
}

const updateUserSetting = () => async (dispatch, getState) => {
  dispatch({
    type: "START_UPDATE_USER_SETTING",
    payload: null,
  });
  const client = CertClient();
  const state = getState().state;
  if ((!state.name || state.name.trim() === "") && (!state.icon)) {
    dispatch({
      type: "UPDATE_USER_SETTING",
      payload: null,
      error: new Error("The input fields are empty."),
    });
    return;
  }
  if (state.name !== null && state.name.trim() !== "") {
    const name = state.name.trim();
    try {
      await client.registerName(name);
    } catch(err) {
      dispatch({
        type: "UPDATE_USER_SETTING",
        payload: null,
        error: err,
      });
      return;
    }
  }
  if (state.icon !== null) {
    let ipfsHash = null;
    try {
      const imageData = await fileInputToDataURL(state.icon);
      const blob = createBlobFromImageDataURI(imageData);
      ipfsHash = await postCertificate(blob);
      await client.registerIcon(ipfsHash);
    } catch(err) {
      dispatch({
        type: "UPDATE_USER_SETTING",
        payload: null,
        error: err,
      });
      return;
    }
  }
  dispatch({
    type: "UPDATE_USER_SETTING",
    payload: null,
    error: null,
  });
}

const onCopyId = () => async (dispatch) => {
  dispatch({
    type: "ON_COPY_ID",
    payload: null,
  });
}

const changeTabToIssueser = () => async (dispatch) => {
  console.log("change to issueser");
  dispatch({
    type: "CHANGE_TAB_TO_ISSUESER",
    payload: null,
  });
}

const changeTabToMyCertificates = () => async (dispatch) => {
  dispatch({
    type: "CHANGE_TAB_TO_MY_CERTIFICATES",
    payload: null,
  });
}

const fetchProfileInUserPage = (id) => async (dispatch) => {
  const client = CertClient();
  if (!client) {
    return;
  }
  let profile;
  try {
    profile = await client.getProfile(id);
  } catch(err) {
    console.error(err);
    return;
  }
  dispatch({
    type: "FETCH_PROFILE_IN_USER_PAGE",
    payload: profile,
  });
  const icon = profile.icon;
  if (!icon) {
    return;
  }
  const imageUrl = await getImageOnIpfs(icon);
  dispatch({
    type: "FETCH_ICON_IN_USER_PAGE",
    payload: imageUrl,
  });
}

const changeTabInUserPageToIssueser = () => async (dispatch) => {
  dispatch({
    type: "CHANGE_TAB_IN_USER_PAGE_TO_ISSUESER",
    payload: null,
  });
}
const changeTabInUserPageToMyCertificates = () => async (dispatch) => {
  dispatch({
    type: "CHANGE_TAB_IN_USER_PAGE_TO_MY_CERTIFICATES",
    payload: null,
  });
}

const getImages = () => async (dispatch, getState) => {
  const state = getState().state;
  const certificates = state.certificates;
  for (const certificate of certificates) {
    if (!certificate.imageUrl) {
      getImageOnIpfs(certificate.ipfs).then(imageUrl => {
        certificate.imageUrl = imageUrl;
        dispatch({
          type: "GET_CERTIFICATES",
          payload: certificates,
        });
      });
    }
  }
}

const getImagesIIssuesed = () => async (dispatch, getState) => {
  const state = getState().state;
  const certificates = state.certificatesIIssuesed;
  for (const certificate of certificates) {
    if (!certificate.imageUrl) {
      getImageOnIpfs(certificate.ipfs).then(imageUrl => {
        certificate.imageUrl = imageUrl;
        dispatch({
          type: "GET_CERTIFICATES_I_ISSUESED",
          payload: certificates,
        });
      });
    }
  }
}

const getImagesInUserPage = () => async (dispatch, getState) => {
  const state = getState().state;
  const certificates = state.certificatesInUserPage;
  for (const certificate of certificates) {
    if (!certificate.imageUrl) {
      getImageOnIpfs(certificate.ipfs).then(imageUrl => {
        certificate.imageUrl = imageUrl;
        dispatch({
          type: "GET_CERTIFICATES_IN_USER_PAGE",
          payload: certificates,
        });
      });
    }
  }
}

const getImagesIIssuesedInUserPage = () => async (dispatch, getState) => {
  const state = getState().state;
  const certificates = state.certificatesIIssuesedInUserPage;
  for (const certificate of certificates) {
    if (!certificate.imageUrl) {
      getImageOnIpfs(certificate.ipfs).then(imageUrl => {
        certificate.imageUrl = imageUrl;
        dispatch({
          type: "GET_CERTIFICATES_I_ISSUESED_IN_USER_PAGE",
          payload: certificates,
        });
      });
    }
  }
}

const exportAccount = (evt) => async (dispatch, getState) => {
  const client = CertClient();
  const uid = client.uid;
  const json = JSON.stringify({
    uid,
  })
  const blob = new Blob([json], {type: "application/json"});
  const a = evt.target;
  a.download = "account.json";
  a.href = window.URL.createObjectURL(blob);
}

export {
  getMyProfile,
  getCertificates,
  getCertificatesInUserPage,
  getCertificatesIIssuesed,
  getCertificatesIIssuesedInUserPage,
  issue,
  onChangeCertificateImage,
  onChangeIssueTo,
  onChangeName,
  onChangeIcon,
  updateUserSetting,
  exportAccount,
  onChangeTitle,
  closeModal,
  onCopyId,
  changeTabToIssueser,
  changeTabToMyCertificates,
  fetchProfileInUserPage,
  changeTabInUserPageToIssueser,
  changeTabInUserPageToMyCertificates,
  getImages,
  getImagesInUserPage,
  getImagesIIssuesed,
  getImagesIIssuesedInUserPage,
}
