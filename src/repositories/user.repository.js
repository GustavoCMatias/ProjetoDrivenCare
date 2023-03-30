import connectionDb from "../config/database.js";


async function findByEmail(email) {
    return await connectionDb.query(`
    SELECT * 
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

async function createPatient({name, email, password, specialty}){
    const {rows} = await connectionDb.query(`
    INSERT INTO users (name, email, password, type) 
    values ($1, $2, $3, 'patient')
    RETURNING id
    `, [name, email, password])
}

export default {
    findByEmail,
    createDoctor,
    createPatient
}