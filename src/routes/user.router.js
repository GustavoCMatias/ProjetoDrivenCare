import {Router} from "express";
import userController from "../controllers/user.controller.js";
import { validateSchema } from "../middlewares/schemaValidation.middleware.js";
import { doctorSchema, patientSchema } from "../schemas/user.schema.js";

const userRouter = Router();

userRouter.post('/signup/doctor', validateSchema(doctorSchema), userController.createDoctor);
userRouter.post('/signup/patient', validateSchema(patientSchema), userController.createPatient);

export default userRouter;