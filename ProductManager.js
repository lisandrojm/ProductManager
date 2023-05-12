////////////////////////////////////////////////////////////////////////////////
/* DESAFÍO ENTREGABLE */
////////////////////////////////////////////////////////////////////////////////

/* Se declara la clase 'ProductManager'. Tiene dos propiedades: 'products',
que es un arreglo vacío que almacenará los productos, y 'productId', que se
inicializa en 1 y se utilizará para generar un identificador autoincrementable 
para cada producto. */
class ProductManager {
  constructor() {
    this.products = [];
    this.productId = 1;
  }

  /* Se define El método 'addProduct' que recibe un objeto 'product' como 
  argumento.
  Verifica si el producto es válido llamando al método 'validateProduct'
  y muestra un mensaje de error si no lo es. Luego, verifica si el código
  del producto ya existe en la lista llamando al método 'isCodeDuplicate'
  y muestra un mensaje de error si es duplicado. */
  addProduct(product) {
    if (!this.validateProduct(product)) {
      console.log('Error: Invalid product');
      return;
    }

    /*Verifica si el código del producto ya existe en la lista llamando al
    método 'isCodeDuplicate' y muestra un mensaje de error si es duplicado.*/
    if (this.isCodeDuplicate(product.code)) {
      console.log('Error: Duplicate product code');
      return;
    }

    /*Si pasa ambas validaciones, crea un nuevo objeto 'newProduct' con todas
    las propiedades del producto y un identificador generado automáticamente..*/
    const newProduct = {
      id: this.productId++,
      title: product.title,
      description: product.description,
      price: product.price,
      thumbnail: product.thumbnail,
      code: product.code,
      stock: product.stock,
    };

    /*Agrega el nuevo producto al arreglo 'products' con el método push */
    this.products.push(newProduct);
  }

  /* El método 'validateProduct' recibe un objeto 'product' como argumento y
  verifica si todas las propiedades requeridas (title, description, price,
  thumbnail, code, stock) están presentes y no son valores falsy (undefined,
  null, '', 0, false). */
  validateProduct(product) {
    return product.title && product.description && product.price && product.thumbnail && product.code && product.stock;
  }

  /* El método 'isCodeDuplicate' recibe un código(code) de producto y verifica si
  existe algún producto en la lista con el mismo código. Utiliza el método
  'some' en el arreglo 'products' para iterar y buscar coincidencias. */
  isCodeDuplicate(code) {
    return this.products.some((product) => product.code === code);
  }

  /* El método 'getProducts' devuelve el arreglo de productos 'products'. */
  getProducts() {
    return this.products;
  }

  /* El método 'getProductById' recibe un ID y busca en el arreglo 'products' un
  producto que coincida con ese ID. Utiliza el método 'find' en el arreglo para
  encontrar el primer producto que cumpla la condición. Si se encuentra un
  producto, se devuelve; de lo contrario, se muestra un mensaje de error y se
  devuelve null. */
  getProductById(id) {
    const product = this.products.find((product) => product.id === id);

    if (product) {
      return product;
    } else {
      console.log('Error: Not found');
      return null;
    }
  }
}

////////////////////////////////////////////////////////////////////////////////
/* PROCESO DE TESTING */

/* Se instancia la clase 'ProductManager” */
const productManager = new ProductManager();

/* Llamado al método 'getProducts' recién creada la instancia y devuelve un arreglo vacío [] */
console.log(productManager.getProducts()); // []

/* Constante 'product1' con los campos que llamará el método 'getProducts' */
const product1 = {
  title: 'producto prueba',
  description: 'Este es un producto prueba',
  price: 200,
  thumbnail: 'Sin imagen',
  code: 'abc123',
  stock: 25,
};

/* Llamado al método 'addProducts' nuevamente */
productManager.addProduct(product1);

/* LLamado al método “getProducts” nuevamente y devuelve el producto recién agregado
con un id generado automáticamente y el cual no se repetirá al agregar otro producto */
console.log(productManager.getProducts()); // [{id: 1, title: 'producto prueba',...}]

/* Se llama al método “addProduct” con los mismos campos de arriba y arroja un error
porque el código está repetido. */
productManager.addProduct(product1); // Error: Duplicate product code

/* LLamado al método getProductById pasándole como argumento '2' para que devuelva
error al no encontrar el producto porque el id de 'product1' es ´1´ */
console.log(productManager.getProductById(2)); // Error: Not found

/* LLamado al método getProductById pasándole como argumento '1' para que devuelva
el producto ya que va a encontrarlo porque el id de 'product1' es '1 */
console.log(productManager.getProductById(1)); // [{id: 1, title: 'producto prueba',...}]
