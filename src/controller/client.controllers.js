import clientService from '../service/client.services.js';

async function  createClientController(req,res) {
    const newClient = req.body;

    try{
        const token = await clientService.createClientService(newClient);
        res.status(201).send({token});
    } catch (err){
        return res.status(400).send(err.message);
    }
};

async function findAllClientsController(req, res) {
    try{
        const clients = await clientService.findAllClientsService();
        res.send({clients});
    }catch(e){
        return res.status(404).send(e.message);
    }
};

async function findClientByIdController(req, res) {
    const {id} = req.params;

    try{
        const client = await clientService.findClientByIdService(id);
        res.send({client});
    }catch(e){
        return res.status(404).send(e.message);
    }
};

async function updateClientController(req, res) {
    const {id} = req.params;
    const newClient = req.body;
    
    try{
        const client = await clientService.updateClientService(newClient, id);
        res.send({client});        
    }catch(e){
        return res.status(404).send(e.message);
    }
};

async function deleteClientController(req, res) {
    const {id} = req.params;
    
    try{
        const message = await clientService.deleteClientService(id);
        res.send({message});        
    }catch(e){
        return res.status(404).send(e.message);
    }
}


export default {
    createClientController,
    findAllClientsController,
    findClientByIdController,
    updateClientController,
    deleteClientController
}