import * as IpfsHttpClient from "ipfs-http-client";
const ipfs = IpfsHttpClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});
async function postCertificate(blob) {
  const response = await ipfs.add(blob);
  if (response) {
    return response.path;
  }
  throw new Error("couldn't post certificate to IPFS network.");
}

function createImageUrlFromUint8Array(arr) {
  const blob = new Blob([arr], { type: "image/png" });
  const urlCreator = window.URL || window.webkitURL;
  const imageUrl = urlCreator.createObjectURL(blob);
  return imageUrl;
}
var concatBuffer = function (buffer1, buffer2) {
  var tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
  tmp.set(new Uint8Array(buffer1), 0);
  tmp.set(new Uint8Array(buffer2), buffer1.byteLength);
  return tmp.buffer;
};

async function getImageOnIpfs(ipfsHash) {
  const response = await ipfs.get(ipfsHash);
  for await (const data of response) {
    console.log(data);
    let content = new ArrayBuffer(0);
    for await (const chunk of data.content) {
      content = concatBuffer(content, chunk);
    }
    const url = createImageUrlFromUint8Array(content);
    return url;
  }
  return null;
}


export { getImageOnIpfs, postCertificate };
