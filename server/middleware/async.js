// create asyncHandler middleware
const asyncHandler = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
// export asyncHandler middleware
module.exports = asyncHandler;