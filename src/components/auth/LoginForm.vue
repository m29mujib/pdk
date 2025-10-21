<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const checkbox = ref(true)
const username = ref('')
const password = ref('')
const showPassword = ref(false)
const loading = ref(false)

// Validasi form
const usernameRules = [
  (v: string) => !!v || 'Username wajib diisi',
  (v: string) => v.length >= 3 || 'Minimal 3 karakter'
]

const passwordRules = [
  (v: string) => !!v || 'Password wajib diisi',
  (v: string) => v.length >= 6 || 'Minimal 6 karakter'
]

// Fungsi login sederhana
const handleLogin = async () => {
  if (!username.value || !password.value) return

  loading.value = true
  try {
    // Simulasi API login
    await new Promise(resolve => setTimeout(resolve, 1000))

    // ✅ Validasi login dummy
    if (username.value === 'admin' && password.value === '123456') {
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('user', JSON.stringify({ username: username.value }))
      localStorage.setItem('token', 'fake-jwt-token')

      // Redirect ke dashboard
      router.push('/dashboard')
    } else {
      alert('Username atau password salah!\nGunakan admin / 123456 untuk demo.')
    }
  } catch (error) {
    console.error('Login error:', error)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <v-form @submit.prevent="handleLogin">
    <v-row class="d-flex mb-3">
      <v-col cols="12">
        <v-label class="mb-1">Username</v-label>
        <v-text-field
          v-model="username"
          variant="outlined"
          hide-details="auto"
          color="primary"
          :rules="usernameRules"
          placeholder="Masukkan username"
        ></v-text-field>
      </v-col>

      <v-col cols="12">
        <v-label class="mb-1">Password</v-label>
        <v-text-field
          v-model="password"
          variant="outlined"
          :type="showPassword ? 'text' : 'password'"
          hide-details="auto"
          color="primary"
          :rules="passwordRules"
          placeholder="Masukkan password"
          :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append-inner="showPassword = !showPassword"
        ></v-text-field>
      </v-col>

      <v-col cols="12" class="pt-0">
        <div class="d-flex flex-wrap align-center ml-n2">
          <v-checkbox v-model="checkbox" color="primary" hide-details>
            <template #label>
              <span class="text-body-1">Ingat perangkat ini</span>
            </template>
          </v-checkbox>
          <div class="ml-sm-auto">
            <RouterLink
              to="/auth/forgot-password"
              class="text-primary text-decoration-none text-body-1 opacity-1 font-weight-medium"
            >
              Lupa Password?
            </RouterLink>
          </div>
        </div>
      </v-col>

      <v-col cols="12" class="pt-0">
        <v-btn
          type="submit"
          color="primary"
          size="large"
          block
          flat
          :loading="loading"
        >
          Masuk
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>
