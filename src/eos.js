import * as image from "./image";
import * as ipfs from "./ipfs";
import { Api, JsonRpc } from "eosjs";
import { JsSignatureProvider } from "eosjs/dist/eosjs-jssig";
import ecc from "eosjs-ecc";

const rpcHost = "http://localhost:8888";
const rpc = new JsonRpc(rpcHost);

class CertClient {
  constructor(privateKey, rpcHost) {
    this.defaultPrivateKey = privateKey;
    const signatureProvider = new JsSignatureProvider([this.defaultPrivateKey]);
    this.signatureProvider = signatureProvider;
    this.rpc = rpc;
    this.api = new Api({
      rpc,
      signatureProvider,
      textDecoder: new TextDecoder(),
      textEncoder: new TextEncoder(),
    });
  }

  async createAccount(name) {
    const publicKey = ecc.privateToPublic(this.defaultPrivateKey);
    console.log(publicKey);
    const result = await this.api.transact(
      {
        actions: [
          {
            account: "eosio",
            name: "newaccount",
            authorization: [
              {
                actor: "eosio",
                permission: "active",
              },
            ],
            data: {
              creator: "eosio",
              name: name,
              owner: {
                threshold: 1,
                keys: [
                  {
                    key: publicKey,
                    weight: 1,
                  },
                ],
                accounts: [],
                waits: [],
              },
              active: {
                threshold: 1,
                keys: [
                  {
                    key: publicKey,
                    weight: 1,
                  },
                ],
                accounts: [],
                waits: [],
              },
            },
          },
        ],
      },
      {
        blocksBehind: 3,
        expireSeconds: 30,
      }
    );
    console.log(result);
  }

  async verifyCertificate(name, key) {
    try {
      await this.api.transact(
        {
          actions: [
            {
              account: "cert",
              name: "verify",
              authorization: [
                {
                  actor: name,
                  permission: "active",
                },
              ],
              data: {
                me: name,
                key: key,
              },
            },
          ],
        },
        {
          blocksBehind: 3,
          expireSeconds: 30,
        }
      );
    } catch (err) {
      console.error(err);
      return false;
    }
    return true;
  }

  async createCertificate(fileElement, issueser, receiver) {
    const imageData = await image.fileInputToDataURL(fileElement);
    const blob = image.createBlobFromImageDataURI(imageData);
    const hash = await ipfs.postCertificate(blob);
    const result = await this.api.transact(
      {
        actions: [
          {
            account: "cert",
            name: "create",
            authorization: [
              {
                actor: issueser,
                permission: "active",
              },
            ],
            data: {
              issueser,
              receiver,
              ipfs_hash: hash,
              created_at: parseInt(new Date().getTime() / 1000),
            },
          },
        ],
      },
      {
        blocksBehind: 3,
        expireSeconds: 30,
      }
    );
    console.log(result);
  }
  async _createCertificate() {
    const fileElement = document.getElementById("cert-image");
    const issueser = getValue("issueser");
    const receiver = getValue("receiver");
    await this.createCertificate(fileElement, issueser, receiver);
  }
}

async function getCertificates(holder) {
  const response = await rpc.get_table_rows({
    json: true,
    code: "cert",
    scope: holder,
    table: "certificates",
    limit: 100,
    reverse: false,
    show_payer: false,
  });
  let rows = response.rows.filter(function (row) {
    return row.receiver === holder;
  });
  rows = rows.map(function (row) {
    return {
      issueser: row.issueser,
      receiver: row.receiver,
      ipfs_hash: row.ipfs_hash,
      created_at: new Date(row.created_at * 1000),
    };
  });
  console.log(rows);
  return rows;
}

async function getCertificate(holder, key) {
  const certificates = await getCertificates(holder);
  console.log(certificates);
  const filtered = certificates.filter((certificate) => {
    return certificate.key === key;
  });
  if (filtered.length === 0) {
    throw new Error("certificate not found.");
  }
  return filtered[0];
}

function getValue(id) {
  return document.getElementById(id).value;
}

export { CertClient, getCertificates, getCertificate };
