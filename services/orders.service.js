const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class OrderService {
  async getAll() {
    return await models.Order.findAll({
      include: ['customer'],
    });
  }

  async getOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: ['user'],
        },
        'items',
      ],
    })

    if (!order) {
      throw new boom.notFound('Order no encontrada');
    }

    return order;
  }

  async create(data) {
    return await models.Order.create(data);
  }

  async update(id, changes) {
    const order = await this.getOne(id);
    return await order.update(changes);
  }

  async delete(id) {
    const order = await this.getOne(id);
    await order.destroy();
    return { id };
  }

  async createOrderProduct(data) {
    return await models.OrderProduct.create(data);
  }
}

module.exports = OrderService;
