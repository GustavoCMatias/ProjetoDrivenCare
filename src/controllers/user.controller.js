import userService from "../services/user.service.js";


async function createDoctor(req, res){
    const {name, email, password, specialty} = req.body;
    try{
        await userService.createDoctor({name, email, password, specialty})
        return res.sendStatus(201);
    } catch(err) {
        return res.status(500).send(err.message)
    }
}

async function createPatient(req, res){
    const {name, email, password} = req.body;
    try{
        await userService.createPatient({name, email, password})
        return res.sendStatus(201);
    } catch(err) {
        return res.status(500).send(err.message)
    }
}

export default {
    createDoctor,
    createPatient
}