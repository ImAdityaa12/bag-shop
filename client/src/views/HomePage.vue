<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
const getCookie = (name: string): string | undefined => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
  return undefined;
};

const cookieValue = ref<string | null>(null);
const router = useRouter();
onMounted(() => {
  const token = getCookie("token");
  cookieValue.value = token ?? null;
  if (!cookieValue.value) {
    router.push("/create");
  }
});
</script>

<template>
  <Button>Hello</Button>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
