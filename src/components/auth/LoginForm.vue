<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const checkbox = ref(true);
const username = ref('');
const password = ref('');
const showPassword = ref(false);
const loading = ref(false);

// Form validation rules
const usernameRules = [
    (v: string) => !!v || 'Username is required',
    (v: string) => v.length >= 3 || 'Username must be at least 3 characters'
];

const passwordRules = [
    (v: string) => !!v || 'Password is required',
    (v: string) => v.length >= 6 || 'Password must be at least 6 characters'
];

// Handle login
const handleLogin = async () => {
    if (!username.value || !password.value) {
        return;
    }

    loading.value = true;

    try {
        // Simulate login API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Store auth state (in a real app, you'd use a proper auth store)
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('user', JSON.stringify({ username: username.value }));

        // Redirect to dashboard
        router.push('/');
    } catch (error) {
        console.error('Login error:', error);
    } finally {
        loading.value = false;
    }
};
</script>

<template>
    <v-form @submit.prevent="handleLogin">
        <v-row class="d-flex mb-3">
            <v-col cols="12">
                <v-label class="mb-1">Username</v-label>
                <v-text-field v-model="username" variant="outlined" hide-details="auto" color="primary"
                    :rules="usernameRules" placeholder="Enter your username"></v-text-field>
            </v-col>
            <v-col cols="12">
                <v-label class="mb-1">Password</v-label>
                <v-text-field v-model="password" variant="outlined" :type="showPassword ? 'text' : 'password'"
                    hide-details="auto" color="primary" :rules="passwordRules" placeholder="Enter your password"
                    :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append-inner="showPassword = !showPassword"></v-text-field>
            </v-col>
            <v-col cols="12" class="pt-0">
                <div class="d-flex flex-wrap align-center ml-n2">
                    <v-checkbox v-model="checkbox" color="primary" hide-details>
                        <template v-slot:label class="text-body-1">Remember this Device</template>
                    </v-checkbox>
                    <div class="ml-sm-auto">
                        <RouterLink to="/"
                            class="text-primary text-decoration-none text-body-1 opacity-1 font-weight-medium">Forgot
                            Password ?</RouterLink>
                    </div>
                </div>
            </v-col>
            <v-col cols="12" class="pt-0">
                <v-btn type="submit" color="primary" size="large" block flat :loading="loading"
                    :disabled="!username || !password">
                    Sign in
                </v-btn>
            </v-col>
        </v-row>
    </v-form>
</template>
