<template>
  <a-modal
    v-model:open="visible"
    title="Buat Jadwal Juknis Baru"
    :footer="null"
    centered
    width="600px"
  >
    <p class="text-gray-500 text-sm mb-4">
      Tambahkan jadwal Juknis baru ke kalender
    </p>

    <a-form layout="vertical" @submit.prevent="handleSubmit" class="space-y-4">
      <!-- Judul -->
      <a-form-item label="Judul">
        <a-input
          v-model:value="form.judul"
          placeholder="Masukan judul"
          class="bg-gray-100"
        />
      </a-form-item>

      <!-- Lembaga -->
      <a-form-item label="Lembaga">
        <a-select
          v-model:value="form.lembaga"
          placeholder="Pilih lembaga"
          class="bg-gray-100"
        >
          <a-select-option value="PLN">PT PLN (Persero)</a-select-option>
          <a-select-option value="ICON+">ICON+</a-select-option>
          <a-select-option value="ESDM">Kementerian ESDM</a-select-option>
        </a-select>
      </a-form-item>

      <!-- Tanggal & Waktu -->
      <div class="grid grid-cols-2 gap-3">
        <a-form-item label="Tanggal">
          <a-date-picker
            v-model:value="form.tanggal"
            format="DD/MM/YYYY"
            class="w-full bg-gray-100"
            placeholder="dd/mm/yyyy"
          />
        </a-form-item>

        <a-form-item label="Waktu">
          <a-time-picker
            v-model:value="form.waktu"
            format="HH:mm"
            class="w-full bg-gray-100"
            placeholder="--:--"
          />
        </a-form-item>
      </div>

      <!-- Prioritas -->
      <a-form-item label="Prioritas">
        <a-select
          v-model:value="form.prioritas"
          placeholder="Pilih prioritas"
          class="bg-gray-100"
        >
          <a-select-option value="Tinggi">Tinggi</a-select-option>
          <a-select-option value="Sedang">Sedang</a-select-option>
          <a-select-option value="Rendah">Rendah</a-select-option>
        </a-select>
      </a-form-item>

      <!-- Deskripsi -->
      <a-form-item label="Deskripsi">
        <a-textarea
          v-model:value="form.deskripsi"
          rows="3"
          placeholder="Masukan deskripsi"
          class="bg-gray-100"
        />
      </a-form-item>

      <!-- Tombol -->
      <div class="flex justify-end gap-3 mt-6">
        <a-button @click="handleCancel">Batal</a-button>
        <a-button
          type="primary"
          class="bg-[#003366] hover:bg-[#002855] text-white font-medium"
          @click="handleSubmit"
        >
          Buat Jadwal
        </a-button>
      </div>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import dayjs from 'dayjs'
import { message } from 'ant-design-vue'

const visible = ref(false)

const form = ref({
  judul: '',
  lembaga: '',
  tanggal: null as any,
  waktu: null as any,
  prioritas: '',
  deskripsi: '',
})

// fungsi untuk membuka modal
const openModal = () => {
  visible.value = true
}

// fungsi untuk menutup modal
const handleCancel = () => {
  visible.value = false
}

// fungsi submit
const handleSubmit = () => {
  console.log('Form data:', {
    ...form.value,
    tanggal: form.value.tanggal
      ? dayjs(form.value.tanggal).format('YYYY-MM-DD')
      : null,
    waktu: form.value.waktu
      ? dayjs(form.value.waktu).format('HH:mm')
      : null,
  })
  message.success('✅ Jadwal baru berhasil dibuat!')
  visible.value = false
}

// expose agar bisa dipanggil dari parent
defineExpose({
  openModal,
})
</script>

<style scoped>
/* .ant-modal-title {
  @apply text-lg font-semibold text-gray-800;
}
.ant-form-item-label > label {
  @apply text-gray-700 font-medium;
} */
</style>
