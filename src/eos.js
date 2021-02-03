
import React from "react";
import ReactDOM from "react-dom";
import * as components from "./components";
import * as image from "./image";
import * as ipfs from "./ipfs";
const EOS = window.EOS;
const defaultPrivateKey = "5KJaizMxUXizqzEi4YyHFtM1P3ppNJxFcez3kTg6uADGitM5vXf";
const signatureProvider = new EOS.JsSignatureProvider([defaultPrivateKey]);
const rpc = new EOS.JsonRpc("http://localhost:8888");
const api = new EOS.Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });

async function getMyCertificates(holder) {
  const response = await rpc.get_table_rows({
    json: true,
    code: "cert",
    scope: holder,
    table: "certificates",
    limit: 100,
    reverse: false,
    show_payer: false,
  });
  const rows = response.rows.filter(function(row) {
    return row.receiver === holder;
  });
  console.log(rows);
  return rows;
}

async function showCertificates(holder) {
  const rows = await getMyCertificates(holder);
  ReactDOM.render(<components.CertificateComponents certificates={rows} />, document.getElementById("result"));
}

async function createCertificate(fileElement, issueser, receiver) {
  const imageData = await image.fileInputToDataURL(fileElement);
  const blob = image.createBlobFromImageDataURI(imageData);
  const hash = await ipfs.postCertificate(blob);
  try {
    const result = await api.transact({
      actions: [{
        account: "cert",
        name: "create",
        authorization: [{
          actor: issueser,
          permission: "active",
        }],
        data: {
          issueser,
          receiver,
          ipfs_hash: hash,
          expired: false,
        }
      }]
    }, {
      blocksBehind: 3,
      expireSeconds: 30,
    });
    console.log(result);
  } catch(err) {
    throw err;
  }
}

async function _createCertificate() {
  const fileElement = document.getElementById("cert-image");
  const issueser = getValue("issueser");
  const receiver = getValue("receiver");
  await createCertificate(fileElement, issueser, receiver);
}
function getValue(id) {
  return document.getElementById(id).value;
}

export {
  _createCertificate,
  createCertificate,
  getMyCertificates,
  showCertificates,
}
