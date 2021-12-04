const Joi = require('@hapi/joi')

const signupValidation = (req, res, next) => {

    const schema = Joi.object({
        user: Joi.object().keys({
            email: Joi.string().required().email(),
            password: Joi.string().min(8).required(),
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            mobile: Joi.string().min(10),
            city: Joi.string()
        })

    })
    const error = schema.validate(req.body).error
    if (error) {
        return res.status(400).send({ message: error.details[0].message })
    } else {
        next()
    }

}

const signinValidation = (req, res, next) => {
    const schema = Joi.object({
        credentials: Joi.object().keys({
            email: Joi.string().required().email(),
            password: Joi.string().min(8).required()
        })

    })
    let error = schema.validate(req.body).error

    if (error) {
        return res.status(400).send({ message: error.details[0].message })
    } else {
        next()
    }

}

module.exports = {
    signupValidation,
    signinValidation
}