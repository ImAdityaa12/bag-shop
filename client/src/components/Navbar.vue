<template>
  <header class="border-b">
    <div class="container mx-auto px-4 py-4 flex justify-between items-center">
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
                      <div
                        v-if="products.length === 0"
                        class="text-center py-8"
                      >
                        <ShoppingCartIcon
                          class="w-16 h-16 text-gray-400 mx-auto mb-4"
                        />
                        <p class="text-gray-600">Your cart is empty</p>
                      </div>
                      <div>
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
                                  :src="`data:image/png;base64,${product.image}`"
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
                                        productStore.removeProduct(product._id)
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
</template>

<script setup>
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useProductStore } from "@/store/cart";
import { storeToRefs } from "pinia";
const productStore = useProductStore();
const { products } = storeToRefs(productStore);
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
import router from "@/routes";
const getImageSrc = (product) => {
  if (product?.image?.data && Array.isArray(product.image.data)) {
    const binaryString = String.fromCharCode(
      ...new Uint8Array(product.image.data)
    );
    return `data:image/jpeg;base64,${btoa(binaryString)}`;
  }
  return "";
};
</script>
