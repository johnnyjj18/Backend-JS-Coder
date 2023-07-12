class ProductManager {
    //Creación del constructor con un arreglo vacío
    constructor() {
      this.products = [];
      this.nextId = 1;
    }
  
    //Método para agregar productos
    addProduct(title, description, price, thumbnail, code, stock) {
      // Validación de campos
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        console.log("Debes llenar todos los campos");
        return;
      }
  
      // Valido que el "code" no se repita
      const existingProduct = this.products.find(product => product.code === code);
      if (existingProduct) {
        console.log(`El producto con el código ${code} ya existe, intente con otro código`);
        return;
      }
  
      // Creación de un nuevo producto con id autoincrementable
      const newProduct = {
        id: this.nextId,
        title,
        description,
        price,
        thumbnail,
        code,
        stock
      };
  
      this.nextId++;
  
      // Agregar el nuevo producto al arreglo de productos
      this.products.push(newProduct);
  
      console.log("Producto agregado exitosamente");
    }
    //Método para listar los productos ya agregados
    getProducts() {
      return this.products;
    }
    
    //Método para buscar un producto por id
    getProductById(id) {
      const product = this.products.find(product => product.id === id);
      if (product) {
        return product;
      } else {
        console.log("Producto no encontrado");
      }
    }
  }
  
  // Ejemplo de uso
  const manager = new ProductManager();
  
  manager.addProduct("City Tour", "Recorrido por diversos puntos importantes de la ciudad", 99.99, "cityTour.jpg", "001", 10);
  manager.addProduct("Campanópolis", "Visita a aldea medieval", 49.99, "campanopolis.jpg", "002", 5);
  manager.addProduct("Tour Estadios","Visita a los estadios de los equipos mas emblemáticos",199.99, "tourEstadios.jpg", "003",100)
  manager.addProduct("Temaikén","Parque con especies protegidas y belleza natural", 149.99, "temaiken.jpg","004",150)
  
  console.log(manager.getProducts());
  
  
  console.log(manager.getProductById(1));
 
  
  console.log(manager.getProductById(5));
  // Resultado: Producto no encontrado