<script setup lang="ts">
import Logo from '@/layouts/full/logo/Logo.vue';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
/* Login form */
import LoginForm from '@/components/auth/LoginForm.vue';

const router = useRouter();

// Check if user is already authenticated
onMounted(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
        router.push('/');
    }
});
</script>
<template>
    <div class="authentication">
        <v-container fluid class="pa-3">
            <v-row class="h-100vh d-flex justify-center align-center">
                <v-col cols="12" lg="4" xl="3" class="d-flex align-center">
                    <v-card rounded="md" elevation="10" class="px-sm-1 px-0 withbg mx-auto" max-width="500">
                        <v-card-item class="pa-sm-8">
                            <div class="d-flex justify-center py-4">
                                <Logo />
                            </div>

                            <div class="text-center mb-4">
                                <h3 class="text-h4 font-weight-bold mb-2">Welcome Back!</h3>
                                <p class="text-subtitle-1 text-medium-emphasis">
                                    Please sign in to your account
                                </p>
                            </div>

                            <LoginForm />

                            <v-divider class="my-4"></v-divider>

                            <h6 class="text-h6 text-muted font-weight-medium d-flex justify-center align-center mt-3">
                                New to Flexy?
                                <RouterLink to="/auth/register"
                                    class="text-primary text-decoration-none text-body-1 opacity-1 font-weight-medium pl-2">
                                    Create an account</RouterLink>
                            </h6>
                        </v-card-item>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
