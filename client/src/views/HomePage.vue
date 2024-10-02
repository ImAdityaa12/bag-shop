<template>
  <div class="min-h-screen bg-background">
    <!-- Header -->
    <header class="border-b">
      <div
        class="container mx-auto px-4 py-4 flex justify-between items-center"
      >
        <h1 class="text-3xl font-bold">BagShop</h1>
        <nav>
          <ul class="flex space-x-4">
            <li>
              <RouterLink to="/shop">
                <Button variant="ghost">Home</Button>
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/about"
                ><Button variant="ghost">About</Button>
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/contact">
                <Button variant="ghost">Contact</Button>
              </RouterLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>

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
            <ShoppingBagIcon class="ml-2 h-5 w-5" />
          </router-link>
        </Button>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <h3 class="text-2xl font-bold mb-8">Featured Products</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card v-for="product in featuredProducts" :key="product.id">
            <CardContent class="p-0">
              <img
                :src="product.image"
                :alt="product.name"
                class="w-full h-64 object-cover"
              />
            </CardContent>
            <CardHeader>
              <CardTitle>{{ product.name }}</CardTitle>
              <CardDescription>{{ product.description }}</CardDescription>
            </CardHeader>
            <CardFooter class="flex justify-between">
              <span class="text-xl font-bold"
                >${{ product.price.toFixed(2) }}</span
              >
              <Button>Add to Cart</Button>
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
import { ref } from "vue";
import { ShoppingBagIcon } from "lucide-vue-next";
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

const email = ref("");

const featuredProducts = [
  {
    id: 1,
    name: "Classic Tote",
    description: "A timeless tote bag perfect for everyday use",
    price: 59.99,
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 2,
    name: "Urban Backpack",
    description: "Stylish and functional backpack for the modern explorer",
    price: 79.99,
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 3,
    name: "Leather Messenger",
    description: "Professional messenger bag for work and beyond",
    price: 89.99,
    image: "/placeholder.svg?height=400&width=600",
  },
];

const subscribeNewsletter = () => {
  // Implement newsletter subscription logic here
  console.log("Subscribing email:", email.value);
  // Reset email input after submission
  email.value = "";
};
</script>
