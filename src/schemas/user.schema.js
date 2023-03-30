import Joi from "joi";

export const doctorSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    specialty: Joi.string().min(5).required(),
    name: Joi.string().min(2).required()
})

export const patientSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().min(2).required()
})