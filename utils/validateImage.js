const validateImage = (req, res, next) => {

  if (req.file && !req.file.mimetype.startsWith("image/")) {
    return res.status(400).json({ error: "Only image files are allowed" });
  }

  if (req.file && req.file.size > 2 * 1024 * 1024) {
    return res.status(400).json({ error: "Image size must be under 2MB" });
  }

  next();
};

module.exports = validateImage;
