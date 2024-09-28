<template>
  <div
    class="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8"
  >
    <Card class="sm:mx-auto sm:w-full sm:max-w-md">
      <CardHeader>
        <CardTitle class="text-3xl font-extrabold text-center"
          >BagShop</CardTitle
        >
      </CardHeader>
      <CardContent>
        <Tabs default-value="create" class="w-full">
          <TabsList class="grid w-full grid-cols-2">
            <TabsTrigger value="create">Create Account</TabsTrigger>
            <TabsTrigger value="login">Login</TabsTrigger>
          </TabsList>
          <TabsContent value="create">
            <form @submit.prevent="handleCreateAccount">
              <div class="space-y-4">
                <div class="space-y-2">
                  <Label for="create-name">Full Name</Label>
                  <Input id="create-name" v-model="createForm.name" required />
                </div>
                <div class="space-y-2">
                  <Label for="create-email">Email</Label>
                  <Input
                    id="create-email"
                    type="email"
                    v-model="createForm.email"
                    required
                  />
                </div>
                <div class="space-y-2">
                  <Label for="create-password">Password</Label>
                  <Input
                    id="create-password"
                    type="password"
                    v-model="createForm.password"
                    required
                  />
                </div>
                <Button type="submit" class="w-full">Sign up</Button>
              </div>
            </form>
          </TabsContent>
          <TabsContent value="login">
            <form @submit.prevent="handleLogin">
              <div class="space-y-4">
                <div class="space-y-2">
                  <Label for="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    v-model="loginForm.email"
                    required
                  />
                </div>
                <div class="space-y-2">
                  <Label for="login-password">Password</Label>
                  <Input
                    id="login-password"
                    type="password"
                    v-model="loginForm.password"
                    required
                  />
                </div>
                <Button type="submit" class="w-full">Log in</Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const createForm = reactive({
  name: "",
  email: "",
  password: "",
});

const loginForm = reactive({
  email: "",
  password: "",
});

const handleCreateAccount = () => {
  console.log("Create Account:", createForm);
  // Reset form after submission
  createForm.name = "";
  createForm.email = "";
  createForm.password = "";
};

const handleLogin = () => {
  console.log("Login:", loginForm);
  // Reset form after submission
  loginForm.email = "";
  loginForm.password = "";
};
</script>
