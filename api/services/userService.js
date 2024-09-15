const { faker, el } = require('@faker-js/faker');

class UserService {

  static _UserServiceInstance = null;

  static getInstance() {
    if (UserService._UserServiceInstance === null) {
      UserService._UserServiceInstance = new UserService
    }
    return UserService._UserServiceInstance;
  }


  constructor() {
    this.users = [];
    this.generate();
  }

  generate() {
    const limit = 20
    for (let i = 0; i < limit; i++) {
      this.users.push({
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        phone: faker.internet.email(),
        img: faker.image.avatarGitHub()
      })
    }
  }
  //creamos el usuario
  async create(data) {
    const newUser = {
      id: faker.string.uuid(),
      ...data
    }
    this.users.push(newUser)
    return newUser;
  }
  //listamos todos los usuarios
  async list() {
    return this.users;
  }
  //buscamos un usuario
  async findOne(id) {
    const index = this.users.find((item) => item.id === id);
    if (index === undefined) throw new Error('No se encontro el usuario');
    return index;
  }

  async update(id, change) {
    const index = this.users.findIndex((item) => item.id === id)
    if (index === -1) {
      return false
    } else {
      const user = this.users[index];
      this.users[index] = {
        ...user,
        ...change
      }
      return this.users[index];
    }
  }

  async delete(id) {
    const index = this.users.findIndex(item => item.id === id);
    if (index === -1) throw new Error('No se encontro este usuario')
    this.users.splice(index, 1);
    return id;
  }
}
module.exports = new UserService()