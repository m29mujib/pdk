<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { UserIcon, MailIcon, ListCheckIcon, ChevronDownIcon } from 'vue-tabler-icons'

const user = ref({
  name: 'Admin System',
  role: 'Super Administrator',
  avatar: '@/assets/images/users/user-1.jpg'
})

const router = useRouter()

const handleLogout = async () => {
  // Bersihkan semua data autentikasi
  localStorage.clear()
  sessionStorage.clear()

  // Tunggu sejenak supaya guard membaca state terbaru
  await new Promise((resolve) => setTimeout(resolve, 100))

  // Arahkan ke login
  router.replace('/login')
}
</script>

<template>
  <!-- Menu Profil -->
  <v-menu :close-on-content-click="false" location="bottom end" transition="scale-transition">
    <template #activator="{ props }">
      <v-btn variant="text" class="d-flex align-center gap-2" v-bind="props">
        <!-- Avatar -->
        <v-avatar size="35"> <img src="@/assets/images/users/user-1.jpg" height="35" alt="user" /> </v-avatar>

        <!-- Info User -->
        <div class="text-start ms-2 hidden-sm-and-down">
          <div class="text-body-2 fw-600 text-black">{{ user.name }}</div>
          <div class="text-caption text-grey-darken-1">{{ user.role }}</div>
        </div>

        <!-- Chevron -->
        <ChevronDownIcon size="16" stroke-width="1.5" class="text-grey-darken-1 ms-1 hidden-sm-and-down" />
      </v-btn>
    </template>

    <!-- Dropdown -->
    <v-sheet rounded="md" width="200" elevation="10" class="mt-2">
      <v-list class="py-0" lines="one" density="compact">
        <v-list-item value="item1" color="primary">
          <template #prepend>
            <UserIcon stroke-width="1.5" size="20" />
          </template>
          <v-list-item-title class="pl-4 text-body-1">My Profile</v-list-item-title>
        </v-list-item>

        <v-list-item value="item2" color="primary">
          <template #prepend>
            <MailIcon stroke-width="1.5" size="20" />
          </template>
          <v-list-item-title class="pl-4 text-body-1">My Account</v-list-item-title>
        </v-list-item>

        <v-list-item value="item3" color="primary">
          <template #prepend>
            <ListCheckIcon stroke-width="1.5" size="20" />
          </template>
          <v-list-item-title class="pl-4 text-body-1">My Task</v-list-item-title>
        </v-list-item>
      </v-list>

      <div class="pt-4 pb-4 px-5 text-center">
        <v-btn color="primary" variant="outlined" block @click="handleLogout">Logout</v-btn>
      </div>
    </v-sheet>
  </v-menu>
</template>

<style scoped>
.fw-600 {
  font-weight: 600;
}
.text-grey-darken-1 {
  color: #6b7280 !important;
}
</style>
