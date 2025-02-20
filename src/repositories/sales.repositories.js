import db from '../config/database.js';

db.run(`
    CREATE TABLE IF NOT EXISTS sales (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_id INT UNIQUE NOT NULL,
        total DECIMAL(10,2) NOT NULL,
        sale_date TEXT DEFAULT (strftime('%d-%m-%Y', 'now')),
        FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
    )
`);


function createSalesRepository(newSales){
    return new Promise((resolve, reject) =>{
        const {order_id, total, sale_date} = newSales;
        db.run(
            `
                INSERT INTO sales (order_id, total, sale_date)
                VALUES (?, ?, ?)
            `,
            [order_id, total, sale_date],
            function (err){
                if(err){
                    reject(err);
                }else{
                    resolve({id: this.lastID, ...newSales});
                }
            }
        );
    })
};

function findAllSalesRepository(){ //melhorar esta amostragem com outras caracter[isticas]
    return new Promise((resolve, reject) => {
        db.all(`
            SELECT sales.id, sales.total, sales.sale_date 
            FROM sales
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

function findSalesByIdRepository(salesId){
    return new Promise ((resolve, reject) =>{
        db.get(
            `
                SELECT * 
                FROM sales
                WHERE id = ?
            `, [salesId], 
            (err, row) => {
                if (err){
                    reject(err);
                } else{
                    resolve(row);
                }
            });
    });
};

async function deleteSalesRepository(salesId){
    return new Promise((resolve, reject)=>{
        db.run(`
            DELETE FROM sales
            WHERE id = ?
            `,
            [salesId],
            (err) => {
                if(err){
                    reject(err);
                } else{
                    resolve({message: "Sales deleted successfully", salesId});
                }
            }
        )
    })
};

function updateSalesRepository(updatedSales, salesId){
    return new Promise ((resolve, reject) =>{
        const {order_id, total, sale_date} = updatedSales;
        const fields =['order_id', 'total', 'sale_date'];
        let query = "UPDATE sales SET ";
        const values = []

        fields.forEach((field)=>{
            if(updatedsales[field] !== undefined){
                query += `${field} = ?,`
                values.push(updatedSales[field]);
            }
        })

        query = query.slice(0, -1);

        query += " WHERE id = ?";

        values.push(salesId);

        db.run(query, values, (err) => {
            if(err){
                reject(err);
            }else{
                resolve({id: salesId, ...updatedSales})
            }
        })
    });
};

export default {
    createSalesRepository,
    findAllSalesRepository,
    findSalesByIdRepository,
    updateSalesRepository,
    deleteSalesRepository
}