const faker = require('faker');
const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class UsersService {
  constructor() {
    this.users = [];
    this.users.push({
      id: faker.datatype.uuid(),
      name: 'pavlo',
      password: '1551125933'
    })
  }

  async getAll() {
    return await models.User.findAll({
      include: ['customer'],
    });
  }

  async getOne(id) {
    const user = await models.User.findByPk(id);

    if (!user) {
      throw new boom.notFound('Usuario no encontrado');
    }

    return user;
  }

  async create(data) {
    if (!data) {
     throw new boom.badRequest('Falta la data');
    }

    return models.User.create(data);
  }

  async update(id, changes) {
    const user = await this.getOne(id);

    return await user.update(changes);
  }

  async delete(id) {
    const user = await this.getOne(id);

    await user.destroy();
    return { id };
  }
}

module.exports = UsersService;
