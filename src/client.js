import * as Client from "gxcert-iota";

const clientWithoutAccount = new Client("https://nodes.devnet.iota.org");
function getClientFromState (client) {
  const result = new Client("https://nodes.devnet.iota.org");
  result.address = client.address;
  result.rsaKeyPair = client.rsaKeyPair;
  result.profile = client.profile;
  result.cache = client.cache;
  result.uid = client.uid;
  result.seed = client.seed;
  return result;
}

export default function CertClient(uid) {
  return new Client("https://nodes.devnet.iota.org", uid);
}

export {
  getClientFromState,
  clientWithoutAccount
}

