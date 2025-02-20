import db from "../config/database.js";

db.run(`CREATE TABLE IF NOT EXISTS orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  clientId INT NOT NULL,
  productId INT NOT NULL,
  quantity INT NOT NULL,
  order_date TEXT DEFAULT (strftime('%d-%m-%Y', 'now')),
  status TEXT NOT NULL CHECK(status IN ('pending', 'delivered', 'cancelled')),
  FOREIGN KEY (clientId) REFERENCES clients(id),
  FOREIGN KEY (productId) REFERENCES products(id)
)`);

function createOrderRepository(newOrder) {
  return new Promise((resolve, reject) => {
    const {clientId, productId, quantity, order_date, status} = newOrder;
    db.run(
      `INSERT INTO orders (clientId, productId, quantity, order_date, status) 
      VALUES (?, ?, ?, ?, ?)`,
      [clientId, productId, quantity, order_date, status],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, ...newOrder });
        }
      }
    );
  });
}

function findAllOrdersRepository() {
  return new Promise((resolve, reject) => {
    db.all(`
      SELECT orders.id, clients.name as client, products.name as product, orders.quantity, orders.order_date, orders.status
      FROM orders
      JOIN clients ON orders.clientId = clients.id
      JOIN products ON orders.productId = products.id
      `,
      [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

function findOrderByIdRepository(orderId) {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM orders WHERE id = ?`, [orderId], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

function updateOrderRepository(updatedOrder, orderId){
    return new Promise ((resolve, reject) =>{
        const {status} = updatedOrder;
        const fields =['status'];
        let query = "UPDATE orders SET ";
        const values = []

        fields.forEach((field)=>{
            if(updatedOrder[field] !== undefined){
                query += `${field} = ?,`
                values.push(updatedOrder[field]);
            }
        })

        query = query.slice(0, -1);

        query += " WHERE id = ?";

        values.push(orderId);

        db.run(query, values, (err) => {
            if(err){
                reject(err);
            }else{
                resolve({id: orderId, ...updatedOrder})
            }
        })
    });
};

function deleteOrderRepository(orderId) {
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM orders WHERE id = ?`, [orderId], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ message: "Order deleted successfully", orderId });
      }
    });
  });
}

export default {
  createOrderRepository,
  findAllOrdersRepository,
  findOrderByIdRepository,
  deleteOrderRepository,
  updateOrderRepository
};