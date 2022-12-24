const { validateUser } = require("../helpers/validate");
const { ErrorHandler } = require("../middleware/error");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const { getWardenByMailDb, getWardenByContactNoDb, createWardenDb } = require("../db/warden.db");

class AuthService {
    async signUp(warden, next) {
        try {
            const { name, contact_no, mail, password } = warden;
            if (!name || !contact_no || !mail || !password) {
                next(new ErrorHandler(401, "all fields required"));
            }

            if (validateUser(mail, password)) {

                const salt = await bcrypt.genSalt();
                const hashedPassword = await bcrypt.hash(password, salt);

                const wardenByMail = await getWardenByMailDb(mail)
                const wardenByContactNo = await getWardenByContactNoDb(contact_no)

                if (wardenByMail) {
                    return next(new ErrorHandler(401, "mail already taken"))
                }

                if (wardenByContactNo) {
                    return next(new ErrorHandler(401, "contact no already taken"))
                }

                const newWarden = await createWardenDb({
                    ...warden,
                    password: hashedPassword
                })

                const authToken = await this.signToken({
                    id: newWarden.id,
                    mail: newWarden.mail
                })

                return {
                    authToken: authToken,
                    newWarden
                }

            }
            else {
                return next(new ErrorHandler(401, "Input validation error"))
            }
        }
        catch (error) {
            return next(new ErrorHandler(error.statusCode, error.message));
        }
    }

    async signToken(data) {
        try {
            return jwt.sign(data, process.env.SECRET, { expiresIn: process.env.SECRET_TIME })
        }
        catch (error) {
            return next(new ErrorHandler(500, "An error occured"))
        }
    }
}

module.exports = new AuthService();