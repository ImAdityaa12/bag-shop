<template>
  <div class="flex min-h-screen bg-gray-100">
    <Sidebar />
    <!-- Main Content -->
    <ShopLoadingSkeleton v-if="isLoading" />
    <main
      class="flex-1 p-6 overflow-auto ml-64 bg-gray-100"
      v-if="products.length > 0 && !isLoading"
    >
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
            :src="getImageSrc(product)"
            :alt="product.name"
            class="w-full h-48 object-contain"
          />
          <div class="p-4 bg-gray-200">
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
import { onMounted, ref } from "vue";
import {
  HomeIcon,
  PackageIcon,
  PlusCircleIcon,
  LogOutIcon,
  PlusIcon,
} from "lucide-vue-next";
import Sidebar from "@/components/Sidebar.vue";
import { getALLProductsAPI } from "@/api/getALLProductsAPI";
import ShopLoadingSkeleton from "@/components/ShopLoadingSkeleton.vue";
import { getCookie } from "@/lib/utils";
import { useRouter } from "vue-router";

// State for products and loading status
const isLoading = ref(false);
const products = ref([]);

// Fetch products when component is mounted
const getProducts = async () => {
  isLoading.value = true;
  const response = await getALLProductsAPI();
  if (response.status === 200) {
    products.value = response.data;
    isLoading.value = false;
  } else {
    toast({
      title: "An error occurred while fetching products. Please try again.",
    });
    isLoading.value = false;
  }
};

// Called when the component is mounted
const router = useRouter();
onMounted(() => {
  let cookie = getCookie("token");
  if (!cookie) {
    router.push("/create");
  } else {
    getProducts();
  }
});

// Convert image data to base64 format for rendering in <img> tag
const getImageSrc = (product) => {
  if (product?.image?.data && Array.isArray(product.image.data)) {
    const binaryString = String.fromCharCode(
      ...new Uint8Array(product.image.data)
    );
    return `data:image/jpeg;base64,${btoa(binaryString)}`;
  }
  return "";
};

// Menu items for sidebar
const menuItems = [
  { name: "Homepage", path: "/", icon: HomeIcon },
  { name: "Products", path: "/products", icon: PackageIcon },
  { name: "Create Product", path: "/create-product", icon: PlusCircleIcon },
];
</script>
