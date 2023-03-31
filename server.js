import express, { json } from "express";
import cors from "cors";
import routes from "./src/routes/index.js";
import "express-async-errors";
import { handleApplicationErrors } from "./src/middlewares/applicationErrors.middleware.js";


const app = express();
app.use(json())
app.use(cors())
app.use(routes)
app.use(handleApplicationErrors)

const port = process.env.PORT || 5000;
app.listen(port, ()=>console.log(`Server running in port: ${port}`))