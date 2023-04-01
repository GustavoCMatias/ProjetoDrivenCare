import errors from "../errors/index.js";
import tokenValidation from "../repositories/auth.repository.js"

export async function validateToken(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    if (!token) throw errors.unauthorizedError();

    try {
        const { rows: [user], rowCount } = await tokenValidation.searchUserByToken( token );
        if (!rowCount) throw errors.unauthorizedError();
        res.locals.user = user;
        next();
    } catch (err) {
        next(err);
    }
}