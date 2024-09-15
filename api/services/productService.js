const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom')
class ProductServices {

  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    const limit = 100
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.url(),
        isBlock: faker.datatype.boolean()
      })
    }
  }

  async create(data) {
    const newProduct = {
      id: faker.string.uuid(),
      ...data
    }
    this.products.push(newProduct);
    return newProduct;
  }

  async find() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products);
      }, 1000);
    })
  }

  async findOne(id) {
    // const name = this.getTotal()
    const product = this.products.find((item) => item.id === id)
    if (product === undefined) throw boom.notFound('Product not found');
    if (product.isBlock) throw boom.conflict('porduct is block');
    return product;
  }

  async update(id, changes) {
    let index = this.products.findIndex((item) => item.id === id)
    if (index === -1) {
      throw boom.notFound('Product not found');
    } else {
      let product = this.products[index]
      this.products[index] = {
        ...product,
        ...changes
      }
      return this.products[index];
    }
  }

  async delete(id) {
    let product = this.products.findIndex((item) => item.id === id)
    if (product === -1) {
      throw product.notFound('Product not found');
    } else {
      this.products.splice(product, 1);
      return { id };
    }
  }
}
module.exports = ProductServices;