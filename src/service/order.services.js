import orderRepository from "../repositories/order.repositories.js";

async function createOrderService(newOrder) {
  const createdOrder = await orderRepository.createOrderRepository(newOrder);
  if (!createdOrder) throw new Error("Error creating order");
  return createdOrder;
}

async function findAllOrdersService() {
  const orders = await orderRepository.findAllOrdersRepository();
  return orders;
}

async function findOrderByIdService(orderId) {
  const order = await orderRepository.findOrderByIdRepository(orderId);
  if (!order) throw new Error("Order not found");
  return order;
}

async function deleteOrderService(orderId) {
  const order = await orderRepository.findOrderByIdRepository(orderId);
  if (!order) throw new Error("Order not found");
  const response = await orderRepository.deleteOrderRepository(orderId);
  return response;
}

async function updateOrderService(updatedOrder, orderId) {
    const order = await orderRepository.findOrderByIdRepository(orderId);
    if (!order) throw new Error('Order not found');
    const response = await orderRepository.updateOrderRepository(updatedOrder, orderId);
    return response;
};


export default {
  createOrderService,
  findAllOrdersService,
  findOrderByIdService,
  deleteOrderService,
  updateOrderService
};