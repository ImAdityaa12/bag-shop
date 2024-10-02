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
      <h2 class="text-4xl font-bold mb-8 text-center">Contact Us</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
        <!-- Contact Form -->
        <Card>
          <CardHeader>
            <CardTitle>Send us a message</CardTitle>
            <CardDescription
              >We'll get back to you as soon as possible.</CardDescription
            >
          </CardHeader>
          <CardContent>
            <form @submit.prevent="submitForm">
              <div class="space-y-4">
                <div>
                  <Label for="name">Name</Label>
                  <Input id="name" v-model="form.name" required />
                </div>
                <div>
                  <Label for="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    v-model="form.email"
                    required
                  />
                </div>
                <div>
                  <Label for="subject">Subject</Label>
                  <Input id="subject" v-model="form.subject" required />
                </div>
                <div>
                  <Label for="message">Message</Label>
                  <Textarea
                    id="message"
                    v-model="form.message"
                    rows="4"
                    required
                  />
                </div>
                <Button type="submit" class="w-full">Send Message</Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <!-- Contact Information -->
        <Card>
          <CardHeader>
            <CardTitle>Get in touch</CardTitle>
            <CardDescription>Here's how you can reach us</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="space-y-4">
              <div class="flex items-center space-x-4">
                <MapPinIcon class="w-6 h-6 text-primary" />
                <div>
                  <p class="font-semibold">Address</p>
                  <p class="text-muted-foreground">
                    123 Bag Street, Fashion City, 12345
                  </p>
                </div>
              </div>
              <div class="flex items-center space-x-4">
                <PhoneIcon class="w-6 h-6 text-primary" />
                <div>
                  <p class="font-semibold">Phone</p>
                  <p class="text-muted-foreground">(123) 456-7890</p>
                </div>
              </div>
              <div class="flex items-center space-x-4">
                <MailIcon class="w-6 h-6 text-primary" />
                <div>
                  <p class="font-semibold">Email</p>
                  <p class="text-muted-foreground">info@bagshop.com</p>
                </div>
              </div>
              <div class="flex items-center space-x-4">
                <ClockIcon class="w-6 h-6 text-primary" />
                <div>
                  <p class="font-semibold">Business Hours</p>
                  <p class="text-muted-foreground">
                    Monday - Friday: 9am - 5pm
                  </p>
                  <p class="text-muted-foreground">Saturday: 10am - 4pm</p>
                  <p class="text-muted-foreground">Sunday: Closed</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <!-- FAQ Section -->
      <section class="mt-16">
        <h3 class="text-2xl font-semibold mb-6">Frequently Asked Questions</h3>
        <Accordion type="single" collapsible class="w-full">
          <AccordionItem
            v-for="(faq, index) in faqs"
            :key="index"
            :value="`item-${index}`"
          >
            <AccordionTrigger>{{ faq.question }}</AccordionTrigger>
            <AccordionContent>
              {{ faq.answer }}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
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
import { ref } from "vue";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { MapPinIcon, PhoneIcon, MailIcon, ClockIcon } from "lucide-vue-next";

const form = ref({
  name: "",
  email: "",
  subject: "",
  message: "",
});

const submitForm = () => {
  // Here you would typically send the form data to your backend
  console.log("Form submitted:", form.value);
  // Reset form after submission
  form.value = { name: "", email: "", subject: "", message: "" };
  // You might want to show a success message to the user here
};

const faqs = [
  {
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return policy for all unused items in their original packaging. Please contact our customer service team to initiate a return.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "Shipping times vary depending on your location. Typically, domestic orders are delivered within 3-5 business days, while international orders may take 7-14 business days.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Yes, we ship to most countries worldwide. Shipping costs and delivery times may vary depending on the destination.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order is shipped, you will receive a confirmation email with a tracking number. You can use this number to track your package on our website or the carrier's site.",
  },
];
</script>
