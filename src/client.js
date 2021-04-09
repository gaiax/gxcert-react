import * as Client from "gxcert-iota";

const clientWithoutAccount = new Client("https://nodes.devnet.iota.org");

export default function CertClient(uid) {
  return new Client("https://nodes.devnet.iota.org", uid);
}

export {
  clientWithoutAccount
}

