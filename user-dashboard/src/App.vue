<script setup lang="ts">
import { ref } from 'vue'
import SideBar from './components/SideBar.vue'
import Header from './components/Header.vue' // Import your header
import Dashboard from './views/Dashboard.vue'

const isSidebarCollapsed = ref(false)
const search = ref("") // Shared search state

const handleToggle = (collapsedState: boolean) => {
  isSidebarCollapsed.value = collapsedState
}
</script>

<template>
  <div class="flex h-screen bg-gray-100 overflow-hidden">
    <SideBar />

    <main class="flex-1 flex flex-col overflow-hidden">
      <Header/>

      <div class="flex-1 overflow-y-auto p-6">
        <Dashboard/>
      </div>
    </main>
  </div>
</template>