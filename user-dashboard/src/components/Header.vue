<script setup lang="ts">
import { ref, onMounted } from 'vue'

const userName = ref('')
const userEmail = ref('')
const userImage = ref('')

onMounted(() => {
  const savedUser = localStorage.getItem('user')
  if (savedUser) {
    const user = JSON.parse(savedUser)
    userName.value = `${user.firstName || ''} ${user.lastName || ''}`.trim()
    userEmail.value = user.email || ''
    userImage.value = user.image || ''
  }
})
</script>

<template>
  <header class="w-full bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between">
    <div class="flex items-center gap-2">
    </div>

    <div class="flex items-center gap-4">
      <button class="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        <span class="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
      </button>

      <div class="flex items-center gap-3 pl-4 border-l border-gray-200">
        <img 
          :src="userImage || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'" 
          alt="Profile" 
          class="w-10 h-10 rounded-full object-cover border border-gray-200"
        />
        <div class="hidden md:block text-left">
          <h4 class="text-sm font-bold text-gray-800 leading-tight">{{ userName || 'User' }}</h4>
          <p class="text-xs text-gray-400 font-medium">{{ userEmail || 'user@example.com' }}</p>
        </div>
      </div>
    </div>
  </header>
</template>