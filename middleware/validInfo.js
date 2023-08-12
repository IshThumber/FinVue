const joi = require("joi");

const register = (req, res, next) => {
    const registerSchema = joi
        .object()
        .keys({
            name: joi.string().required(),
            username: joi.string().required(),
            email: joi.string().required(),
            password: joi.string().min(5).max(12).required()
        })
        .unknown(true);

    const { error } = registerSchema.validate(req.body);

    if (error) {
        return res.status(422).json({ isUserAdded: false, message: error });
    }

    next();
};

const login = (req, res, next) => {
    const loginschema = joi
        .object()
        .keys({
            username: joi.string().required(),
            password: joi.string().min(3).max(15).required()
        })
        .unknown(true);
    const { error } = loginschema.validate(req.body);
    if (error) {
        return res.status(422).json({ message: error });
    }
    next();
};
module.exports = { register, login };
