const faker = require('faker');
const boom = require('@hapi/boom');

class CategoriesService {
  constructor() {
    this.categories = [];
    this.generate();
  }

  generate() {
    for (let i = 0; i < 10; i++) {
      this.categories.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productAdjective(),
        products: [],
      })
    }
  }

  getAll() {
    return this.categories;
  }

  create(name) {
    const duplicate = this.categories.some(item => item.name === name);

    if (duplicate) {
      throw new boom.badRequest()
    }

    return this.categories.push({
      id: faker.datatype.uuid(),
      name: name,
      products: [],
    })
  }

  update(id, name) {
    const category = this.categories.find(item => item.id === id);

    if (!category) {
      throw new boom.badRequest('categoria no encontrada');
    }

    category.name = name;

    return category;
  }

  delete(id) {
    const categoryIndex = this.categories.findIndex(item => item.id === id);

    if (categoryIndex === -1) {
      throw new boom.badRequest('categoria no encontrada');
    }

    this.categories.splice(categoryIndex, 1);
  }

}

module.exports = CategoriesService;
