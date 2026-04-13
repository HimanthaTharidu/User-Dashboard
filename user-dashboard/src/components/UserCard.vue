<script setup lang="ts">
import type { User } from '@/types/user';

defineProps<{
    user: User
}>()
</script>

<template>
  <div>
    <img :src="user.image" alt="user image">
    <h2>{{ user.firstname }} {{ user.lastname }}</h2>
    <p>{{ user.email }}</p>
  </div>
</template>

<style scoped>

</style>
