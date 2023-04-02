import userService from "../services/user.service.js";


async function createDoctor(req, res, next) {
    const { name, email, password, specialty, localization } = req.body;
    try {
        await userService.createDoctor({ name, email, password, specialty,localization })
        return res.sendStatus(201);
    } catch (err) {
        next(err);
    }
}

async function createPatient(req, res, next) {
    const { name, email, password } = req.body;
    try {
        await userService.createPatient({ name, email, password })
        return res.sendStatus(201);
    } catch (err) {
        next(err);
    }
}

async function signin(req, res, next) {
    const { email, password } = req.body;

    try {
        const token = await userService.signin({ email, password });
        return res.status(200).send({ token })
    } catch (err) {
        next(err);
    }
}

async function createAvaliability(req, res, next) {
    const { user } = res.locals;
    try {
        await userService.createAvaliability({data: req.body, user});
        return res.sendStatus(201);
    } catch (err) {
        next(err);
    }
}

async function getDoctors(req, res, next){
    const {localization, specialty, name} = req.query
    try{
        const doctors = await userService.getDoctors({localization, specialty, name});
        return res.status(200).send({doctors});
    } catch (err) {
        next(err);
    }
}

export default {
    createDoctor,
    createPatient,
    signin,
    createAvaliability,
    getDoctors
}