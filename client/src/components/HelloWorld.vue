<script setup lang="ts">
import { ref } from "vue";
import Button from "./ui/button/Button.vue";
const count = ref(0);
</script>

<template>
  <Button> Hello </Button>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
