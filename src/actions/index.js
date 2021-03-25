import CertClient from "../client"
async function getCertificates(dispatch) {
  const client = CertClient();
  const certificates = await client.getCertificates();
  dispatch({
    type: "GET_CERTIFICATE",
    certificates,
  });
}
async function issue(dispatch) {
  const client = CertClient();
  console.log("issue");
  console.log(client);
}
export {
  getCertificates,
  issue,
}
