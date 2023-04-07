
// create sendTokenResponse function
const sendTokenResponse = (user, statusCode, res) => {
    // Create token
    const token = user.getSignedJwtToken();
    // Create cookie options
    // const options = {
    //     expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    //     httpOnly: true
    // };
    // Check if production
    // if (process.env.NODE_ENV === 'production') {
    //     options.secure = true;
    // }
    // Send response
    // res.status(statusCode).cookie('token', token, options).json({
    //     success: true,
    //     token
    // });
    // console.log('token', token);
    res.status(statusCode).json({
        success: true,
        token,
        user
    });

}
// Export sendTokenResponse function
module.exports = sendTokenResponse;
