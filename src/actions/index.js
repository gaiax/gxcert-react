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

export {
  getCertificates,
  issue,
}
