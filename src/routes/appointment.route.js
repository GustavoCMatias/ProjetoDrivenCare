import { Router } from "express";
import appointmentController from "../controllers/appointment.controller.js";
import { validateSchema } from "../middlewares/schemaValidation.middleware.js";
import { validateToken } from "../middlewares/tokenValidation.middleware.js";
import { AppointmentSchema } from "../schemas/appointment.schema.js";



const appointmentRouter = Router();

appointmentRouter.post('/', validateToken, validateSchema(AppointmentSchema), appointmentController.postAppointment)

export default appointmentRouter;