import { Router } from "express";
import appointmentController from "../controllers/appointment.controller.js";
import { checkDoctor } from "../middlewares/checkDoctor.middleware.js";
import { validateSchema } from "../middlewares/schemaValidation.middleware.js";
import { validateToken } from "../middlewares/tokenValidation.middleware.js";
import { AppointmentSchema, CancelSchema, ConfirmSchema } from "../schemas/appointment.schema.js";



const appointmentRouter = Router();

appointmentRouter.post('/', validateToken, validateSchema(AppointmentSchema), appointmentController.postAppointment)
appointmentRouter.post('/confirm', validateToken, validateSchema(ConfirmSchema), checkDoctor, appointmentController.confirm)
appointmentRouter.post('/cancel', validateToken, validateSchema(CancelSchema), checkDoctor, appointmentController.cancel)


export default appointmentRouter;