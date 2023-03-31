import userRepository from "../repositories/user.repository.js";
import bcrypt from "bcrypt";
import { v4 as uuidV4 } from "uuid";
import errors from "../errors/index.js";


async function createDoctor({name, email, password, specialty}){
    const {rowCount} = await userRepository.findByEmail(email)
    if (rowCount) throw errors.duplicatedEmailError();

    const hashPassword = await bcrypt.hash(password, 10);
    await userRepository.createDoctor({name, email, password: hashPassword, specialty})
}

async function createPatient({name, email, password}){
    const {rowCount} = await userRepository.findByEmail(email)
    if (rowCount) throw errors.duplicatedEmailError();

    const hashPassword = await bcrypt.hash(password, 10);
    await userRepository.createPatient({name, email, password: hashPassword})
}

async function signin({email, password}){
    const {rowCount, rows: [user]} = await userRepository.findByEmail(email);
    if(!rowCount) throw errors.invalidCredentialsError();

    const correctPassword = bcrypt.compare(password, user.password)
    if(!correctPassword) throw errors.invalidCredentialsError();

    const token = uuidV4();
    await userRepository.addSession({userId: user.id, token})

    return(token)

}

export default {
    createDoctor,
    createPatient,
    signin
}