import { getTextOnIpfs, getImageOnIpfs } from "../image-upload";
async function getCertificates(client, address, update, fail) {
  let certificates;
  try {
    certificates = await client.getCertificates(address);
  } catch(err) {
    fail(err);
    return;
  }
  update(certificates);
  for (const certificate of certificates) {
    if (!certificate.imageUrl) {
      getImageOnIpfs(certificate.ipfs).then(imageUrl => {
        certificate.imageUrl = imageUrl;
        update(certificates);
      }).catch(err => {
        console.error(err);
      });
    }
    if (!certificate.titleInIpfs) {
      getTextOnIpfs(certificate.title).then(title => {
        certificate.titleInIpfs = title;
        update(certificates);
      }).catch(err => {
        console.error(err);
      });
    }
    if (!certificate.byProfile) {
      client.getProfile(certificate.by).then(byProfile => {
        certificate.byProfile = byProfile;
      }).catch(err => {
        console.error(err);
      });
    }
    if (!certificate.toProfile && certificate.to) {
      client.getProfile(certificate.to).then(toProfile => {
        certificate.toProfile = toProfile;
      }).catch(err => {
        console.error(err);
      });
    }
  }
}
async function getCertificatesIIssuesed(client, address, update, fail) {
  let certificates;
  try {
    certificates = await client.getCertificatesIIssuesed(address);
  } catch(err) {
    fail(err);
    return;
  }
  update(certificates);
  for (const certificate of certificates) {
    if (!certificate.imageUrl) {
      getImageOnIpfs(certificate.ipfs).then(imageUrl => {
        certificate.imageUrl = imageUrl;
        update(certificates);
      }).catch(err => {
        console.error(err);
      });
    }
    if (!certificate.titleInIpfs) {
      getTextOnIpfs(certificate.title).then(title => {
        certificate.titleInIpfs = title;
        update(certificates);
      }).catch(err => {
        console.error(err);
      });
    }
    if (!certificate.byProfile) {
      client.getProfile(certificate.by).then(byProfile => {
        certificate.byProfile = byProfile;
      }).catch(err => {
        console.error(err);
      });
    }
    if (!certificate.toProfile && certificate.to) {
      client.getProfile(certificate.to).then(toProfile => {
        certificate.toProfile = toProfile;
      }).catch(err => {
        console.error(err);
      });
    }
  }
}

export {
  getCertificates,
  getCertificatesIIssuesed,
}
