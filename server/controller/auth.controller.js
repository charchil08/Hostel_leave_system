const authService = require("../services/auth.service")
// const catchAsyncErrors = require("../middleware/catchAsyncError")

const createAccountWarden = async (req, res, next) => {
    const warden = { ...req.body };
    const { authToken, newWarden } = await authService.signUp(warden, next)
    res.cookie("auth-token", authToken, {
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "development" ? true : "none",
        secure: process.env.NODE_ENV === "development" ? false : true,
    })
    res.status(201).json({
        token: authToken,
        warden: newWarden
    })
}

module.exports = {
    createAccountWarden,
}