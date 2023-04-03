import Joi from "joi";

export const AppointmentSchema = Joi.object({
    doctor_id: Joi.number().integer().min(0).required(),
    avaliability_id: Joi.number().integer().min(0).required()
})

export const ConfirmSchema = Joi.object({
    appointmentId: Joi.number().integer().min(0).required()
})

export const CancelSchema = Joi.object({
    appointmentId: Joi.number().integer().min(0).required(),
    reopen_schedule: Joi.boolean().required()
})

