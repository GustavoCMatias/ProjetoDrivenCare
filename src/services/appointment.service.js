import errors from "../errors/index.js"
import appointmentRepository from "../repositories/appointment.repository.js"

async function postAppointment({user, doctor_id, avaliability_id}){

    if(user === doctor_id) throw errors.badRequest();
    
    console.log('bla', user, doctor_id, avaliability_id)
    // await appointmentRepository.postAppointment({user, doctor_id, avaliability_id})
    console.log('bla2')
    await appointmentRepository.blockAvaliability({avaliability_id})
}

export default {
    postAppointment
}