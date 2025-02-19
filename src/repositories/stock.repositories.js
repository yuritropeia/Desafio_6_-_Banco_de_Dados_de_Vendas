import db from '../config/database.js';

db.run(`
    CREATE TABLE IF NOT EXISTS stock (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_id INT UNIQUE NOT NULL,
        quantity INT NOT NULL,
        update_date TEXT DEFAULT (strftime('%d-%m-%Y', 'now')),
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
    )
`);


function createStockRepository(newStock){
    return new Promise((resolve, reject) =>{
        const {product_id, quantity, update_date} = newStock;
        db.run(
            `
                INSERT INTO stock (product_id, quantity, update_date)
                VALUES (?, ?, ?)
            `,
            [product_id, quantity, update_date],
            function (err){
                if(err){
                    reject(err);
                }else{
                    resolve({id: this.lastID, ...newStock});
                }
            }
        );
    })
};

function findAllStockRepository(){
    return new Promise((resolve, reject) => {
        db.all(`
            SELECT * FROM stock
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

function findStockByIdRepository(stockId){
    return new Promise ((resolve, reject) =>{
        db.get(
            `
                SELECT * 
                FROM stock
                WHERE id = ?
            `, [stockId], 
            (err, row) => {
                if (err){
                    reject(err);
                } else{
                    resolve(row);
                }
            });
    });
};

async function deleteStockRepository(stockId){
    return new Promise((resolve, reject)=>{
        db.run(`
            DELETE FROM stock
            WHERE id = ?
            `,
            [stockId],
            (err) => {
                if(err){
                    reject(err);
                } else{
                    resolve({message: "Stock deleted successfully", stockId});
                }
            }
        )
    })
};

function updateStockRepository(updatedStock, stockId){
    return new Promise ((resolve, reject) =>{
        const {product_id, quantity, update_date} = updatedStock;
        const fields =['product_id', 'quantity', 'update_date'];
        let query = "UPDATE stock SET ";
        const values = []

        fields.forEach((field)=>{
            if(updatedStock[field] !== undefined){
                query += `${field} = ?,`
                values.push(updatedStock[field]);
            }
        })

        query = query.slice(0, -1);

        query += " WHERE id = ?";

        values.push(stockId);

        db.run(query, values, (err) => {
            if(err){
                reject(err);
            }else{
                resolve({id: stockId, ...updatedStock})
            }
        })
    });
};

export default {
    createStockRepository,
    findAllStockRepository,
    findStockByIdRepository,
    updateStockRepository,
    deleteStockRepository
}