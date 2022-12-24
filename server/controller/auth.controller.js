const createAccount = async (req, res) => {
    return res.status(200).json({
        message: "Route worked"
    })
}

module.exports = {
    createAccount,
}