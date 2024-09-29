<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { getCookie } from "@/lib/utils";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
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
