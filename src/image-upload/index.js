
import { getTextOnIpfs, getImageOnIpfs, postCertificate, postText } from "./ipfs";
import { fileInputToDataURL, createBlobFromImageDataURI, getHashFromImage } from "./image";

export {
  getTextOnIpfs,
  getImageOnIpfs,
  postText,
  postCertificate,
  fileInputToDataURL, 
  createBlobFromImageDataURI, 
  getHashFromImage,
}
