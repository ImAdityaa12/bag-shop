<template>
  <div class="flex min-h-screen bg-gray-100">
    <Sidebar />
    <!-- Main Content -->

    <div class="flex flex-col gap-2 w-full">
      <Navbar />
      <!-- <ShopLoadingSkeleton v-if="isLoading" /> -->
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
            class="relative bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              :src="`data:image/png;base64,${product.image}`"
              :alt="product.name"
              class="w-full h-48 object-contain"
            />
            <div
              class="absolute top-2 right-2 cursor-pointer"
              @click="removeFav(product.id)"
            >
              <Heart fill="red" class="text-red-500" />
            </div>
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
                <Button
                  @click="productStore.addProduct(product as any)"
                  v-if="
                    !productStore.products.some((p) => p._id === product.id)
                  "
                >
                  <PlusIcon />
                </Button>
                <Button
                  v-else
                  @click="productStore.increaseQuantity(product.id)"
                >
                  <Check />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Product {
  id: string;
  name: string;
  price: number;
  discount: number;
  image: string;
}
import { onMounted, ref } from "vue";
import { PlusIcon, Check, Heart } from "lucide-vue-next";
import Sidebar from "@/components/Sidebar.vue";
import { getCookie } from "@/lib/utils";
import { useRouter } from "vue-router";
import Navbar from "@/components/Navbar.vue";
import { Button } from "@/components/ui/button";
import { useProductStore } from "@/store/cart";

import { toast } from "@/components/ui/toast";
import { getFavItems } from "@/api/getfavItems";
import { removeFavariteItemAPI } from "@/api/removeFavItemAPI";
const productStore = useProductStore();
// State for products and loading status
const isLoading = ref(false);
const products = ref<Product[]>([]);

// Fetch products when component is mounted
const getProducts = async () => {
  isLoading.value = true;
  const response = await getFavItems();
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

const removeFav = async (productId: string) => {
  try {
    const response = await removeFavariteItemAPI(productId);
    if (response.status === 200) {
      toast({
        title: "Product removed from favorites",
      });
      const updatedProducts = products.value.map((product) => {
        if (product.id === productId) {
          return {
            ...product,
            isLiked: false,
          };
        }
        return product;
      });
      products.value = updatedProducts;
    } else {
      toast({
        title:
          "An error occurred while adding product to favorites. Please try again.",
      });
    }
  } catch (error) {
    toast({
      title:
        "An error occurred while adding product to favorites. Please try again.",
    });
  }
};
</script>
