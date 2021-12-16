const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class CustomersService {
  async getAll() {
    return await models.Customer.findAll({
      include: ['user']
    });
  }

  async getOne(id) {
    const customer = await models.Customer.findByPk(id);

    if (!customer) {
      throw new boom.notFound('Customer no encontrado');
    }

    return customer;
  }

  async create(data) {
    if (!data) {
      throw new boom.badRequest('Falta la data');
    }
    const newCustomer = await models.Customer.create(data, {
      include: ['user']
    });

    return newCustomer;
  }

  async update(id, changes) {
    const customer = await this.getOne(id);

    return await customer.update(changes);
  }

  async delete(id) {
    const customer = await this.getOne(id);

    await customer.destroy();
    return { id };
  }
}

module.exports = CustomersService;
