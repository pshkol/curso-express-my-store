// const faker = require('faker');
const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class CategoriesService {
  // constructor() {
  //   this.categories = [];
  //   this.generate();
  // }

  // generate() {
  //   for (let i = 0; i < 10; i++) {
  //     this.categories.push({
  //       id: faker.datatype.uuid(),
  //       name: faker.commerce.productAdjective(),
  //       products: [],
  //     })
  //   }
  // }

  async getAll() {
    return await models.Category.findAll({
      include: ['products'],
    });
  }

  async getOne(id) {
    const category = await models.Category.findByPk(id, { include: ['products']});

    if (!category) {
      throw new boom.badRequest('Categoria no encontrada');
    }

    return category;
  }

  async create(data) {
    return await models.Category.create(data);
  }

  async update(id, data) {
    const category = await this.getOne(id);
    return await category.update(data);
  }

  async delete(id) {
    const category = await this.getOne(id);
    await category.destroy();
    return { id };
  }

}

module.exports = CategoriesService;
