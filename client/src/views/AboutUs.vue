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
              <Button variant="ghost" asChild
                ><router-link to="/">Home</router-link></Button
              >
            </li>
            <li>
              <Button variant="ghost" asChild
                ><router-link to="/about">About</router-link></Button
              >
            </li>
            <li>
              <Button variant="ghost" asChild
                ><router-link to="/contact">Contact</router-link></Button
              >
            </li>
          </ul>
        </nav>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-16">
      <h2 class="text-4xl font-bold mb-8 text-center">About BagShop</h2>

      <!-- Our Story -->
      <Card class="mb-12">
        <CardHeader>
          <CardTitle>Our Story</CardTitle>
        </CardHeader>
        <CardContent>
          <p class="text-muted-foreground mb-4">
            BagShop was founded in 2010 with a simple mission: to provide
            high-quality, stylish bags for every occasion. What started as a
            small boutique in the heart of Fashion City has grown into a global
            brand, loved by bag enthusiasts worldwide.
          </p>
          <p class="text-muted-foreground">
            Our passion for craftsmanship and attention to detail has allowed us
            to create bags that not only look great but also stand the test of
            time. We believe that a good bag is more than just an accessory -
            it's a companion for life's adventures.
          </p>
        </CardContent>
      </Card>

      <!-- Our Values -->
      <h3 class="text-2xl font-semibold mb-6">Our Values</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card v-for="value in companyValues" :key="value.title">
          <CardHeader>
            <CardTitle class="flex items-center">
              <component :is="value.icon" class="w-6 h-6 mr-2" />
              {{ value.title }}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p class="text-muted-foreground">{{ value.description }}</p>
          </CardContent>
        </Card>
      </div>

      <!-- Team Section -->
      <h3 class="text-2xl font-semibold mb-6">Our Team</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card v-for="member in teamMembers" :key="member.name">
          <CardContent class="pt-6">
            <Avatar class="w-24 h-24 mx-auto mb-4">
              <AvatarImage :src="member.avatar" :alt="member.name" />
              <AvatarFallback>{{ member.initials }}</AvatarFallback>
            </Avatar>
            <h4 class="text-xl font-semibold text-center mb-2">
              {{ member.name }}
            </h4>
            <p class="text-muted-foreground text-center mb-4">
              {{ member.position }}
            </p>
            <p class="text-muted-foreground text-center">{{ member.bio }}</p>
          </CardContent>
        </Card>
      </div>

      <!-- Call to Action -->
      <Card>
        <CardHeader>
          <CardTitle>Join Our Journey</CardTitle>
        </CardHeader>
        <CardContent>
          <p class="text-muted-foreground mb-4">
            We're always looking for passionate individuals to join our team. If
            you love bags as much as we do and want to be part of our story,
            we'd love to hear from you!
          </p>
          <Button asChild>
            <router-link to="/careers">View Career Opportunities</router-link>
          </Button>
        </CardContent>
      </Card>
    </main>

    <!-- Footer -->
    <footer class="bg-secondary text-secondary-foreground py-8 mt-16">
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
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { HeartIcon, ShieldCheckIcon, RefreshCwIcon } from "lucide-vue-next";

const companyValues = [
  {
    title: "Quality",
    description:
      "We never compromise on the quality of our products, ensuring each bag meets our high standards.",
    icon: ShieldCheckIcon,
  },
  {
    title: "Sustainability",
    description:
      "We're committed to reducing our environmental impact through responsible sourcing and production.",
    icon: RefreshCwIcon,
  },
  {
    title: "Customer Satisfaction",
    description:
      "Your happiness is our priority. We strive to provide exceptional service and products you'll love.",
    icon: HeartIcon,
  },
];

const teamMembers = [
  {
    name: "Jane Doe",
    position: "Founder & CEO",
    bio: "With over 20 years in the fashion industry, Jane brings her passion for design to every BagShop creation.",
    avatar: "/placeholder.svg?height=200&width=200",
    initials: "JD",
  },
  {
    name: "John Smith",
    position: "Head of Design",
    bio: "John's innovative designs have won multiple awards and set trends in the bag industry.",
    avatar: "/placeholder.svg?height=200&width=200",
    initials: "JS",
  },
  {
    name: "Emily Brown",
    position: "Customer Experience Manager",
    bio: "Emily ensures that every customer interaction with BagShop is nothing short of exceptional.",
    avatar: "/placeholder.svg?height=200&width=200",
    initials: "EB",
  },
];
</script>
