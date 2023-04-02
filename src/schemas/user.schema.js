import joi from "joi";
import JoiDate from '@joi/date';

const Joi = joi.extend(JoiDate);

export const doctorSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    specialty: Joi.string().min(5).required(),
    name: Joi.string().min(2).required(),
    localization: Joi.string().min(8).required()
})

export const patientSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().min(2).required()
})


const unique = Joi.object().keys({
    hour: Joi.date().format('YYYY-MM-DD HH:mm:ss').required(),
    duration: Joi.number().integer().min(0).required()
  });

export const avaliabilySchema = Joi.array().items(unique);