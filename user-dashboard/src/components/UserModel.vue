<script setup lang="ts">
import type { User } from '@/types/user';

defineProps<{
 user: User | null
}>()

const emit = defineEmits(['close'])
</script>

<template>
    <div v-if="user">
        <p>{{ user.email }}</p>
        <p>{{ user.phone }}</p>
        <button @click="emit('close')">close</button>
    </div>
</template>