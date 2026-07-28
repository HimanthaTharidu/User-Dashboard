<script setup lang="ts">
import { ref , onMounted} from 'vue'
import SideBar from './components/SideBar.vue'
import Header from './components/Header.vue' // Import your header
import LoginForm from './components/LoginForm.vue'
import Directory from './views/Directory.vue'
import Dashboard from './views/Dashboard.vue'


const isSidebarCollapsed = ref(false)
const search = ref("") // Shared search state
const isLoggedIn = ref<boolean>(false)
const currentView = ref<string>('dashboard')
const loggedInUserId = ref<number>(1)

onMounted(() => {
  const token = localStorage.getItem('authtoken')
  if (token) {
    isLoggedIn.value = true
  }
});

onMounted(() => {
  const savedUser = localStorage.getItem('user')
  if(savedUser){
    const userObj = JSON.parse(savedUser)
    loggedInUserId.value = userObj.id || 1
  }
})

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
      <SideBar
      :current-view="currentView"
      @logout = "handleLogout" 
      @navigate="(view) => currentView = view"
      />
        <main class="flex-1 flex flex-col overflow-hidden">
          <Header/>
          <div class="flex-1 overflow-y-auto p-6">
            <Directory v-if="currentView === 'directory'"/>
            <Dashboard v-else-if="currentView === 'dashboard'" :user-id="loggedInUserId"/>
          </div>
        </main>
      </div>
    </div>
  </div>
  
</template>