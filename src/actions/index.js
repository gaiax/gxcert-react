import CertClient, { getClientFromState, clientWithoutAccount } from "../client"
import { getTextOnIpfs, postText, fileInputToDataURL, createBlobFromImageDataURI, postCertificate, getImageOnIpfs } from "../image-upload";
import { copyText, getGoogleUid } from "../util";

const getMyProfile = () => async (dispatch, getState) => {
  const client = getState().state.client;
  let profile;
  try {
    await client.getProfile(client.address, profile => {
      dispatch({
        type: "GET_MYPROFILE",
        payload: profile,
      });
    });
  } catch(err) {
    console.error(err);
    return;
  }
}
const getCertificates = () => async (dispatch, getState) => {
  dispatch({
    type: "START_GETTING_CERTIFICATES",
    payload: null,
  });
  const client = getClientFromState(getState().state.client);
  let certificates;
  try {
    certificates = await client.getCertificates(client.address);
  } catch(err) {
    console.error(err);
    dispatch({
      type: "GET_CERTIFICATES",
      payload: null,
      error: err,
    });
    return;
  }
  for (const [index, certificate] of certificates.entries()) {
    certificate.index = index;
    client.getTitle(client.address, index).then(certificates => {
      dispatch({
        type: "GET_CERTIFICATES",
        payload: certificates,
      });
    }).catch(err => {
      console.error(err);
      dispatch({
        type: "GET_CERTIFICATES",
        payload: null,
        error: err,
      });
    });
    client.getImageUrl(client.address, index).then(certificates => {
      dispatch({
        type: "GET_CERTIFICATES",
        payload: certificates,
      });
    }).catch(err => {
      console.error(err);
      dispatch({
        type: "GET_CERTIFICATES",
        payload: null,
        error: err,
      });
    });
  }
}

