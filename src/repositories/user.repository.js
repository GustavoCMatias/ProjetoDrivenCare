import connectionDb from "../config/database.js";

async function addSession({token, userId}){
    await connectionDb.query(`
    INSERT INTO sessions (user_id, token) 
    values ($1, $2)
    `, [userId, token])
}
async function findByEmail(email) {
    return await connectionDb.query(`
    SELECT id, password 
    FROM users
    WHERE email = $1
    `, [email]);
}

async function createDoctor({name, email, password, specialty}){
    const {rows} = await connectionDb.query(`
    INSERT INTO users (name, email, password, type) 
    values ($1, $2, $3, 'doctor')
    RETURNING id
    `, [name, email, password])

    await connectionDb.query(`
    INSERT INTO doctor_infos (specialty, user_id) 
    values ($1, $2)
    `, [specialty, rows[0].id])
}

async function createPatient({name, email, password}){
    const {rows} = await connectionDb.query(`
    INSERT INTO users (name, email, password, type) 
    values ($1, $2, $3, 'patient')
    RETURNING id
    `, [name, email, password])
}

async function createAvaliability({avaliabilities, placeHolder}){
    await connectionDb.query(`
    INSERT INTO avaliabilities (doctor_id, time, duration)
    values (${placeHolder})
    `, avaliabilities)
}

export default {
    findByEmail,
    createDoctor,
    createPatient,
    addSession,
    createAvaliability
}