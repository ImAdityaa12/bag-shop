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
import { onMounted, reactive, ref } from "vue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { handleSignUp } from "@/api/registerAPI";
import { handleLoginAPI } from "@/api/loginAPI";
import { useRouter } from "vue-router";
import { useToast } from "@/components/ui/toast/use-toast";
import { getCookie } from "@/lib/utils";
const { toast } = useToast();
const router = useRouter();
const createForm = reactive({
  name: "",
  email: "",
  password: "",
});

const loginForm = reactive({
  email: "",
  password: "",
});
const cookieValue = ref<string | null>(null);
onMounted(() => {
  const token = getCookie("token");
  cookieValue.value = token ?? null;
  if (cookieValue.value) {
    router.push("/");
  }
});
const handleCreateAccount = async () => {
  try {
    const response = await handleSignUp({
      email: createForm.email,
      password: createForm.password,
      fullName: createForm.name,
    });
    if (response.status === 201) {
      Object.assign(createForm, {
        name: "",
        email: "",
        password: "",
      });
      toast({
        title: "Account Created",
      });

      setTimeout(() => router.push("/"), 1000);
    }
  } catch (error) {
    console.error(error);
  }
};
const handleLogin = async () => {
  try {
    const response = await handleLoginAPI({
      email: loginForm.email,
      password: loginForm.password,
    });
    if (response.status === 200) {
      toast({
        title: "Login Successful",
        description: "Welcome back!",
      });
      Object.assign(loginForm, {
        email: "",
        password: "",
      });
      setTimeout(() => router.push("/"), 1000); // Delay navigation
    }
  } catch (error) {
    toast({
      title: "Error",
      description: "An unexpected error occurred. Please try again.",
      variant: "destructive",
    });
  }
};
</script>
