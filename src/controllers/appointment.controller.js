import appointmentService from "../services/appointment.service.js";

async function postAppointment(req, res, next){
    const {user} = res.locals;
    const {doctor_id, avaliability_id} = req.body
    try{
        await appointmentService.postAppointment({user: user.id, doctor_id, avaliability_id});
        return res.sendStatus(201);
    } catch (err) {
        next(err);
    }
}

export default {
    postAppointment
}