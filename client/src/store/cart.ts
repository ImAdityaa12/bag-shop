import { defineStore } from "pinia";
import { ref } from "vue";

interface ProductImage {
  data: Buffer;
  type: "Buffer";
}

interface Product {
  bgColor: string;
  discount: number;
  image: ProductImage;
  name: string;
  panelColor: string;
  price: number;
  textColor: string;
  _id: string;
  __v: number;
  quantity?: number;
}

export const useProductStore = defineStore("products", () => {
  const products = ref<Product[]>([]);
  // Actions
  function addProduct(product: Product) {
    const existingProduct = products.value.find((p) => p._id === product._id);
    if (existingProduct) {
      if (existingProduct.quantity === undefined) {
        existingProduct.quantity = 2;
        return;
      } else {
        existingProduct.quantity = existingProduct.quantity + 1;
        return;
      }
    }
    products.value.push(product);
    localStorage.setItem("products", JSON.stringify(products.value));
  }
  function increaseQuantity(productId: string) {
    const product = products.value.find((p) => p._id === productId);
    if (product) {
      product.quantity && product.quantity > 0
        ? product.quantity++
        : (product.quantity = 2);
    }
  }
  function decreaseQuantity(productId: string) {
    const product = products.value.find((p) => p._id === productId);
    if (product) {
      product.quantity && product.quantity > 1
        ? product.quantity--
        : removeProduct(productId);
    }
  }
  function removeProduct(productId: string) {
    const index = products.value.findIndex((p) => p._id === productId);
    if (index !== -1) {
      products.value.splice(index, 1);
    }
  }

  function updateProduct(productId: string, updates: Partial<Product>) {
    const product = products.value.find((p) => p._id === productId);
    if (product) {
      Object.assign(product, updates);
      localStorage.setItem("products", JSON.stringify(products.value));
    }
  }

  function setProducts(newProducts: Product[]) {
    products.value = newProducts;
    localStorage.setItem("products", JSON.stringify(products.value));
  }

  const totalProducts = () => products.value.length;
  const getTotalValue = () =>
    products.value.reduce(
      (sum, product) => sum + product.price * (product.quantity ?? 1),
      0
    );
  const getProductById = (productId: string) =>
    products.value.find((p) => p._id === productId);

  return {
    products,
    addProduct,
    removeProduct,
    updateProduct,
    setProducts,
    totalProducts,
    getTotalValue,
    getProductById,
    increaseQuantity,
    decreaseQuantity,
  };
});
