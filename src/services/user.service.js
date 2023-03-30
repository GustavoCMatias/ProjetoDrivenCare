import userRepository from "../repositories/user.repository.js";
import bcrypt from "bcrypt";


async function createDoctor({name, email, password, specialty}){
    const {rowCount} = await userRepository.findByEmail(email)
    if (rowCount) throw new Error('User already exists');

    const hashPassword = await bcrypt.hash(password, 10);
    await userRepository.createDoctor({name, email, password: hashPassword, specialty})
}

async function createPatient({name, email, password}){
    const {rowCount} = await userRepository.findByEmail(email)
    if (rowCount) throw new Error('User already exists');

    const hashPassword = await bcrypt.hash(password, 10);
    await userRepository.createPatient({name, email, password: hashPassword})
}

export default {
    createDoctor,
    createPatient
}