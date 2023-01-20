<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

if (route.path === "/") router.push("/servers");
</script>

<template></template>
