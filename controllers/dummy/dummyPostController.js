const dummyPostController = (req, res, next) => {
  try {
    return res.status(200).json({
      status: true,
      message: "Dummy POST server working fine, attaching the sent data.",
      data: {
        ...req.body,
      },
    });
  } catch (err) {
    next(err);
  }
};

export default dummyPostController;
