<template>
  <div class="flex h-screen bg-gray-100">
    <Sidebar />

    <!-- Main Content -->
    <main class="ml-64 flex-1 p-8 overflow-y-auto">
      <h1 class="text-3xl font-bold text-gray-800 mb-8">Create New Product</h1>

      <form @submit.prevent="createProduct" enctype="multipart/form-data">
        <!-- Product Details Section -->
        <Card class="mb-8">
          <CardHeader>
            <CardTitle>Product Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="space-y-4">
              <div>
                <Label for="productName">Product Name</Label>
                <Input
                  id="productName"
                  v-model="productName"
                  placeholder="Enter product name"
                />
              </div>
              <div>
                <Label for="productPrice">Product Price</Label>
                <Input
                  id="productPrice"
                  v-model="productPrice"
                  type="number"
                  placeholder="Enter price"
                />
              </div>
              <div>
                <Label for="discountPrice">Discount Price</Label>
                <Input
                  id="discountPrice"
                  v-model="discountPrice"
                  type="number"
                  placeholder="Enter discount price"
                />
              </div>
              <div>
                <Label for="productImage">Choose Image File</Label>
                <Input
                  id="productImage"
                  type="file"
                  @change="handleImageUpload"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Panel Details Section -->
        <Card class="mb-8">
          <CardHeader>
            <CardTitle>Panel Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="space-y-4">
              <div>
                <Label for="backgroundColor">Background Color</Label>
                <div class="flex items-center space-x-2">
                  <Input
                    id="backgroundColorText"
                    v-model="backgroundColor"
                    placeholder="Enter color (e.g., #FFFFFF)"
                    class="flex-grow"
                  />
                  <Input
                    id="backgroundColorPicker"
                    v-model="backgroundColor"
                    type="color"
                    class="w-12 h-12 p-1 rounded-md"
                  />
                </div>
              </div>
              <div>
                <Label for="panelColor">Panel Color</Label>
                <div class="flex items-center space-x-2">
                  <Input
                    id="panelColorText"
                    v-model="panelColor"
                    placeholder="Enter color (e.g., #000000)"
                    class="flex-grow"
                  />
                  <Input
                    id="panelColorPicker"
                    v-model="panelColor"
                    type="color"
                    class="w-12 h-12 p-1 rounded-md"
                  />
                </div>
              </div>
              <div>
                <Label for="textColor">Text Color</Label>
                <div class="flex items-center space-x-2">
                  <Input
                    id="textColorText"
                    v-model="textColor"
                    placeholder="Enter color (e.g., #000000)"
                    class="flex-grow"
                  />
                  <Input
                    id="textColorPicker"
                    v-model="textColor"
                    type="color"
                    class="w-12 h-12 p-1 rounded-md"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Button type="submit">Create Product</Button>
      </form>
    </main>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import {
  HomeIcon,
  ShoppingBagIcon,
  PlusCircleIcon,
  LogOutIcon,
} from "lucide-vue-next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { handleAddProduct } from "@/api/createProductAPI";
import { logoutAPI } from "@/api/logoutAPI";
import Sidebar from "@/components/Sidebar.vue";
import { getCookie } from "@/lib/utils";
import { useRouter } from "vue-router";

const productName = ref("");
const productPrice = ref("");
const discountPrice = ref("");
const productImage = ref(null);
const backgroundColor = ref("#FFFFFF");
const panelColor = ref("#000000");
const textColor = ref("#000000");

const handleImageUpload = (event) => {
  productImage.value = event.target.files[0];
};

const router = useRouter();
onMounted(() => {
  let cookie = getCookie("token");
  if (!cookie) {
    router.push("/create");
  }
});
const createProduct = async () => {
  if (!productName.value || !productPrice.value || !productImage.value) {
    toast({
      title: "Error",
      description: "Please fill in all required fields.",
      variant: "destructive",
    });
    return;
  }
  try {
    const response = await handleAddProduct({
      name: productName.value,
      file: productImage.value,
      price: productPrice.value,
      discount: discountPrice.value,
      bgColor: backgroundColor.value,
      panelColor: panelColor.value,
      textColor: textColor.value,
    });

    if (response.status === 201) {
      toast({
        title: "Success",
        description: "Product created successfully!",
        variant: "default",
      });
    } else {
      // Handle other successful status codes if needed
      toast({
        title: "Success",
        description: "Product created successfully!",
        variant: "default",
      });
    }
  } catch (error) {
    console.error(error);
    toast({
      title: "Error",
      description: "An unexpected error occurred. Please try again.",
      variant: "destructive",
    });
  }
};

const logout = async () => {
  const response = await logoutAPI();
  if (response.status === 200) {
    toast({
      title: "Logged Out Successfully",
    });
    router.push("/create");
  } else {
    toast({
      title: "An error occurred while logging out. Please try again.",
    });
  }
};
</script>
