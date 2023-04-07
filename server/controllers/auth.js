// create a auth controller
const userController = {};
// import User model
const User = require('../models/user');
// import ErrorResponse class
const ErrorResponse = require('../utils/errorResponse');
const sendTokenResponse = require('../utils/sendTokenResponse');

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public
userController.register = async (req, res, next) => {
    const { name, email, password, role } = req.body;
    // Create user
    const user = await User.create({
        name,
        email,
        password,
        role
    });

    sendTokenResponse(user, 200, res);
};
// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
userController.login = async (req, res, next) => {
    const { email, password } = req.body;
    // Validate email & password
    if (!email || !password) {
        return next(new ErrorResponse('Please provide an email and password', 400));
    }
    // Check for user
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        return next(new ErrorResponse('Invalid credentials', 401));
    }
    // Check if password matches
    
    const isMatch = await user.matchPassword(password);
    
    if (!isMatch) { 
        return next(new ErrorResponse('Invalid credentials', 401));
    }
    sendTokenResponse(user, 200, res);
}

// @desc    Get current logged in user
// @route   POST /api/v1/auth/me
// @access  Private
userController.getMe = async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        data: user
    });
}
// @desc    Update user details
// @route   PATCH /api/v1/auth/updatedetails
// @access  Private
userController.updateDetails = async (req, res, next) => {
    const fieldsToUpdate = {
        name: req.body.name,
        email: req.body.email
    };
    const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        data: user
    });
}
// @desc    Update password
// @route   PATCH /api/v1/auth/updatepassword
// @access  Private
userController.updatePassword = async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');
    // Check current password
    if (!(await user.matchPassword(req.body.currentPassword))) {
        return next(new ErrorResponse('Password is incorrect', 401));
    }
    user.password = req.body.newPassword;
    await user.save();
    sendTokenResponse(user, 200, res);
}

// create fuction to forget password
// @desc    Forgot password
// @route   POST /api/v1/auth/forgotpassword
// @access  Public
userController.forgotPassword = async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new ErrorResponse('There is no user with that email', 404));
    }

    // Get reset token
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });
    res.status(200).json({
        success: true,
        data: user
    });
}

// @desc    Reset password
// @route   PATCH /api/v1/auth/resetpassword/:resettoken
// @access  Public
userController.resetPassword = async (req, res, next) => {
    // Get hashed token
    const resetPasswordToken = crypto
        .createHash('sha256')
        .update(req.params.resettoken)
        .digest('hex');

    // Find user by token
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
        return next(new ErrorResponse('Invalid token', 400));
    }

    // Set new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    sendTokenResponse(user, 200, res);
}

    
// @desc    Log user out / clear cookie
// @route   GET /api/v1/auth/logout
// @access  Private
userController.logout = async (req, res, next) => {
    // res.cookie('token', 'none', {
    //     expires: new Date(Date.now() + 10 * 1000),
    //     httpOnly: true
    // });
    res.status(200).json({
        success: true,
        data: {}
    });
}

module.exports = userController;

