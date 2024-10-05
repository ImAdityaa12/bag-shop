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
}

export const useProductStore = defineStore("products", () => {
  const products = ref<Product[]>([]);
  // Actions
  function addProduct(product: Product) {
    products.value.push(product);
    localStorage.setItem("products", JSON.stringify(products.value));
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

  // Getters
  const totalProducts = () => products.value.length;
  const getTotalValue = () =>
    products.value.reduce((sum, product) => sum + product.price, 0);
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
  };
});
