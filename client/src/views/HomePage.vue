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
            <li>
              <Sheet>
                <SheetTrigger>
                  <Button variant="ghost"> Cart </Button>
                </SheetTrigger>

                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Shopping Cart</SheetTitle>
                    <SheetDescription>
                      <div class="bg-white rounded-lg shadow-md p-6">
                        <div v-if="cart.length === 0" class="text-center py-8">
                          <ShoppingCartIcon
                            class="w-16 h-16 text-gray-400 mx-auto mb-4"
                          />
                          <p class="text-gray-600">Your cart is empty</p>
                        </div>
                        <div v-else>
                          <div class="flow-root">
                            <ul class="-my-6 divide-y divide-gray-200">
                              <li
                                v-for="product in productStore.products"
                                :key="product._id"
                                class="py-6 flex"
                              >
                                <div
                                  class="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden"
                                >
                                  <img
                                    :src="getImageSrc(product)"
                                    :alt="product.name"
                                    class="w-full h-full object-center object-cover"
                                  />
                                </div>
                                <div class="ml-4 flex-1 flex flex-col">
                                  <div>
                                    <div
                                      class="flex justify-between text-base font-medium text-gray-900"
                                    >
                                      <h3>{{ product.name }}</h3>
                                      <p class="ml-4">
                                        ${{ product.price.toFixed(2) }}
                                      </p>
                                    </div>
                                    <p class="mt-1 text-sm text-gray-500">
                                      {{ product.bgColor }}
                                    </p>
                                  </div>
                                  <div
                                    class="flex-1 flex items-end justify-between text-sm"
                                  >
                                    <div class="flex items-center">
                                      <button
                                        class="text-gray-500 focus:outline-none focus:text-gray-600"
                                        @click="
                                          productStore.decreaseQuantity(
                                            product._id
                                          )
                                        "
                                      >
                                        <MinusIcon class="w-4 h-4" />
                                      </button>
                                      <span class="mx-2 text-gray-700">{{
                                        product.quantity || 1
                                      }}</span>
                                      <button
                                        class="text-gray-500 focus:outline-none focus:text-gray-600"
                                        @click="
                                          productStore.increaseQuantity(
                                            product._id
                                          )
                                        "
                                      >
                                        <PlusIcon class="w-4 h-4" />
                                      </button>
                                    </div>
                                    <div class="flex">
                                      <button
                                        @click="
                                          productStore.removeProduct(
                                            product._id
                                          )
                                        "
                                        class="font-medium text-indigo-600 hover:text-indigo-500"
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </div>
                          <div class="mt-8">
                            <div
                              class="flex justify-between text-base font-medium text-gray-900"
                            >
                              <p>Subtotal</p>
                              <p>
                                ${{ productStore.getTotalValue().toFixed(2) }}
                              </p>
                            </div>
                            <p class="mt-0.5 text-sm text-gray-500">
                              Shipping and taxes calculated at checkout.
                            </p>
                            <div class="mt-6">
                              <button
                                @click="checkout"
                                class="w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              >
                                Checkout
                              </button>
                            </div>
                            <div
                              class="mt-6 flex justify-center text-sm text-center text-gray-500"
                            >
                              <p>
                                or
                                <button
                                  @click="continueShopping"
                                  class="text-indigo-600 font-medium hover:text-indigo-500"
                                >
                                  Continue Shopping
                                  <span aria-hidden="true"> &rarr;</span>
                                </button>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
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
                :src="getImageSrc(product)"
                :alt="product?.name"
                class="w-full h-48 object-contain"
              />
            </CardContent>
            <CardHeader>
              <CardTitle>{{ product?.name }}</CardTitle>
              <CardDescription>{{ product?.description }}</CardDescription>
            </CardHeader>
            <CardFooter class="flex justify-between">
              <span class="text-xl font-bold"
                >${{ product?.price?.toFixed(2) }}</span
              >
              <Button
                @click="productStore.addProduct(product)"
                v-if="!productStore.products.includes(product)"
                >{{ "Add to Cart" }}</Button
              >
              <Button @click="productStore.removeProduct(product._id)" v-else>{{
                "Remove from Cart"
              }}</Button>
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { getALLProductsAPI } from "@/api/getALLProductsAPI";
import { getCookie } from "@/lib/utils";
import { useProductStore } from "@/store/cart";
import router from "@/routes";
const email = ref("");

const featuredProducts = ref([]);
const productStore = useProductStore();

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
const getImageSrc = (product) => {
  if (product?.image?.data && Array.isArray(product.image.data)) {
    const binaryString = String.fromCharCode(
      ...new Uint8Array(product.image.data)
    );
    return `data:image/jpeg;base64,${btoa(binaryString)}`;
  }
  return "";
};
const subscribeNewsletter = () => {
  // Implement newsletter subscription logic here
  console.log("Subscribing email:", email.value);
  // Reset email input after submission
  email.value = "";
};

const cart = ref([
  {
    id: 1,
    name: "Throwback Hip Bag",
    color: "Salmon",
    price: 90.0,
    quantity: 1,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    name: "Medium Stuff Satchel",
    color: "Blue",
    price: 32.0,
    quantity: 1,
    image: "/placeholder.svg?height=200&width=200",
  },
]);

const subtotal = computed(() => {
  return cart.value.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
});

const increaseQuantity = (item) => {
  item.quantity++;
};

const decreaseQuantity = (item) => {
  if (item.quantity > 1) {
    item.quantity--;
  }
};

const removeItem = (itemToRemove) => {
  cart.value = cart.value.filter((item) => item.id !== itemToRemove.id);
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
