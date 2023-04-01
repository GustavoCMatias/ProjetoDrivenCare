import connectionDb from "../config/database.js";


async function searchUserByToken(token){
    return await connectionDb.query(`
    SELECT u.id, u.type
    FROM sessions s
    JOIN users u
        ON s.user_id = u.id
    WHERE token = $1;
    `, [token])
}

export default{
    searchUserByToken
}