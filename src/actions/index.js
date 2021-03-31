import CertClient from "../client"
import { fileInputToDataURL, createBlobFromImageDataURI, postCertificate, getImageOnIpfs } from "../image-upload";
import { getGoogleUid } from "../util";

const getMyProfile = () => async (dispatch) => {
  const client = CertClient();
  const profile = await client.getProfile(client.address);
  const ipfsHash = profile.icon;
  const icon = await getImageOnIpfs(ipfsHash);
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
  const certificates = await client.getCertificates();
  dispatch({
    type: "GET_CERTIFICATES",
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
  if (issueTo === null || image === null) {
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
  const certificate = client.createCertificateObject(ipfsHash);
  try {
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

const updateUserSetting = () => async (dispatch, getState) => {
  dispatch({
    type: "START_UPDATE_USER_SETTING",
    payload: null,
  });
  const client = CertClient();
  const state = getState().state;
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
    console.log(state.icon);
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

export {
  getMyProfile,
  getCertificates,
  issue,
  onChangeCertificateImage,
  onChangeIssueTo,
  onChangeName,
  onChangeIcon,
  updateUserSetting,
}
