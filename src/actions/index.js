import CertClient from "../client"
import { fileInputToDataURL, createBlobFromImageDataURI, postCertificate } from "../image-upload";
import { getGoogleUid } from "../util";
const getCertificates = () => async (dispatch) => {
  const client = CertClient();
  const certificates = await client.getCertificates();
  dispatch({
    type: "GET_CERTIFICATE",
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
  console.log("issue");
  const state = getState();
  const issueTo = state.issueTo;
  const address = state.certificateImage;
  if (issueTo === null || address === null) {
    dispatch({
      type: "ISSUE",
      payload: null,
      error: new Error("The certificate image or address is not set."),
    });
    return;
  }
  let ipfsHash = null;
  try {
    const imageData = await fileInputToDataURL(state.certificateImage);
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
    await client.issueCertificate(certificate, address);
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
  console.log("onchange image");
  dispatch({
    type: "ON_CHANGE_CERTIFICATE_IMAGE",
    payload: evt.target.files[0],
  });
}

const onChangeIssueTo = (evt) => async (dispatch) => {
  console.log("onchange To");
  console.log(evt.target.value);
  dispatch({
    type: "ON_CHANGE_ISSUE_TO",
    payload: evt.target.value,
  });
}

export {
  getCertificates,
  issue,
  onChangeCertificateImage,
  onChangeIssueTo,
}
