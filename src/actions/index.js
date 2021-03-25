import CertClient from "../client"
import { getGoogleUid } from "../util";
async function getCertificates(dispatch) {
  const client = CertClient();
  const certificates = await client.getCertificates();
  dispatch({
    type: "GET_CERTIFICATE",
    payload: certificates,
  });
}
async function issue(dispatch) {
  const client = CertClient();
  console.log("issue");
  console.log(client);
  dispatch({
    type: "ISSUE",
    payload: null,
  });
}

async function login(dispatch) {
  const uid = getGoogleUid();
  dispatch({
    type: "LOGIN",
    payload: uid,
  });
}
export {
  getCertificates,
  issue,
}
