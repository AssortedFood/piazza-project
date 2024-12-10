import joi from 'joi'
import joiObjectId from "joi-objectid";
joi.objectId = joiObjectId(joi); // add the objectId method to joi so we can validate likes/dislikes/comments by id without writing our own solution

const registerValidation = (data) => {
    const schemaValidation = joi.object({
        username: joi.string().required().min(3).max(256),
        email: joi.string().required().min(6).max(256).email(),
        password: joi.string().required().min(6).max(1024)
    })
    return schemaValidation.validate(data)
}

const loginValidation = (data) => {
    const schemaValidation = joi.object({
        email: joi.string().required().min(6).max(256).email(),
        password: joi.string().required().min(6).max(1024)
    })
    return schemaValidation.validate(data)
}

const postValidation = (data) => {
    const schemaValidation = joi.object({
        title: joi.string().required().min(1).max(256),
        topic: joi.array().items(joi.string().valid("Politics", "Health", "Sport", "Tech")).required(),
        body: joi.string().required().min(1).max(2048)
    })
    return schemaValidation.validate(data)
}

const topicValidation = (data) => {
    const schemaValidation = joi.object({
        topic: joi.array().items(joi.string().valid("Politics", "Health", "Sport", "Tech")).required(),
    })
    return schemaValidation.validate(data)
}

const idValidation = (data) => {
    const schemaValidation = joi.object({
        id: joi.objectId().required()
    })
    return schemaValidation.validate(data)
}


const commentValidation = (data) => {
    const schemaValidation = joi.object({
        id: joi.objectId().required(),
        body: joi.string().required().min(1).max(512)
    })
    return schemaValidation.validate(data)
}

export { registerValidation, loginValidation, postValidation, topicValidation, idValidation, commentValidation };