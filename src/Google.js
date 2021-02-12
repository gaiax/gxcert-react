import firebase from "./Firebase";
import ecc from "eosjs-ecc";
const provider = new firebase.auth.GoogleAuthProvider();

async function getPrivateKeyFromGoogle() {
  let uid;
  try {
    uid = await getGoogleUid();
  } catch (err) {
    console.error(err);
    return;
  }
  const wif = ecc.seedPrivate(uid + ": You are super lucky!!!");
  return wif;
}

async function getGoogleUid() {
  const result = await firebase.auth().signInWithPopup(provider);
  return result.user.uid;
}

export { getPrivateKeyFromGoogle, getGoogleUid };
