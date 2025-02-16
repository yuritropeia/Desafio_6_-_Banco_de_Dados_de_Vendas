import userService from '../service/user.services.js';

async function  createUserController(req,res) {
    const newUser = req.body;

    try{
        const token = await userService.createUserService(newUser);
        res.status(201).send({token});
    } catch (err){
        return res.status(400).send(err.message);
    }
};

async function  loginUserController(req,res) {
    const {email, password} = req.body;

    try{
        const token = await userService.loginUserService(email, password);
        res.send({token});
    } catch (err){
        return res.status(400).send(err.message);
    }
};

async function findAllUsersController(req, res) {
    try{
        const users = await userService.findAllUsersService();
        res.send({users});
    }catch(e){
        return res.status(404).send(e.message);
    }
};

async function findUserByIdController(req, res) {
    const {id} = req.params;

    try{
        const user = await userService.findUserByIdService(id);
        res.send({user});
    }catch(e){
        return res.status(404).send(e.message);
    }
};

async function updateUserController(req, res) {
    const {id} = req.params;
    const newUser = req.body;
    
    try{
        const user = await userService.updateUserService(newUser, id);
        res.send({user});        
    }catch(e){
        return res.status(404).send(e.message);
    }
};

async function deleteUserController(req, res) {
    const {id} = req.params;
    
    try{
        const message = await userService.deleteUserService(id);
        res.send({message});        
    }catch(e){
        return res.status(404).send(e.message);
    }
}


export default {
    createUserController,
    findAllUsersController,
    findUserByIdController,
    updateUserController,
    deleteUserController,
    loginUserController
}