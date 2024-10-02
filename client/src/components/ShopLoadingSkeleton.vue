<template>
  <div class="w-full ml-64">
    <!-- Main Content Skeleton -->
    <main class="container mx-auto px-4">
      <!-- Page Title Skeleton -->
      <div class="w-48 h-10 bg-muted rounded animate-pulse mb-8 mx-auto"></div>

      <!-- Product Grid Skeleton -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        <Card v-for="i in 8" :key="i" class="overflow-hidden">
          <CardContent class="p-0">
            <!-- Product Image Skeleton -->
            <Skeleton class="w-full h-48" />
          </CardContent>
          <CardHeader>
            <!-- Product Title Skeleton -->
            <Skeleton class="h-6 w-3/4 mb-2" />
            <!-- Product Description Skeleton -->
            <Skeleton class="h-4 w-full mb-1" />
            <Skeleton class="h-4 w-5/6" />
          </CardHeader>
          <CardFooter class="flex justify-between">
            <!-- Price Skeleton -->
            <Skeleton class="h-6 w-20" />
            <!-- Add to Cart Button Skeleton -->
            <Skeleton class="h-9 w-28" />
          </CardFooter>
        </Card>
      </div>
    </main>

    <!-- Footer Skeleton -->
    <footer class="bg-secondary mt-16">
      <div class="container mx-auto px-4 py-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="i in 3" :key="i">
            <Skeleton class="h-6 w-32 mb-4" />
            <Skeleton class="h-4 w-full mb-2" />
            <Skeleton class="h-4 w-5/6 mb-2" />
            <Skeleton class="h-4 w-4/5" />
          </div>
        </div>
        <Separator class="my-8" />
        <Skeleton class="h-4 w-48 mx-auto" />
      </div>
    </footer>
  </div>
</template>

<script setup>
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
</script>
