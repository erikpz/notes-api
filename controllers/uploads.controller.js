const { response } = require("express");
const { uploadFile: uploadFileFn } = require("../utils/upload-file");

const uploadFile = async (req, res = response, next) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({
        ok: false,
        message: "Not files found",
        data: {},
      });
    }

    const filePath = await uploadFileFn(
      req.files,
      req.userPayload.id,
      "imageProfile"
    );
    res.json({
      ok: true,
      message: "File uploaded",
      data: {
        nameFile: filePath,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  uploadFile,
};
