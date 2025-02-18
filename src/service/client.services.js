import clientRepository from '../repositories/client.repositories.js';

async function createClientService(newClient){    
    const foundClient = await clientRepository.findClientByEmailRepository(newClient.email);
    
    if (foundClient) throw new Error("Client already exists!");     
    
    const client = await clientRepository.createClientRepository({
        ...newClient
    });
    
    if(!client) throw new Error("Error creating User");
    
    return client;    
};

async function findAllClientsService() {
    const clients = await clientRepository.findAllClientRepository();
    return clients;
};

async function findClientByIdService(id){
    const client = await clientRepository.findClientByIdRepository(id);
    if (!client) throw new Error('User not found');
    return client;
};

async function updateClientService(newClient, clientId) {
    const client = await clientRepository.findClientByIdRepository(clientId);
    if (!client) throw new Error('User not found');
    const clientUpdated = await clientRepository.updateClientRepository(clientId, newClient);
    return clientUpdated;
};

async function deleteClientService(clientId) {
    const client = await clientRepository.findClientByIdRepository(clientId);
    if (!client) throw new Error('User not found');
    const {message} = await clientRepository.deleteClientRepository(clientId);
    return message;
}

export default {
    createClientService,
    findAllClientsService,
    findClientByIdService,
    updateClientService,
    deleteClientService
}