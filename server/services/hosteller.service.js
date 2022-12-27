const { validateUser } = require("../helpers/validate");
const { ErrorHandler } = require("../middleware/error");
const bcrypt = require("bcrypt")
const { getHostellerByMailDb, getHostellerByContactDb, createHostellerDb } = require("../db/hosteller.db");
const authService = require("./auth.service");

class HostellerService {
    async signUpHosteller(hosteller, next) {
        try {
            const { name, password, enrollment_number, contact_no, mail, address, admission_date, semester, room_id, warden_id, guardian } = hosteller;


            if (!name || !password || !enrollment_number || !contact_no || !mail || !address || !admission_date || !semester || !room_id || !warden_id || !guardian) {
                return next(new ErrorHandler(401, "all fields required"));
            }

            if (!validateUser(mail, password)) {
                return next(new ErrorHandler(401, "Input validation Error"));
            }

            // Setting derived property
            const gender = hosteller.gender || 'F';
            const expire_date = new Date(admission_date);
            expire_date.setDate(expire_date.getDate() + 365);

            // encrypting password
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);

            const hostellerByMail = await getHostellerByMailDb(mail)
            const hostellerByContact = await getHostellerByContactDb(contact_no)
            const hostellerByEnrollment = await getHostellerByContactDb(enrollment_number)

            if (hostellerByMail) {
                return next(new ErrorHandler(401, "mail already taken"))
            }
            if (hostellerByContact) {
                return next(new ErrorHandler(401, "contact no already taken"))
            }
            if (hostellerByEnrollment) {
                return next(new ErrorHandler(401, "enrollment no already taken"))
            }

            const newHosteller = await createHostellerDb(name, hashedPassword, enrollment_number, contact_no, mail, gender, address, admission_date, expire_date, semester, room_id, warden_id);

            const authToken = await authService.signToken({
                id: newHosteller.id,
                mail: newHosteller.role,
                role: newHosteller.role,
            })

            return {
                authToken,
                newHosteller
            }
        }
        catch (error) {
            return next(new ErrorHandler(error.statusCode, error.message));
        }
    }

    async loginHosteller(mail, password, next) {
        try {
            if (!validateUser(mail, password)) {
                return next(new ErrorHandler(401, "Input validation error"))
            }

            const hosteller = await getHostellerByMailDb(mail);

            if (!hosteller) {
                return next(new ErrorHandler(403, "Email or password are incorrect"))
            }

            const isCorrectPassword = await bcrypt.compare(password, hosteller.password)

            if (!isCorrectPassword) {
                return next(403, "Email or password are incorrect");
            }

            const authToken = await this.signToken({
                id: hosteller.id,
                mail: hosteller.mail,
                role: hosteller.role,
            })

            return {
                authToken,
                hosteller,
            }
        }
        catch (error) {
            return next(new ErrorHandler(error.statusCode, error.message));
        }
    }

}

module.exports = new HostellerService();