import connectionDb from "../config/database.js";


async function postAppointment({user, doctor_id, avaliability_id}){
    await connectionDb.query(`
    INSERT INTO appointments (patient_id, doctor_id, avaliability_id)
    VALUES ($1, $2, $3)
    `, [user, doctor_id, avaliability_id])
}

async function blockAvaliability({avaliability_id}){
    await connectionDb.query(`
    UPDATE avaliabilities SET booked = true
    WHERE id = $1
    `, [avaliability_id])
}

export default {
    postAppointment,
    blockAvaliability
}