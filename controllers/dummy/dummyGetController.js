const dummyGetController = (req, res, next) => {
  try {
    return res.status(200).json({
      status: true,
      message: "Dummy GET server working fine",
      data: null,
    });
  } catch (err) {
    next(err);
  }
};

export default dummyGetController;
