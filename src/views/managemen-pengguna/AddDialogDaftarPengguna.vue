<script setup lang="ts">
import { ref } from 'vue'
import { UploadOutlined } from '@ant-design/icons-vue'
import type { UploadChangeParam } from 'ant-design-vue'

// State form
const form = ref({
  namaLengkap: '',
  nik: '',
  email: '',
  telepon: '',
  role: 'Admin Dukcapil',
  status: true,
  foto: null as File | null
})
const emit = defineEmits(['close'])

// Handle upload
const handleUpload = (info: UploadChangeParam) => {
  const file = info.file.originFileObj as File
  form.value.foto = file
}

// Submit
const handleSubmit = () => {
  console.log('Form Data:', form.value)
}
</script>

<template>
  <div class="mb-8 px-2">
      <h2 class="text-[24px] font-semibold text-[#03386B]">Tambah Pengguna Baru</h2>
      <p class="text-[#55565A] text-[16px]">Buat akun pengguna baru</p>
    </div>
  <div class="h-full bg-[#FFF] py-8 px-6 rounded-lg">
    <!-- Form -->
    <a-form layout="vertical" @submit.prevent="handleSubmit">
      <div class="flex w-full gap-6 justify-center py-6 px-6">
        <!-- KIRI -->
        <div class="bg-white rounded-lg border border-gray-200 py-6 px-6 shadow-sm w-full mr-4">
          <h3 class="text-gray-800 font-semibold mb-1">Informasi Pengguna</h3>
          <p class="text-gray-500 text-sm mb-5">Detail akun pengguna dasar</p>

          <div class="space-y-4">
            <a-form-item label="Nama Lengkap">
              <a-input
                v-model:value="form.namaLengkap"
                placeholder="Masukan nama lengkap"
              />
            </a-form-item>

            <a-form-item label="NIK">
              <a-input
                v-model:value="form.nik"
                placeholder="Masukan NIK"
              />
            </a-form-item>

            <a-form-item label="Alamat Email">
              <a-input
                v-model:value="form.email"
                placeholder="Masukan alamat email"
              />
            </a-form-item>

            <a-form-item label="Nomor Telepon">
              <a-input
                v-model:value="form.telepon"
                placeholder="Masukan nomor telepon"
              />
            </a-form-item>
          </div>
        </div>

        <!-- KANAN -->
        <div class="bg-white flex flex-col p-6 w-full">
          <!-- Pengaturan Akun -->
          <div class="bg-white rounded-lg border border-gray-200 py-6 px-6 shadow-sm">
            <h3 class="text-gray-800 font-semibold mb-1">Pengaturan Akun</h3>
            <p class="text-gray-500 text-sm mb-5">Konfigurasi role dan izin</p>

            <a-form-item label="Pengguna">
              <a-select v-model:value="form.role" style="width: 100%">
                <a-select-option value="Admin Dukcapil">Admin Dukcapil</a-select-option>
                <a-select-option value="Operator">Operator</a-select-option>
                <a-select-option value="Viewer">Viewer</a-select-option>
              </a-select>
            </a-form-item>

            <a-form-item label="Status Akun">
              <div class="flex items-center justify-between">
                <span class="text-gray-600 text-sm">
                  Aktifkan atau nonaktifkan akun pengguna
                </span>
                <a-switch v-model:checked="form.status" />
              </div>
            </a-form-item>
          </div>

          <!-- Foto Profil -->
          <div class="bg-white rounded-lg border border-gray-200 p-6 shadow-sm py-6 mt-6 px-6">
            <h3 class="text-gray-800 font-semibold mb-1">Foto Profil</h3>
            <p class="text-gray-500 text-sm mb-5">Unggah foto profil pengguna</p>

            <div class="flex flex-col items-center border border-dashed rounded-lg py-6">
              <a-upload
                :show-upload-list="false"
                accept="image/*"
                @change="handleUpload"
              >
                <a-button icon>
                  <UploadOutlined /> Upload Image
                </a-button>
              </a-upload>
              <p class="text-xs text-gray-500 mt-2">
                Recommended: 400×400px, max 2MB
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Buttons -->
      <div class="flex justify-end gap-3 mt-8">
        <a-button class="px-6">Cancel</a-button>
        <a-button
          type="primary"
          html-type="submit"
          class="bg-[#02386A] hover:!bg-[#03457C] text-white px-6"
        >
          <template #icon>
            <i class="ri-save-3-line"></i>
          </template>
          Simpan
        </a-button>
      </div>
    </a-form>
  </div>
</template>

<style scoped>
.ant-form-item {
  margin-bottom: 16px;
}
</style>
