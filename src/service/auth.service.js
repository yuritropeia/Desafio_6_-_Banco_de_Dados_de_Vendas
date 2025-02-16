import jwt from 'jsonwebtoken';
import "dotenv/config";
import userRepositories from '../repositories/user.repositories.js';
import bcrypt from 'bcrypt';

function generateJWT(id){
    return jwt.sign(
        {id: id}, 
        process.env.SECRET_JWT,
        {expiresIn: 86400}
    );
}

async function loginService(email, password){
    const user = await userRepositories.findUserByEmailRepository(email);

    if(!user) throw new Error("Invalid user");
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid) throw new Error("Invalid user");
    return generateJWT(user.id);
}

export default { generateJWT, loginService }