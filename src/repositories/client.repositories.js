import db from '../config/database.js';

db.run(`
    CREATE TABLE IF NOT EXISTS clients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(20) NOT NULL,
        address TEXT NOT NULL
    )
`)

function createClientRepository(newClient){
    return new Promise((resolve, reject) =>{
        const {name, email, phone, address} = newClient;
        db.run(
            `
                INSERT INTO clients (name, email, phone, address)
                VALUES (?, ?, ?, ?)
            `,
            [name, email, phone, address],
            function (err){
                if(err){
                    reject(err);
                }else{
                    resolve({id: this.lastID, ...newClient});
                }
            }
        );
    })
};

function findClientByEmailRepository(email){
        return new Promise ((resolve, reject) =>{
            db.get(
                `
                    SELECT id, name, email, phone, address 
                    FROM clients
                    WHERE email = ?
                `, [email], 
                (err, row) => {
                    if (err){
                        reject(err);
                    } else{
                        resolve(row);
                    }
                });
        });
};

function findClientByIdRepository(id){
    return new Promise ((resolve, reject) =>{
        db.get(
            `
                SELECT id, name, email, phone, address 
                FROM clients
                WHERE id = ?
            `, [id], 
            (err, row) => {
                if (err){
                    reject(err);
                } else{
                    resolve(row);
                }
            });
    });
};

async function deleteClientRepository(id){
    return new Promise((resolve, reject)=>{
        db.run(`
            DELETE FROM clients
            WHERE id = ?
            `,
            [id],
            (err) => {
                if(err){
                    reject(err);
                } else{
                    resolve({message: "Client deleted successfully", id});
                }
            }
        )
    })
};

function findAllClientRepository(){
    return new Promise((resolve, reject) => {
        db.all(`
            SELECT id, name, email, phone, address FROM clients
        `,
        [],
        (err, rows) => {
            if(err){
                reject(err);
            } else{
                resolve(rows);
            }
        });
    });
};

function updateClientRepository(id, client){
    return new Promise ((resolve, reject) =>{
        const {name, email, phone, address} = client;
        const fields =['name', 'email', 'phone', 'address'];
        let query = "UPDATE clients SET ";
        const values = []

        fields.forEach((field)=>{
            if(client[field] !== undefined){
                query += `${field} = ?,`
                values.push(client[field]);
            }
        })

        query = query.slice(0, -1);

        query += " WHERE id = ?";

        values.push(id);

        db.run(query, values, (err) => {
            if(err){
                reject(err);
            }else{
                resolve({...client, id})
            }
        })
    });
};

export default {
    createClientRepository,
    findClientByEmailRepository,
    findClientByIdRepository,
    findAllClientRepository,
    updateClientRepository,
    deleteClientRepository
}