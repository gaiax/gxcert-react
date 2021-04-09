import * as Client from "gxcert-iota";


export default function CertClient(uid) {
  return new Client("https://nodes.devnet.iota.org", uid);
}
