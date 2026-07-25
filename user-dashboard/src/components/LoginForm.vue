<template>
  <div>
    <form @submit.prevent="handleLogin" class="login-form">
      <h2>Login</h2>
      <div class="form-group">
        <label for="username">Username</label>
        <input
          id="username"
          type="text"
          v-model="username"
          required
          placeholder="e.g., emilys"
        />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          id="password"
          type="password"
          v-model="password"
          required
          placeholder="e.g., emilyspass"
        />
      </div>
      <button type="submit" :disabled="loading">
        {{ loading ? "Logging in..." : "Login" }}
      </button>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </form>
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
