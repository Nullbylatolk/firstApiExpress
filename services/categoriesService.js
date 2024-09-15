const { faker } = require('@faker-js/faker')

class ServiceCategories {

  //singleton
  static _serviceCategoriesInstance = null

  static getInstance() {
    if (ServiceCategories._serviceCategoriesInstance === null) {
      ServiceCategories._serviceCategoriesInstance = new ServiceCategories()
    }
    return ServiceCategories._serviceCategoriesInstance;
  }

  //------------------------
  constructor() {
    this.categories = [];
    this.generate();
  }

  generate() {
    const limit = 10;

    for (let i = 0; i < limit; i++) {

      const productInCategories = []
      for (let i = 0; i < 3; i++) {
        productInCategories.push(
          faker.commerce.product()
        )
      }

      this.categories.push({
        id: faker.string.uuid(),
        name: faker.commerce.department(),
        products: productInCategories
      })
    }
  }

  async list() {
    return this.categories;
  }

  async findOne(id) {
    const categorie = this.categories.filter((item) => item.id.includes(id))
    if (categorie.length === 0) {
      throw new Error("Categoria no encontrada");
    }
    return categorie
  }

  async create(data) {
    const newCategorie = {
      id: faker.string.uuid(),
      ...data
    }
    this.categories.push(newCategorie)
    return newCategorie
  }

  async update(id, change) {
    const index = this.categories.findIndex(item => item.id === id);
    if (index === -1) throw new Error('Categoria no encontrado');
    const categorie = this.categories[index];
    this.categories[index] = {
      ...categorie,
      ...change
    }
    return this.categories[index]

  }

  async delete(id) {
    const index = this.categories.findIndex(item => item.id === id);
    if (index === -1) throw new Error('Categoria no encontrada');
    this.categories.splice(index, 1)
    return { message: `Categoria Eliminada con exito ${id}` }
  }
}
module.exports = new ServiceCategories()