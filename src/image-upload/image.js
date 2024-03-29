const crypto = require("crypto");

function getPixelsFromContext(context, width, height) {
  let result = [];
  for (let i = 0; i < height; i++) {
    result.push([]);
    for (let j = 0; j < width; j++) {
      const pixel = context.getImageData(j, i, 1, 1).data;
      result[i].push([pixel[0], pixel[1], pixel[2]]);
    }
  }
  return result;
}

function getPixelsFromImage(fileElement) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    const img = new Image();
    reader.onload = function () {
      img.src = reader.result;
      img.onload = function () {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        context.drawImage(img, 0, 0);
        const pixels = getPixelsFromContext(context, img.width, img.height);
        resolve(pixels);
      };
    };
    reader.readAsDataURL(fileElement.files[0]);
  });
}

async function getHashFromImage(fileElement) {
  const pixels = await getPixelsFromImage(fileElement);
  return makeHashFromPixels(pixels);
}

function makeHashFromPixels(pixels) {
  const text = pixels
    .map((row) => {
      console.log(row);
      return row
        .map((pixel) => {
          return "" + pixel[0] + pixel[1] + pixel[2];
        })
        .join("");
    })
    .join("");
  console.log(text);
  const md5 = crypto.createHash("md5");
  return md5.update(text, "binary").digest("hex");
}

function fileInputToDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        resolve(reader.result);
      },
      false
    );
    reader.readAsDataURL(file);
  });
}

function createBlobFromImageDataURI(uri) {
  const byteString = atob(uri.split(",")[1]);
  const mimeType = uri.match(/(:)([a-z/]+)(;)/)[2];
  for (
    var i = 0, l = byteString.length, content = new Uint8Array(l);
    l > i;
    i++
  ) {
    content[i] = byteString.charCodeAt(i);
  }

  const blob = new Blob([content], {
    type: mimeType,
  });
  return blob;
}

export { fileInputToDataURL, createBlobFromImageDataURI, getHashFromImage };
