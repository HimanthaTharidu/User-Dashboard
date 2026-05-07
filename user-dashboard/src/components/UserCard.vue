<script setup lang="ts">
import type { User } from '@/types/user';

const props = defineProps<{user: User}>()
const emit = defineEmits(['select'])

function handleClick(){
  emit('select',props.user)
}

</script>

<template>
  <div 
    @click="handleClick" 
    class="bg-[#dbeafe] p-8 rounded-[40px] flex flex-col items-center text-center cursor-pointer hover:shadow-lg transition-shadow"
  >
    <img 
      :src="user.image" 
      alt="user image" 
      class="w-32 h-32 rounded-full object-cover mb-6 border-2 border-white shadow-sm"
    >
    
    <h2 class="text-2xl font-black text-black leading-tight">
      {{ user.firstName }} {{ user.lastName }}
    </h2>
    
    <p class="text-gray-500 font-bold text-lg mt-1">
      {{ user.company.title }}
    </p>
    
    <p class="text-gray-400 font-medium text-base mt-1 lowercase">
      {{ user.email }}
    </p>
  </div>
</template>


