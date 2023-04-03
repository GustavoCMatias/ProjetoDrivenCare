import errors from "../errors/index.js"
import appointmentRepository from "../repositories/appointment.repository.js"

async function postAppointment({user, doctor_id, avaliability_id}){

    if(user === doctor_id) throw errors.badRequest();
    
    await appointmentRepository.postAppointment({user, doctor_id, avaliability_id})
    await appointmentRepository.blockAvaliability({avaliability_id})
}

async function confirm({user, appointmentId}){
    const {rows, rowCount} = await appointmentRepository.checkExistence({appointmentId})
    if(rowCount === 0) throw errors.notFoundError();
    if(rows[0].doctor_id !== user) throw errors.unauthorizedError();
    if(rows[0].confirmed) throw errors.conflictError('Appointment already confirmed')

    await appointmentRepository.confirm({user, appointmentId})
    appointmentRepository.blockAvaliabilityFromAppointment({appointmentId})
}

async function cancel({user, appointmentId, reopen_schedule}){
    const {rows, rowCount} = await appointmentRepository.checkExistence({appointmentId})
    if(rowCount === 0) throw errors.notFoundError();
    if(rows[0].doctor_id !== user) throw errors.unauthorizedError();
    if(rows[0].canceled) throw errors.conflictError('Appointment already canceled')
    
    await appointmentRepository.cancel({user, appointmentId})

    if(reopen_schedule) appointmentRepository.reopen({appointmentId})
}

async function getDoctor({user}){
    const {rows: appointments} = await appointmentRepository.getDoctor(user);
    return appointments
}

async function getPatient({user}){
    const {rows: appointments} = await appointmentRepository.getPatient(user);
    return appointments
}

export default {
    postAppointment,
    confirm,
    cancel,
    getDoctor,
    getPatient
}