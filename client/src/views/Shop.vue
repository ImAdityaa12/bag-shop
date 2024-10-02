<template>
  <div class="flex h-screen bg-gray-100">
    <Sidebar />
    <!-- Main Content -->
    <main class="flex-1 p-6 overflow-auto">
      <h1 class="text-2xl font-bold mb-6">Products</h1>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        <div
          v-for="product in products"
          :key="product.id"
          class="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <img
            :src="product.image"
            :alt="product.name"
            class="w-full h-48 object-cover"
          />
          <div class="p-4">
            <h2 class="font-semibold">{{ product.name }}</h2>
            <div class="flex justify-between items-center mt-2">
              <div>
                <span class="text-lg font-bold"
                  >${{ product.price.toFixed(2) }}</span
                >
                <span class="text-sm text-green-600 ml-2"
                  >-{{ product.discount }}%</span
                >
              </div>
              <button class="text-gray-500 hover:text-gray-700">
                <PlusIcon class="w-5 h-5" />
                <span class="sr-only">Add to favorites</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  HomeIcon,
  PackageIcon,
  PlusCircleIcon,
  LogOutIcon,
  PlusIcon,
} from "lucide-vue-next";
import Sidebar from "@/components/Sidebar.vue";

const products = ref([
  {
    id: 1,
    name: "Product 1",
    price: 19.99,
    discount: 10,
    image: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Product 2",
    price: 29.99,
    discount: 15,
    image: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Product 3",
    price: 39.99,
    discount: 20,
    image: "/placeholder.svg",
  },
  {
    id: 4,
    name: "Product 4",
    price: 49.99,
    discount: 5,
    image: "/placeholder.svg",
  },
  {
    id: 5,
    name: "Product 5",
    price: 59.99,
    discount: 25,
    image: "/placeholder.svg",
  },
  {
    id: 6,
    name: "Product 6",
    price: 69.99,
    discount: 30,
    image: "/placeholder.svg",
  },
]);

const logout = () => {
  // Implement logout functionality
  console.log("Logout clicked");
};
const menuItems = [
  { name: "Homepage", path: "/", icon: HomeIcon },
  { name: "Products", path: "/products", icon: PackageIcon },
  { name: "Create Product", path: "/create-product", icon: PlusCircleIcon },
];
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
