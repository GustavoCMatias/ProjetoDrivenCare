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

async function createDoctor({name, email, password, specialty, localization}){
    const {rows} = await connectionDb.query(`
    INSERT INTO users (name, email, password, type) 
    values ($1, $2, $3, 'doctor')
    RETURNING id
    `, [name, email, password])

    await connectionDb.query(`
    INSERT INTO doctor_infos (specialty, localization, user_id) 
    values ($1, $2, $3)
    `, [specialty, localization, rows[0].id])
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

async function getDoctors({localization, specialty, name}){
    return await connectionDb.query(`
    SELECT u.id, u.name, di.specialty, di.localization, 
        array_agg(a.id) AS avaliabilities_id,
        array_agg(a.time) AS time, 
        array_agg(a.duration) AS duration, 
        array_agg(a.booked) AS booked
    FROM users u
    RIGHT JOIN doctor_infos di
        ON di.user_id = u.id
    LEFT JOIN avaliabilities a 
        ON a.doctor_id = u.id
    WHERE ($1::text IS NULL OR u.name = $1) AND ($2::text IS NULL OR di.specialty = $2) AND ($3::text IS NULL OR di.localization = $3)    
    GROUP BY u.name, di.specialty, di.localization, u.id;
    `, [name, specialty, localization])
}

export default {
    findByEmail,
    createDoctor,
    createPatient,
    addSession,
    createAvaliability,
    getDoctors
}