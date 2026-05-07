<script setup lang="ts">
import { ref } from 'vue'
import type { User } from '@/types/user';

defineProps<{
  user: User | null
}>()

const emit = defineEmits(['close'])

// State for tab switching
const activeTab = ref('Profile')
const tabs = ['Profile', 'Posts', 'Todos']
</script>

<template>
  <div v-if="user" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" @click.self="emit('close')">
    
    <div class="bg-[#f3f4f6] w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl relative">
      
      <button @click="emit('close')" class="absolute top-4 right-4 text-blue-600 hover:text-blue-800 text-2xl font-bold">
        ✕
      </button>

      <div class="p-8 pb-4 flex items-center gap-6">
        <img :src="user.image" class="w-24 h-24 rounded-full border-4 border-white shadow-sm" alt="Profile">
        <div>
          <h2 class="text-4xl font-black text-black flex items-center gap-2">
            {{ user.firstName }} {{ user.lastName }}
            <span class="text-xl cursor-pointer">📝</span>
          </h2>
          <p class="text-gray-500 text-xl font-semibold">{{ user.company.title }}</p>
        </div>
      </div>

      <div class="flex border-b border-gray-300 px-2">
        <button 
          v-for="tab in tabs" 
          :key="tab"
          @click="activeTab = tab"
          :class="[
            'flex-1 py-4 text-xl font-bold transition-all border-b-4',
            activeTab === tab ? 'border-blue-600 text-blue-600 bg-white' : 'border-transparent text-blue-400'
          ]"
        >
          {{ tab }}
        </button>
      </div>

      <div v-if="activeTab === 'Profile'" class="p-10 space-y-6 text-lg">
        <section>
          <h3 class="font-bold text-black text-xl">Department</h3>
          <p class="text-gray-500 font-medium text-lg">{{ user.company.department }}</p>
        </section>

        <section>
          <h3 class="font-bold text-black text-xl">Contact</h3>
          <p class="text-gray-500 font-medium italic">phone: {{ user.phone }}</p>
          <p class="text-gray-500 font-medium italic">email: {{ user.email }}</p>
        </section>

        <section>
          <h3 class="font-bold text-black text-xl">Office</h3>
          <p class="text-gray-500 font-medium">{{ user.company.address.address}}, {{ user.company.address.city }}</p>
        </section>

        <section>
          <h3 class="font-bold text-black text-xl">Joined</h3>
          <p class="text-gray-500 font-medium">May 14, 2021</p>
        </section>
      </div>

      <div v-else class="p-10 text-center text-gray-400 italic">
        {{ activeTab }} content coming soon...
      </div>
    </div>
  </div>
</template>