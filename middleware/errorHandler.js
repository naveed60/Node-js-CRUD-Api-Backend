const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err); // Delegate to default error handler if headers are already sent
    }

    const statusCode = res.statusCode || 500;
    res.status(statusCode);

    const errorResponse = {
        title: "Error",
        message: err.message,
        stackTrace: err.stack,
    };

    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            errorResponse.title = "Validation failed";
            break;
        case constants.NOT_FOUND:
            errorResponse.title = "Not found";
            break;
        case constants.FORBIDDEN:
            errorResponse.title = "Forbidden";
            break;
        case constants.SERVER_ERROR:
            errorResponse.title = "Server Error";
            break;
        case constants.UNAUTHORIZED:
            errorResponse.title = "Unauthorized";
            break;
    }

    res.json(errorResponse);
};

module.exports = errorHandler;