const getCertificatesInUserPage = (address) => async (dispatch, getState) => {
  dispatch({
    type: "START_GETTING_CERTIFICATES_IN_USER_PAGE",
    payload: null,
  });
  console.log("address");
  console.log(address);
  const client = clientWithoutAccount;
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
  for (const [index, certificate] of certificates.entries()) {
    client.getTitle(address, index).then(certificates => {
      dispatch({
        type: "GET_CERTIFICATES_IN_USER_PAGE",
        payload: certificates,
      });
    }).catch(err => {
      console.error(err);
      dispatch({
        type: "GET_CERTIFICATES_IN_USER_PAGE",
        payload: null,
        error: err,
      });
    });
    client.getImageUrl(address, index).then(certificates => {
      dispatch({
        type: "GET_CERTIFICATES_IN_USER_PAGE",
        payload: certificates,
      });
    }).catch(err => {
      console.error(err);
      dispatch({
        type: "GET_CERTIFICATES_IN_USER_PAGE",
        payload: null,
        error: err,
      });
    });
  }
}
const getCertificatesIIssued = () => async (dispatch, getState) => {
  dispatch({
    type: "START_GETTING_CERTIFICATES_I_ISSUESED",
    payload: null,
  });
  const client = getClientFromState(getState().state.client);
  let certificates;
  try {
    certificates = await client.getCertificatesIIssued(client.address);
  } catch(err) {
    console.error(err);
    dispatch({
      type: "GET_CERTIFICATES_I_ISSUESED",
      payload: null,
      error: err,
    });
    return;
  }
  for (const [index, certificate] of certificates.entries()) {
    client.getTitle(client.address, index).then(certificates => {
      dispatch({
        type: "GET_CERTIFICATES_I_ISSUESED",
        payload: certificates,
      });
    }).catch(err => {
      console.error(err);
      dispatch({
        type: "GET_CERTIFICATES_I_ISSUESED",
        payload: null,
        error: err,
      });
    });
    client.getImageUrl(client.address, index).then(certificates => {
      dispatch({
        type: "GET_CERTIFICATES_I_ISSUESED",
        payload: certificates,
      });
    }).catch(err => {
      console.error(err);
      dispatch({
        type: "GET_CERTIFICATES_I_ISSUESED",
        payload: null,
        error: err,
      });
    });
  }
}
const getCertificatesIIssuedInUserPage = (address) => async (dispatch, getState) => {
  dispatch({
    type: "START_GETTING_CERTIFICATES_I_ISSUESED_IN_USER_PAGE",
    payload: null,
  });
  const client = clientWithoutAccount;
  let certificates;
  try {
    certificates = await client.getCertificatesIIssued(address);
  } catch(err) {
    console.error(err);
    dispatch({
      type: "GET_CERTIFICATES_I_ISSUESED_IN_USER_PAGE",
      payload: null,
      error: err,
    });
    return;
  }
  for (const [index, certificate] of certificates.entries()) {
    client.getTitle(address, index).then(certificates => {
      dispatch({
        type: "GET_CERTIFICATES_I_ISSUESED_IN_USER_PAGE",
        payload: certificates,
      });
    }).catch(err => {
      console.error(err);
      dispatch({
        type: "GET_CERTIFICATES_I_ISSUESED_IN_USER_PAGE",
        payload: null,
        error: err,
      });
    });
    client.getImageUrl(address, index).then(certificates => {
      dispatch({
        type: "GET_CERTIFICATES_I_ISSUESED_IN_USER_PAGE",
        payload: certificates,
      });
    }).catch(err => {
      console.error(err);
      dispatch({
        type: "GET_CERTIFICATES_I_ISSUESED_IN_USER_PAGE",
        payload: null,
        error: err,
      });
    });
  }
}
const issue = () => async (dispatch, getState) => {
  dispatch({
    type: "ON_CLICK_ISSUE_BUTTON",
    payload: null,
    error: null,
  });
  const client = getClientFromState(getState().state.client);
  const state = getState().state;
  const issueTo = state.issueTo;
  const image = state.certificateImage;
  const title = state.title.trim();
  const description = state.description.trim();
  if (issueTo === null || image === null || title === "") {
    dispatch({
      type: "ISSUE",
      payload: null,
      error: new Error("The certificate image or address is not set."),
    });
    return;
  }
  let ipfsHashOfImage = null;
  try {
    const imageData = await fileInputToDataURL(image);
    const blob = createBlobFromImageDataURI(imageData);
    ipfsHashOfImage = await postCertificate(blob);
  } catch(err) {
    console.error(err);
    dispatch({
      type: "ISSUE",
      payload: null,
      error: err,
    });
    return;
  }
  let ipfsHashOfTitle = null;
  try {
    ipfsHashOfTitle = await postText(title);
  } catch(err) {
    console.error(err);
    dispatch({
      type: "ISSUE",
      payload: null,
      error: err,
    });
    return;
  }
  let ipfsHashOfDescription = null;
  try {
    ipfsHashOfDescription = await postText(description);
  } catch(err) {
    console.error(err);
    dispatch({
      type: "ISSUE",
      payload: null,
      error: err,
    });
    return;
  }
  try {
    const certificate = client.createCertificateObject(ipfsHashOfTitle, ipfsHashOfDescription, ipfsHashOfImage, issueTo);
    await client.issueCertificate(certificate, issueTo);
  } catch(err) {
    console.log(err);
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

const onChangeDescription = (evt) => async (dispatch) => {
  dispatch({
    type: "ON_CHANGE_DESCRIPTION",
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
  const client = getClientFromState(getState().state.client);
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
    let name = state.name.trim();
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
    let ipfsHashOfImage = null;
    try {
      const imageData = await fileInputToDataURL(state.icon);
      const blob = createBlobFromImageDataURI(imageData);
      ipfsHashOfImage = await postCertificate(blob);
      await client.registerIcon(ipfsHashOfImage);
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

const changeTabToIssuer = () => async (dispatch) => {
  console.log("change to issuer");
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

const fetchProfileInUserPage = (id) => async (dispatch, getState) => {
  const client = clientWithoutAccount;
  if (!client) {
    return;
  }
  let profile;
  try {
    profile = await client.getProfile(id, profile => {
      dispatch({
        type: "FETCH_PROFILE_IN_USER_PAGE",
        payload: profile,
      });
    });
  } catch(err) {
    console.error(err);
    dispatch({
      type: "FETCH_PROFILE_IN_USER_PAGE",
      payload: null,
      error: err,
    });
    return;
  }
}

const changeTabInUserPageToIssuer = () => async (dispatch) => {
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

const getInfoOfCertificates = () => async (dispatch, getState) => {
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
      }).catch(err => {
        console.error(err);
      });
    }
    if (!certificate.titleInIpfs && certificate.title) {
      getTextOnIpfs(certificate.title).then(title => {
        certificate.titleInIpfs = title;
        dispatch({
          type: "GET_CERTIFICATES",
          payload: certificates,
        });
      }).catch(err => {
        console.error(err);
      });
    }
    if (!certificate.descriptionInIpfs && certificate.description) {
      getTextOnIpfs(certificate.description).then(description => {
        certificate.descriptionInIpfs = description;
        dispatch({
          type: "GET_CERTIFICATES",
          payload: certificates,
        });
      }).catch(err => {
        console.error(err);
      });
    }
  }
}

const getInfoOfCertificatesIIssued = () => async (dispatch, getState) => {
  const state = getState().state;
  const certificates = state.certificatesIIssued;
  for (const certificate of certificates) {
    if (!certificate.imageUrl) {
      getImageOnIpfs(certificate.ipfs).then(imageUrl => {
        certificate.imageUrl = imageUrl;
        dispatch({
          type: "GET_CERTIFICATES_I_ISSUESED",
          payload: certificates,
        });
      }).catch(err => {
        console.error(err);
      });
    }
    if (!certificate.titleInIpfs && certificate.title) {
      getTextOnIpfs(certificate.title).then(title => {
        certificate.titleInIpfs = title;
        dispatch({
          type: "GET_CERTIFICATES_I_ISSUESED",
          payload: certificates,
        });
      }).catch(err => {
        console.error(err);
      });
    }
    if (!certificate.descriptionInIpfs && certificate.description) {
      getTextOnIpfs(certificate.description).then(description => {
        certificate.descriptionInIpfs = description;
        dispatch({
          type: "GET_CERTIFICATES_I_ISSUESED",
          payload: certificates,
        });
      }).catch(err => {
        console.error(err);
      });
    }
  }
}

const getInfoOfCertificatesInUserPage = () => async (dispatch, getState) => {
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
      }).catch(err => {
        console.error(err);
      });
    }
    if (!certificate.titleInIpfs) {
      getTextOnIpfs(certificate.title).then(title => {
        certificate.titleInIpfs = title;
        dispatch({
          type: "GET_CERTIFICATES_IN_USER_PAGE",
          payload: certificates,
        });
      }).catch(err => {
        console.error(err);
      });
    }
    if (!certificate.descriptionInIpfs) {
      getTextOnIpfs(certificate.description).then(description => {
        certificate.descriptionInIpfs = description;
        dispatch({
          type: "GET_CERTIFICATES_IN_USER_PAGE",
          payload: certificates,
        });
      }).catch(err => {
        console.error(err);
      });
    }
  }
}

