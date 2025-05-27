<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8">
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Admin Login</h2>

      <form @submit.prevent="login" class="space-y-5">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            v-model="password"
            class="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter admin password"
            required
          />
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const password = ref('')
const router = useRouter()

function login() {
  if (password.value === 'admin123') {
    localStorage.setItem('auth', 'true')
    router.push('/admin')
  } else {
    alert('❌ Incorrect password. Please try again.')
  }
}
</script>
