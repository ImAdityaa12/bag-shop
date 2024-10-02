<template>
  <aside class="w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
    <div class="p-6">
      <h2 class="text-2xl font-bold mb-6 text-center">Dashboard</h2>
      <nav class="space-y-4">
        <router-link
          v-for="(item, index) in menuItems"
          :key="index"
          :to="item.path"
          class="flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200"
        >
          <component :is="item.icon" class="w-5 h-5" />
          <span class="font-medium">{{ item.name }}</span>
        </router-link>
      </nav>
    </div>
    <div class="absolute bottom-0 w-64 p-6">
      <button
        @click="logout"
        class="flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 w-full text-gray-300 hover:bg-white hover:bg-opacity-5 hover:text-white"
      >
        <LogOutIcon class="w-5 h-5" />
        <span class="font-medium">Logout</span>
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { logoutAPI } from "@/api/logoutAPI";
import router from "@/routes";
import {
  HomeIcon,
  PackageIcon,
  PlusCircleIcon,
  LogOutIcon,
} from "lucide-vue-next";
import { toast } from "./ui/toast";

const menuItems = [
  { name: "Homepage", path: "/", icon: HomeIcon },
  { name: "Products", path: "/products", icon: PackageIcon },
  { name: "Create Product", path: "/create-product", icon: PlusCircleIcon },
];
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