const getInfoOfCertificatesIIssuedInUserPage = () => async (dispatch, getState) => {
  const state = getState().state;
  const certificates = state.certificatesIIssuedInUserPage;
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
    if (!certificate.titleInIpfs) {
      getTextOnIpfs(certificate.title).then(title => {
        certificate.titleInIpfs = title;
        dispatch({
          type: "GET_CERTIFICATES_I_ISSUESED_IN_USER_PAGE",
          payload: certificates,
        });
      }).catch(err => {
        console.error(err);
      });
    }
    if (!certificate.descriptionInIpfs) {
      getTextOnIpfs(certificate.description).then(description => {
        certificate.descriptionInIpfs = description;
        dispatch({
          type: "GET_CERTIFICATES_I_ISSUESED_IN_USER_PAGE",
          payload: certificates,
        });
      }).catch(err => {
        console.error(err);
      });
    }
  }
}

const logout = () => async (dispatch) => {
  dispatch({
    type: "LOGOUT",
    payload: null,
  });
}

const exportFile = (evt) => async (dispatch, getState) => {
  const client = getClientFromState(getState().state.client);
  const uid = client.uid;
  const json = JSON.stringify({
    uid,
  })
  const blob = new Blob([json], {type: "application/json"});
  const a = evt.target;
  a.download = "account.json";
  a.href = window.URL.createObjectURL(blob);
}

const openExportModal = () => async (dispatch, getState) => {
  dispatch({
    type: "OPEN_EXPORT_MODAL",
    payload: null,
  });
}
const closeExportModal = () => async (dispatch, getState) => {
  dispatch({
    type: "CLOSE_EXPORT_MODAL",
    payload: null,
  });
}
const copyAccount = () => async (dispatch, getState) => {
  const client = getClientFromState(getState().state.client);
  const uid = client.uid;
  copyText(uid);
}

const loginWithGoogle = () => async (dispatch) => {
  const uid = await getGoogleUid();
  const client = CertClient(uid + "1");
  dispatch({
    type: "LOADING",
    payload: null,
  });
  await client.init();
  console.log(client.address); 
  dispatch({
    type: "INITIALIZE_CLIENT",
    payload: client,
  });
}

export {
  getMyProfile,
  getCertificates,
  getCertificatesInUserPage,
  getCertificatesIIssued,
  getCertificatesIIssuedInUserPage,
  issue,
  onChangeCertificateImage,
  onChangeIssueTo,
  onChangeName,
  onChangeIcon,
  onChangeDescription,
  updateUserSetting,
  exportFile,
  onChangeTitle,
  closeModal,
  onCopyId,
  changeTabToIssuer,
  changeTabToMyCertificates,
  fetchProfileInUserPage,
  changeTabInUserPageToIssuer,
  changeTabInUserPageToMyCertificates,
  getInfoOfCertificates,
  getInfoOfCertificatesInUserPage,
  getInfoOfCertificatesIIssued,
  getInfoOfCertificatesIIssuedInUserPage,
  logout,
  loginWithGoogle,
  openExportModal,
  closeExportModal,
  copyAccount,
}
