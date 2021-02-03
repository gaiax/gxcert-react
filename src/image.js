
function fileInputToDataURL(element) {
  return new Promise((resolve, reject) => {
    const file = element.files[0];
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      resolve(reader.result);
    }, false);
    if (file) {
      reader.readAsDataURL(file);
      return;
    }
    reject();
  });
}

function createBlobFromImageDataURI(uri) {
  const byteString = atob(uri.split(",")[1]);
  const mimeType = uri.match( /(:)([a-z\/]+)(;)/ )[2];
  for( var i=0, l=byteString.length, content=new Uint8Array(l); l>i; i++ ) {
    content[i] = byteString.charCodeAt( i ) ;
  }

  const blob = new Blob([ content ], {
    type: mimeType,
  });
  return blob;
}

function openFile(element) {
  return new Promise((resolve, reject) => {
    const file = element.files[0];
    const reader = new FileReader();
    reader.addEventListener("load", function() {
      resolve(reader.result);
    });
    if (file) {
      reader.readAsArrayBuffer(file);
      return;
    }
    reject();
  });
}

export {
  fileInputToDataURL,
  createBlobFromImageDataURI,
}
