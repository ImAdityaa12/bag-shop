<script setup lang="ts">
import { logoutAPI } from "@/api/logoutAPI";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { getCookie } from "@/lib/utils";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
const cookieValue = ref<string | null>(null);
const router = useRouter();
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
onMounted(() => {
  const token = getCookie("token");
  cookieValue.value = token ?? null;
  if (!cookieValue.value) {
    router.push("/create");
  }
});
</script>

<template>
  <Button @click="logout">Logout</Button>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
