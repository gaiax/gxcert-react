import * as Client from "gxcert-iota";

let singleton = null;

export default function CertClient(uid) {
  if (singleton === null) {
    singleton = new Client("https://nodes.devnet.iota.org", uid);
  }
  return singleton;
}
