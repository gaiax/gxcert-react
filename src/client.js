import * as Client from "gxcert-iota";
import cryptico from "cryptico";

const clientWithoutAccount = new Client("https://chrysalis-nodes.iota.org");
function getKeyPair(uid) {
  const privKey = cryptico.generateRSAKey(uid, 1024);
  const pubKey = cryptico.publicKeyString(privKey);
  return {
    privKey,
    pubKey,
  }
}
function getClientFromState (client) {
  const result = new Client("https://chrysalis-nodes.iota.org");
  result.address = client.address;
  result.rsaKeyPair = getKeyPair(client.uid);
  result.profile = client.profile;
  result.cache = client.cache;
  result.uid = client.uid;
  result.seed = client.seed;
  return result;
}

export default function CertClient(uid) {
  return new Client("https://chrysalis-nodes.iota.org", uid);
}

export {
  getClientFromState,
  clientWithoutAccount
}

