<script setup lang="ts">
import { ref , onMounted} from 'vue'
import SideBar from './components/SideBar.vue'
import Header from './components/Header.vue' // Import your header
import Dashboard from './views/Dashboard.vue'
import LoginForm from './components/LoginForm.vue'

onMounted(() => {
  const token = localStorage.getItem('authtoken')
  if (token) {
    isLoggedIn.value = true
  }
});

const isSidebarCollapsed = ref(false)
const search = ref("") // Shared search state
const isLoggedIn = ref<boolean>(false)

const handleToggle = (collapsedState: boolean) => {
  isSidebarCollapsed.value = collapsedState
}
const handleLoginSucess = () => {
  isLoggedIn.value = true
}
const handleLogout = () => {
  localStorage.removeItem('authtoken')
  localStorage.removeItem('user')
  isLoggedIn.value = false
}
</script>

<template>
  <div>
    <LoginForm
    v-if="!isLoggedIn"
    @login-sucess="handleLoginSucess"
    />
    <div v-else>
      <div class="flex h-screen bg-gray-100 overflow-hidden">
      <SideBar  @logout = "handleLogout"/>
        <main class="flex-1 flex flex-col overflow-hidden">
          <Header/>
          <div class="flex-1 overflow-y-auto p-6">
            <Dashboard/>
          </div>
        </main>
      </div>
    </div>
  </div>
  
</template>