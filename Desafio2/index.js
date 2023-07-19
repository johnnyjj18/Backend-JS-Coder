const fs = require('fs');

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
  }

  addProduct(product) {
    const products = this.readProductsFromFile();

    // Asignación de id autoincrementable
    const lastId = products.length > 0 ? products[products.length - 1].id : 0;
    product.id = lastId + 1;

    products.push(product);

    this.writeProductsToFile(products);

    console.log('Producto agregado exitosamente');
  }

  getProducts() {
    return this.readProductsFromFile();
  }

  getProductById(id) {
    const products = this.readProductsFromFile();

    // Busca el producto con el id especificado
    const product = products.find(p => p.id === id);

    if (product) {
      return product;
    } else {
      console.log('Producto no encontrado');
    }
  }

  updateProduct(id, updatedFields) {
    const products = this.readProductsFromFile();

    const product = products.find(p => p.id === id);

    if (product) {
      // Actualización de los campos del producto
      Object.assign(product, updatedFields);

      this.writeProductsToFile(products);

      console.log('Producto actualizado exitosamente');
    } else {
      console.log('Producto no encontrado');
    }
  }

  deleteProduct(id) {
    const products = this.readProductsFromFile();

    const index = products.findIndex(p => p.id === id);

    if (index !== -1) {
      products.splice(index, 1);

      this.writeProductsToFile(products);

      console.log('Producto eliminado exitosamente');
    } else {
      console.log('Producto no encontrado');
    }
  }

  readProductsFromFile() {
    try {
      const data = fs.readFileSync(this.path, 'utf8');

      // Parsear los datos del archivo y devolverlos como un arreglo de productos
      return JSON.parse(data);
    } catch (error) {
        //en caso de error devuelve el arreglo vacío
      return [];
    }
  }

  writeProductsToFile(products) {
    // Convertir el arreglo de productos a formato JSON
    const data = JSON.stringify(products, null, 2);

    fs.writeFileSync(this.path, data, 'utf8');
  }
}

// Uso
const manager = new ProductManager('products.json');

manager.addProduct({
  title: 'Traslado Urbano',
  description: 'Traslado de máximo 20 kms',
  price: 149.99,
  thumbnail: 'trasladourb.jpg',
  code: '005',
  stock: 1000
});

manager.addProduct({
  title: 'Traslado Nacional',
  description: 'Viaje interurbano',
  price: 1399.99,
  thumbnail: 'trasladointer.jpg',
  code: '006',
  stock: 100
});

console.log(manager.getProducts());

console.log(manager.getProductById(1));

manager.updateProduct(1, { stock: 15 });

manager.deleteProduct(2);
