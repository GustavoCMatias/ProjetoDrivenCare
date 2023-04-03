import appointmentService from "../services/appointment.service.js";

async function postAppointment(req, res, next) {
    const { user } = res.locals;
    const { doctor_id, avaliability_id } = req.body;
    try {
        await appointmentService.postAppointment({ user: user.id, doctor_id, avaliability_id });
        return res.sendStatus(201);
    } catch (err) {
        next(err);
    }
}

async function confirm(req, res, next) {
    const { appointmentId } = req.body;
    const { user } = res.locals;

    try {
        await appointmentService.confirm({user: user.id, appointmentId});
        return res.sendStatus(201);
    } catch (err) {
        next(err);
    }
}

async function cancel(req, res, next) {
    const { appointmentId, reopen_schedule } = req.body;
    const { user } = res.locals;

    try {
        await appointmentService.cancel({user: user.id, appointmentId, reopen_schedule});
        return res.sendStatus(201);
    } catch (err) {
        next(err);
    }
}

export default {
    postAppointment,
    cancel,
    confirm
}