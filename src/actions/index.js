import CertClient from "../client"
import { getGoogleUid } from "../util";
const getCertificates = () => async (dispatch) => {
  const client = CertClient();
  const certificates = await client.getCertificates();
  dispatch({
    type: "GET_CERTIFICATE",
    payload: certificates,
  });
}
const issue = () => async (dispatch) => {
  const client = CertClient();
  console.log("issue");
  console.log(client);
  dispatch({
    type: "ISSUE",
    payload: null,
  });
}

const onChangeCertificateImage = (evt) => async (dispatch) => {
  console.log("onchange image");
  dispatch({
    type: "ON_CHANGE_CERTIFICATE_IMAGE",
    payload: evt.target.value,
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
