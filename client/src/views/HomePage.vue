<template>
  <div class="min-h-screen bg-background">
    <Navbar />
    <!-- Hero Section -->
    <section class="bg-primary text-primary-foreground py-20">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-4xl md:text-5xl font-bold mb-4">Welcome to BagShop</h2>
        <p class="text-xl mb-8">
          Discover our collection of stylish and functional bags
        </p>
        <Button asChild size="lg">
          <router-link to="/shop" class="inline-flex items-center">
            Shop Now
          </router-link>
        </Button>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <h3 class="text-2xl font-bold mb-8">Featured Products</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card v-for="product in featuredProducts" :key="product?.id">
            <CardContent class="p-0">
              <img
                :src="`data:image/png;base64,${product.image}`"
                :alt="product?.name"
                class="w-full h-48 object-contain"
              />
            </CardContent>
            <CardHeader>
              <CardTitle>{{ product?.name }}</CardTitle>
              <CardDescription>{{ product?.description }}</CardDescription>
            </CardHeader>
            <CardFooter class="flex justify-between">
              <span class="text-xl font-bold">
                ${{ product?.price?.toFixed(2) }}
              </span>
              <Button
                @click="productStore.addProduct(product)"
                v-if="!products.some((p) => p._id === product._id)"
                >{{ "Add to Cart" }}
              </Button>
              <Button
                v-else
                @click="productStore.increaseQuantity(product._id)"
              >
                {{ "Added to Cart" }}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>

    <!-- Newsletter -->
    <section class="bg-muted py-16">
      <div class="container mx-auto px-4 text-center">
        <h3 class="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h3>
        <p class="text-muted-foreground mb-8">
          Stay updated with our latest products and offers
        </p>
        <form
          @submit.prevent="subscribeNewsletter"
          class="max-w-md mx-auto flex"
        >
          <Input
            type="email"
            v-model="email"
            placeholder="Enter your email"
            class="flex-grow rounded-r-none"
          />
          <Button type="submit" class="rounded-l-none">Subscribe</Button>
        </form>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-secondary text-secondary-foreground py-8">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 class="text-lg font-semibold mb-4">About Us</h4>
            <p class="text-secondary-foreground/70">
              BagShop is your one-stop destination for stylish and high-quality
              bags.
            </p>
          </div>
          <div>
            <h4 class="text-lg font-semibold mb-4">Quick Links</h4>
            <ul class="space-y-2">
              <li>
                <Button
                  variant="link"
                  class="p-0 h-auto text-secondary-foreground/70 hover:text-secondary-foreground"
                  >FAQ</Button
                >
              </li>
              <li>
                <Button
                  variant="link"
                  class="p-0 h-auto text-secondary-foreground/70 hover:text-secondary-foreground"
                  >Shipping & Returns</Button
                >
              </li>
              <li>
                <Button
                  variant="link"
                  class="p-0 h-auto text-secondary-foreground/70 hover:text-secondary-foreground"
                  >Privacy Policy</Button
                >
              </li>
              <li>
                <Button
                  variant="link"
                  class="p-0 h-auto text-secondary-foreground/70 hover:text-secondary-foreground"
                  >Terms of Service</Button
                >
              </li>
            </ul>
          </div>
          <div>
            <h4 class="text-lg font-semibold mb-4">Contact Us</h4>
            <p class="text-secondary-foreground/70">
              123 Bag Street, Fashion City, 12345
            </p>
            <p class="text-secondary-foreground/70">Email: info@bagshop.com</p>
            <p class="text-secondary-foreground/70">Phone: (123) 456-7890</p>
          </div>
        </div>
        <Separator class="my-8" />
        <div class="text-center text-secondary-foreground/70">
          <p>&copy; 2024 BagShop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import {
  MinusIcon,
  Plus,
  PlusIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  X,
} from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";
import { getALLProductsAPI } from "@/api/getALLProductsAPI";
import { getCookie } from "@/lib/utils";
import { useProductStore } from "@/store/cart";
import { storeToRefs } from "pinia";
import router from "@/routes";
import Navbar from "@/components/Navbar.vue";
const email = ref("");

const featuredProducts = ref([]);
const productStore = useProductStore();
const { products } = storeToRefs(productStore);
const getProducts = async () => {
  const response = await getALLProductsAPI();
  if (response.status === 200) {
    featuredProducts.value = response.data.splice(0, 3);
  } else {
    toast({
      title: "An error occurred while fetching products. Please try again.",
    });
  }
};

// Called when the component is mounted
onMounted(() => {
  let cookie = getCookie("token");
  if (cookie) {
    getProducts();
    const products = localStorage.getItem("products");
    if (products) {
      productStore.setProducts(JSON.parse(products));
    }
  } else {
    router.push("/create");
  }
});
const subscribeNewsletter = () => {
  // Implement newsletter subscription logic here
  console.log("Subscribing email:", email.value);
  // Reset email input after submission
  email.value = "";
};

const checkout = () => {
  // Implement checkout logic here
  console.log("Proceeding to checkout");
};

const continueShopping = () => {
  // Implement continue shopping logic here
  console.log("Continuing shopping");
};
</script>
