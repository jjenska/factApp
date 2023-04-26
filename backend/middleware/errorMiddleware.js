// Handling all http status errors
const errorHandler = (error, request, response, next) => {
  const statusCode = response.statusCode ? response.statusCode : 500;

  response.status(statusCode);

  response.json({
    message: error.message,
    // to show error lines
    stack: error.stack,
  });
};

module.exports = {
  errorHandler,
};
