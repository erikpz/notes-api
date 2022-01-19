const path = require("path");
const exts = ["jpeg", "jpg", "png", "svg", "gif"];

const uploadFile = (
  files,
  fileName,
  folderName = "",
  validExtentions = exts
) => {
  return new Promise((resolve, reject) => {
    const { file } = files;
    const fileNameSplitted = file.name.split(".");
    const extention = fileNameSplitted[fileNameSplitted.length - 1];

    if (!validExtentions.includes(extention)) {
      reject("Extention not valid");
    }

    const nameTemp = fileName + "." + extention;

    const uploadPath = path.join(
      __dirname,
      "../uploads/",
      folderName,
      nameTemp
    );
    file.mv(uploadPath, (err) => {
      if (err) {
        console.log(err);
        reject(err);
      }

      resolve(nameTemp);
    });
  });
};

module.exports = {
  uploadFile,
};
