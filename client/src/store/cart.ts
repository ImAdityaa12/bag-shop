import { defineStore } from "pinia";
import { ref, watch } from "vue";

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

const STORAGE_KEY = "products";

export const useProductStore = defineStore("products", () => {
  const loadFromStorage = (): Product[] => {
    try {
      const storedData = localStorage.getItem(STORAGE_KEY);
      return storedData ? JSON.parse(storedData) : [];
    } catch (error) {
      console.error("Error loading from localStorage:", error);
      return [];
    }
  };

  const saveToStorage = (data: Product[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  };

  const products = ref<Product[]>(loadFromStorage());

  watch(
    products,
    (newProducts) => {
      saveToStorage(newProducts);
    },
    { deep: true }
  );

  function addProduct(product: Product) {
    const existingProduct = products.value.find((p) => p._id === product._id);
    if (existingProduct) {
      if (existingProduct.quantity === undefined) {
        existingProduct.quantity = 2;
      } else {
        existingProduct.quantity++;
      }
    } else {
      products.value.push({ ...product, quantity: 1 });
    }
  }

  function increaseQuantity(productId: string) {
    const product = products.value.find((p) => p._id === productId);
    if (product) {
      product.quantity = (product.quantity || 1) + 1;
    }
  }

  function decreaseQuantity(productId: string) {
    const product = products.value.find((p) => p._id === productId);
    if (product) {
      if (product.quantity && product.quantity > 1) {
        product.quantity--;
      } else {
        removeProduct(productId);
      }
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
    }
  }

  function setProducts(newProducts: Product[]) {
    products.value = newProducts;
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
