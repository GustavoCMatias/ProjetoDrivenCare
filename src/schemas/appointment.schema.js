import Joi from "joi";

export const AppointmentSchema = Joi.object({
    doctor_id: Joi.number().integer().min(0).required(),
    avaliability_id: Joi.number().integer().min(0).required()
})

