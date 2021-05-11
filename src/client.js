import * as Client from "gxcert-iota";
import cryptico from "cryptico";

const clientWithoutAccount = new Client("https://api.lb-0.testnet.chrysalis2.com");
function getKeyPair(uid) {
  const privKey = cryptico.generateRSAKey(uid, 1024);
  const pubKey = cryptico.publicKeyString(privKey);
  return {
    privKey,
    pubKey,
  }
}
function getClientFromState (client) {
  const result = new Client("https://api.lb-0.testnet.chrysalis2.com");
  result.address = client.address;
  result.rsaKeyPair = getKeyPair(client.uid);
  result.profile = client.profile;
  result.cache = client.cache;
  result.uid = client.uid;
  result.seed = client.seed;
  return result;
}

export default function CertClient(uid) {
  return new Client("https://api.lb-0.testnet.chrysalis2.com", uid);
}

export {
  getClientFromState,
  clientWithoutAccount
}

