const handleErrors = (err, req, res, next) => {
  return res.status(500).json({
    ok: false,
    message: "Internal server error",
    data: err,
  });
};

module.exports = {
  handleErrors,
};
