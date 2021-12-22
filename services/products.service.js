// const faker = require('faker');
const boom = require('@hapi/boom');

const {models} = require('../libs/sequelize');

class ProductsService {

  // constructor(){
  //   this.products = [];
  //   this.generate();
  // }

  // async generate() {
  //   const limit = 100;
  //   for (let index = 0; index < limit; index++) {
  //     this.products.push({
  //       id: faker.datatype.uuid(),
  //       name: faker.commerce.productName(),
  //       price: parseInt(faker.commerce.price(), 10),
  //       image: faker.image.imageUrl(),
  //       isBlock: faker.datatype.boolean(),
  //     });
  //   }
  // }

  async create(data) {
    return await models.Product.create(data);
  }

  async findAll(query) {
    const options = {
      include: ['category'],
    }
    const { limit, offset } = query;

    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }

    return await models.Product.findAll(options);
  }

  async findOne(id) {
    const product = await models.Product.findByPk(id, {
      include: ['category'],
    });

    if (!product) {
      throw boom.notFound();
    }

    return product;
  }

  async update(id, changes) {
    const product = await this.findOne(id);
    return await product.update(changes);
  }

  async delete(id) {
    const product = await this.findOne(id);
    await product.destroy();
    return { id };
  }
}

module.exports = ProductsService;
