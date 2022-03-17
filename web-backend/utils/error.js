function error(res, statusCode, msg) {
    res.status(statusCode).json({
      error: true,
      message: msg,
    });
  }
  
  module.exports = {
    error,
  };
  