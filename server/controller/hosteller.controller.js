const hostellerService = require("../services/hosteller.service");

const createAccountHosteller = async (req, res, next) => {
    const resp = await hostellerService.signUpHosteller(req.body, next)

    if (resp === undefined) {
        return;
    }
    const { authToken, newHosteller } = await resp;
    res.cookie("authToken", authToken, {
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "development" ? true : "none",
        secure: process.env.NODE_ENV === "development" ? false : true,
    })
    res.status(201).json({
        token: authToken,
        hosteller: newHosteller,
    })
}

const loginHosteller = async (req, res, next) => {
    const { mail, password } = await req.body;
    const resp = await hostellerService.loginHosteller(mail, password, next);

    if (resp === undefined) {
        return;
    }

    const { authToken, hosteller } = await resp;

    res.cookie("authToken", authToken, {
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "development" ? true : "none",
        secure: process.env.NODE_ENV === "development" ? false : true,
    })
    res.status(201).json({
        token: authToken,
        hosteller,
    })
}

module.exports = {
    createAccountHosteller,
    loginHosteller,
}