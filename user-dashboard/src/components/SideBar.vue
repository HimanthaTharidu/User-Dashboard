<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['toggle'])
const isCollapsed = ref(false)

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
  emit('toggle', isCollapsed.value)
}
</script>

<template>
  <aside 
    :class="[
      'flex flex-col h-screen bg-[#6366f1] text-white transition-all duration-300 relative shadow-xl',
      isCollapsed ? 'w-24' : 'w-70'
    ]"
  >
    <button 
      @click="toggleSidebar"
      class="absolute -right-4 top-12 bg-[#6366f1] text-white p-1.5 rounded-lg border border-white/20 shadow-md z-50 hover:bg-white hover:text-[#6366f1] transition-all"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>

    <div class="pt-12 px-6 flex items-center justify-center gap-3 overflow-hidden">
      <div class="w-10 h-10 rounded-full border-[10px] border-white flex-shrink-0 flex items-center justify-center">
      </div>
      <h1 v-show="!isCollapsed" class="text-3xl font-extrabold tracking-tight whitespace-nowrap">
        StaffHub
      </h1>
    </div>

    <nav class="mt-20 flex-grow px-4">
      <ul class="space-y-4">
        <li class="flex items-center p-4 rounded-2xl bg-white/10 cursor-pointer group transition-all">
          <svg class="w-7 h-7 flex-shrink-0 mr-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span v-show="!isCollapsed" class="text-xl font-semibold whitespace-nowrap">Dashboard</span>
        </li>

        <li class="flex items-center p-4 rounded-2xl hover:bg-white/5 text-indigo-100 hover:text-white cursor-pointer group transition-all">
          <svg class="w-7 h-7 flex-shrink-0 mr-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <span v-show="!isCollapsed" class="text-xl font-medium whitespace-nowrap">Employees</span>
        </li>
      </ul>
    </nav>

    <div class="p-8 border-t border-white/10">
      <div class="flex items-center justify-center gap-2 text-indigo-100 hover:text-white cursor-pointer transition-all group">
        <svg class="w-7 h-7 flex-shrink-0 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        <span v-show="!isCollapsed" class="text-xl font-semibold whitespace-nowrap">Log out</span>
      </div>
    </div>
  </aside>
</template>