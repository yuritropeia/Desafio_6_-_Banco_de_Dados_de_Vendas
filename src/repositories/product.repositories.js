import db from '../config/database.js';

db.run(`
    CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(255) NOT NULL,
        descrition TEXT,
        price DECIMAL(10,2) NOT NULL
    )
`);

function createProductRepository(newProduct){
    return new Promise((resolve, reject) =>{
        const {name, descrition, price} = newProduct;
        db.run(
            `
                INSERT INTO products (name, descrition, price)
                VALUES (?, ?, ?)
            `,
            [name, descrition, price],
            function (err){
                if(err){
                    reject(err);
                }else{
                    resolve({id: this.lastID, ...newProduct});
                }
            }
        );
    })
};

function findAllProductsRepository(){
    return new Promise((resolve, reject) => {
        db.all(`
            SELECT * FROM products
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

function findProductByIdRepository(productId){
    return new Promise ((resolve, reject) =>{
        db.get(
            `
                SELECT * 
                FROM products
                WHERE id = ?
            `, [productId], 
            (err, row) => {
                if (err){
                    reject(err);
                } else{
                    resolve(row);
                }
            });
    });
};

async function deleteProductRepository(productId){
    return new Promise((resolve, reject)=>{
        db.run(`
            DELETE FROM products
            WHERE id = ?
            `,
            [productId],
            (err) => {
                if(err){
                    reject(err);
                } else{
                    resolve({message: "Product deleted successfully", productId});
                }
            }
        )
    })
};

function updateProductRepository(updatedProduct, productId){
    return new Promise ((resolve, reject) =>{
        const {name, descrition, price} = updatedProduct;
        const fields =['name', 'descrition', 'price'];
        let query = "UPDATE products SET ";
        const values = []

        fields.forEach((field)=>{
            if(updatedProduct[field] !== undefined){
                query += `${field} = ?,`
                values.push(updatedProduct[field]);
            }
        })

        query = query.slice(0, -1);

        query += " WHERE id = ?";

        values.push(productId);

        db.run(query, values, (err) => {
            if(err){
                reject(err);
            }else{
                resolve({id: productId, ...updatedProduct})
            }
        })
    });
};

function searchProductsRepository(search){
    return new Promise ((resolve, reject) =>{
        db.all(
            `
                SELECT * 
                FROM products
                WHERE title LIKE ? OR author LIKE ?
            `, [`%${search}%`, `%${search}%`], 
            (err, rows) => {
                if (err){
                    reject(err);
                } else{
                    resolve(rows);
                }
            }
        )
    })
}

export default {
    createProductRepository,
    findAllProductsRepository,
    findProductByIdRepository,
    updateProductRepository,
    deleteProductRepository,
    searchProductsRepository
}