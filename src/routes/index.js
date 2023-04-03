import {Router} from "express";
import appointmentRouter from "./appointment.route.js";
import userRouter from "./user.router.js";

const routes = Router();

routes.use("/users", userRouter);
routes.use("/appointments", appointmentRouter)

export default routes;