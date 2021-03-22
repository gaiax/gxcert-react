import firebase from "./Firebase";
const provider = new firebase.auth.GoogleAuthProvider();

async function getGoogleUid() {
  const result = await firebase.auth().signInWithPopup(provider);
  return result.user.uid;
}

export { getGoogleUid };
