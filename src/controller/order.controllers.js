import orderService from "../service/order.services.js";

async function createOrderController(req, res) {
  const newOrder = req.body;

  try {
    const createdOrder = await orderService.createOrderService(newOrder);
    res.status(201).send(createdOrder);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function findAllOrdersController(req, res) {
  try {
    const orders = await orderService.findAllOrdersService();
    res.send(orders);
  } catch (error) {
    res.status(404).send(error.message);
  }
}

async function findOrderByIdController(req, res) {
    const orderId = req.params.id;
    try {
    const order = await orderService.findOrderByIdService(orderId);
    res.send(order);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function deleteOrderController(req, res) {
    const orderId = req.params.id;
    try {
    const response = await orderService.deleteOrderService(orderId);
    res.send(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function updateOrderController(req, res) {
    const orderId = req.params.id;
    const updatedOrder = req.body;
    
    try{
        const order = await orderService.updateOrderService(updatedOrder, orderId);
        res.send({order});        
    }catch(e){
        return res.status(404).send(e.message);
    }
};

export default {
  createOrderController,
  findAllOrdersController,
  findOrderByIdController,
  deleteOrderController,
  updateOrderController
};