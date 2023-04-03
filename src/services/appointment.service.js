import errors from "../errors/index.js"
import appointmentRepository from "../repositories/appointment.repository.js"

async function postAppointment({user, doctor_id, avaliability_id}){

    if(user === doctor_id) throw errors.badRequest();
    
    await appointmentRepository.postAppointment({user, doctor_id, avaliability_id})
    await appointmentRepository.blockAvaliability({avaliability_id})
}

export default {
    postAppointment
}