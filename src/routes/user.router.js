import {Router} from "express";
import userController from "../controllers/user.controller.js";
import { checkDoctor } from "../middlewares/checkDoctor.middleware.js";
import { validateSchema } from "../middlewares/schemaValidation.middleware.js";
import { validateToken } from "../middlewares/tokenValidation.middleware.js";
import { avaliabilySchema, doctorSchema, patientSchema } from "../schemas/user.schema.js";

const userRouter = Router();

userRouter.post('/signup/doctor', validateSchema(doctorSchema), userController.createDoctor);
userRouter.post('/signup/patient', validateSchema(patientSchema), userController.createPatient);
userRouter.post('/signin', userController.signin);
userRouter.post('/schedule', validateSchema(avaliabilySchema), validateToken, checkDoctor, userController.createAvaliability, (req, res) => res.sendStatus(200));

export default userRouter;