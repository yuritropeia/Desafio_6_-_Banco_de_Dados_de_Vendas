import jwt from 'jsonwebtoken';
import "dotenv/config";
import userServices from '../service/user.services.js';

export async function authMiddleware(req, res, next){
    const tokenHeader = req.headers.authorization;
    if(!tokenHeader){
        return res.status(401).send({message:"The token was not informed!"});
    }

    const partsToken = tokenHeader.split(" ");
    if(partsToken.length !== 2){
        return res.status(401).send({message:"Invalid token!"});
    }
    const [schema, token] = partsToken;

    if(!/^Bearer$/i.test(schema)){
        return res.status(401).send({message:"Malformatted token!"});
    }

    jwt.verify(token, process.env.SECRET_JWT, async (err, decoded) =>{
        if(err){
            return res.status(401).send({message:"Invalid token!", error: err.message});
        }

        const user = await userServices.findUserByIdService(decoded.id);
        if(!user || !user.id){
            return res.status(401).send({message:"Invalid token!"});
        }

        req.userId = user.id;

        return next();
    });

}