// create errorResponse class
class ErrorResponse extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}
// export errorResponse class
module.exports = ErrorResponse;