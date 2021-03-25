import CertClient from "../client"
export default {
  getCertificates: async (dispatch) => {
    const client = CertClient();
    const certificates = await client.getCertificates();
    dispatch({
      type: "GET_CERTIFICATE",
      certificates,
    });
  }
}
