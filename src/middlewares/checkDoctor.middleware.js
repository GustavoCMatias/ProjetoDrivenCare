import errors from "../errors/index.js";

export async function checkDoctor(req, res, next){
    const {user} = res.locals;
    try{
        if(user.type === 'patient') throw errors.acessDeniedError();
    }catch(err){
        next(err);
    }
    
    next();
}