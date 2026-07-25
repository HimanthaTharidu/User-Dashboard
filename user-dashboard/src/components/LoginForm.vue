<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-50">
    <div class="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
      
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-8">User Login</h2>

      <form @submit.prevent="handleLogin" class="space-y-5">
        
        <div>
          <label for="username" class="block text-sm font-medium text-gray-700 mb-1">Username</label>
          <input
            id="username"
            type="text"
            v-model="username"
            required
            placeholder="e.g., emilys"
            class="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            id="password"
            type="password"
            v-model="password"
            required
            placeholder="e.g., emilyspass"
            class="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ loading ? 'Logging in...' : 'Login In' }}
        </button>

        <p v-if="errorMessage" class="text-sm text-red-600 text-center mt-2">{{ errorMessage }}</p>
      </form>

      <p class="text-sm text-center text-gray-600 mt-6">
        Don't have an account? 
        <a href="#" class="text-blue-600 hover:underline font-medium">Sign up</a>
      </p>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { loginUser } from "@/services/api";

const username = ref("");
const password = ref("");
const loading = ref(false);
const errorMessage = ref<string | null>(null);

const emit = defineEmits<{
(e: 'login-sucess'): void
}>()

const handleLogin = async () => {
    loading.value = true;
    errorMessage.value = null;

    try{
        const userData = await loginUser({
            username: username.value,
            password: password.value,
        })
        localStorage.setItem('authtoken', userData.accessToken ?? '')
        localStorage.setItem('user', JSON.stringify(userData))

        emit('login-sucess')
    }catch(err: any){
      errorMessage.value = err.response?.data?.message || 'Invalid credentials'
    } finally {
      loading.value = false
    } 
}
</script>
