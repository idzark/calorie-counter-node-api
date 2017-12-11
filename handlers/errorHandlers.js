exports.asyncHandler = fn =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(next);
  };

exports.notFound = (req, res, next) => {
  const err = new Error('Not found');
  err.status = 404;
  next(err);
};

exports.devErrors = (err, req, res) => {
  console.log(err.stack);

  res.status(err.status || 500);
  const errorDetails = {
    message: err.message,
    status: err.status,
    stack: err.stack
  };
  res.json(errorDetails);
};

exports.prodErrors = (err, req, res) => {
  res.status(err.status || 500);
  res.json('error', {
    message: err.message,
    error: {}
  });
};
