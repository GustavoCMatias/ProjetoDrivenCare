import connectionDb from "../config/database.js";


async function postAppointment({user, doctor_id, avaliability_id}){
    await connectionDb.query(`
    INSERT INTO appointments (patient_id, doctor_id, avaliability_id)
    VALUES ($1, $2, $3)
    `, [user, doctor_id, avaliability_id])
}

async function blockAvaliability({avaliability_id}){
    await connectionDb.query(`
    UPDATE avaliabilities 
    SET booked = true
    WHERE id = $1
    `, [avaliability_id])
}

async function blockAvaliabilityFromAppointment({appointmentId}){
    await connectionDb.query(`
    UPDATE avaliabilities 
    SET booked = true
    WHERE id = (SELECT avaliability_id FROM appointments WHERE id = $1)
    `, [appointmentId])
}

async function checkExistence({appointmentId}){
    return await connectionDb.query(`
    SELECT *
    FROM appointments
    WHERE id = $1
    `, [appointmentId])
}
async function cancel({user, appointmentId}){
    await connectionDb.query(`
    UPDATE appointments 
    SET canceled = true, confirmed = false
    WHERE doctor_id = $1 AND id = $2
    RETURNING id
    `, [user, appointmentId])
}

async function confirm({user, appointmentId}){

    await connectionDb.query(`
    UPDATE appointments 
    SET confirmed = true, canceled = false
    WHERE doctor_id = $1 AND id = $2
    RETURNING id
    `, [user, appointmentId])
}

async function reopen({appointmentId}) {
    await connectionDb.query(`
    UPDATE avaliabilities 
    SET booked = false
    WHERE id = (SELECT avaliability_id FROM appointments WHERE id = $1)
    `, [appointmentId])
}

async function getDoctor(user){
    return await connectionDb.query(`
    SELECT a.id, av.time, av.duration, patients.name as patient_name, doctors.name AS doctor_name, di.specialty, a.confirmed, a.canceled
    FROM appointments a
        JOIN avaliabilities av
            ON a.avaliability_id = av.id
        LEFT JOIN users doctors 
            ON doctors.id = a.doctor_id
        LEFT JOIN users patients
            ON patients.id = a.patient_id
        LEFT JOIN doctor_infos di
            ON doctors.id = di.user_id
    WHERE a.doctor_id = $1
    `, [user])
}

async function getPatient(user){
    return await connectionDb.query(`
    SELECT a.id, av.time, av.duration, patients.name as patient_name, doctors.name AS doctor_name, di.specialty, a.confirmed, a.canceled
    FROM appointments a
        JOIN avaliabilities av
            ON a.avaliability_id = av.id
        LEFT JOIN users doctors 
            ON doctors.id = a.doctor_id
        LEFT JOIN users patients
            ON patients.id = a.patient_id
        LEFT JOIN doctor_infos di
            ON doctors.id = di.user_id
    WHERE a.patient_id = $1
    `, [user])
}

export default {
    postAppointment,
    blockAvaliability,
    confirm,
    cancel,
    checkExistence,
    reopen,
    blockAvaliabilityFromAppointment,
    getDoctor,
    getPatient
}