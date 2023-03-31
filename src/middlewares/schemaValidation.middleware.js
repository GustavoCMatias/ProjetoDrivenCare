import errors from "../errors";

export function validateSchema(schema){
    return (req, res, next) => {
        const {error} = schema.validate(req.body, {abortEarly: false});
        
        if(error){
            throw errors.conflictError();
        }

        next();
    };
}