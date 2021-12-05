const Joi = require('@hapi/joi')

const getMomentValidation = (req, res, next) => {
console.log(req.headers);
    const schema = Joi.object({
        page: Joi.string().required(),
        limit: Joi.string().required()
    })
    const userid = Joi.string().min(24).max(24).required();

    let error = schema.validate(req.query).error
    let error1 = userid.validate(req.headers.userid).error

    if (error || error1) {
        error = error ? error : error1
        return res.status(400).send({ error: error.details[0].message })
    } else {
        next()
    }

}

const createMomentValidation = (req, res, next) => {
    const schema = Joi.object({
        moment: Joi.object().keys({
            userId: Joi.string().min(24).max(24).required(),
            tags: Joi.string(),
            title: Joi.string().required(),
            image: Joi.array().items(Joi.object().keys({path: Joi.string()})).required()
        })

    })
    let error = schema.validate(req.body).error

    if (error) {
        return res.status(400).send({ error: error.details[0].message })
    } else {
        next()
    }

}

const updateMomentValidation = (req, res, next) => {
    const schema = Joi.object({
        momentId: Joi.string().min(24).max(24).required(),
        fieldsToUpdate: Joi.object().keys({
            tags: Joi.array().items(Joi.string()),
            title: Joi.string(),
            image: Joi.string()
        })

    })
    let error = schema.validate(req.body).error

    if (error) {
        return res.status(400).send({ error: error.details[0].message })
    } else {
        next()
    }

}

const deleteMomentValidation = (req, res, next) => {
    const schema = Joi.object({
        momentId: Joi.string().min(24).max(24).required()
    })

    let error = schema.validate(req.body).error

    if (error) {
        return res.status(400).send({ error: error.details[0].message })
    } else {
        next()
    }

}

module.exports = {
    getMomentValidation,
    createMomentValidation,
    updateMomentValidation,
    deleteMomentValidation
}