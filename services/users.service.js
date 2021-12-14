const faker = require('faker');
const boom = require('@hapi/boom');

class UsersService {
  constructor() {
    this.users = [];
    this.users.push({
      id: faker.datatype.uuid(),
      name: 'pavlo',
      password: '1551125933'
    })
  }

  getAll() {
    return this.users;
  }

  getOne(id) {
    const user = this.users.find(item => item.id === id);

    if (!user) {
      throw new boom.badRequest('Usuario no encontrado');
    }

    return user;
  }

  create(name, password) {
    if (!name || !password) {
     throw new boom.badRequest('Falta el nombre o la contrasena');
    }

    this.users.push({
      id: faker.datatype.uuid(),
      name: name,
      password: password,
    })
  }

  update(id, data) {
    let user = this.users.find(item => item.id === id);

    if (!user) {
      throw new boom.badRequest('Usuario no encontrado');
    }

    user = {
      ...user,
      ...data
    }

    return user;
  }

  delete(id) {
    let userIndex = this.users.findIndex(item => item.id === id);

    if (userIndex === -1) {
      throw new boom.badRequest('Usuario no encotrado');
    }

    this.users.splice(userIndex, 1);
  }
}

module.exports = UsersService;
