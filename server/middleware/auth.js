// create an auth middleware

const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/user');

// protect routes
exports.protect = asyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        // Set token from Bearer token in header
        token = req.headers.authorization.split(' ')[1];
    } else{
        return next(new ErrorResponse('No token provided', 400));
    }
    
    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decoded);
        req.user = await User.findById(decoded.id);
        console.log(req.user);
        next();
    } catch (err) {
        return next(new ErrorResponse('Not authorized to access this route', 401));
    }
}
);
// authorize roles
// exports.authorize = (...roles) => {
//     return (req, res, next) => {
//         if (!roles.includes(req.user.role)) {
//             return next(new ErrorResponse(`User role ${req.user.role} is not authorized to access this route`, 403));
//         }
//         next();
//     }
// }

