<script setup lang="ts">
import type { User } from '@/types/user';

defineProps<{
    user: User
}>()


</script>

<template>
  <div @click="$emit('select', user)">
    <img :src="user.image" alt="user image">
    <h2>{{ user.firstName }} {{ user.lastName }}</h2>
    <p>{{ user.company.title }}</p>
  </div>
</template>

<style scoped>
h2,p {
  margin: 0;
}
</style>
