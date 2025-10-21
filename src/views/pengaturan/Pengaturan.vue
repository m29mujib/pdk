<template>
  <div class=" p-8">
    <!-- Header -->
    <div class="mb-6">
      <h1 class="text-[24px] font-bold text-[#03386B]">Pengaturan & Keamanan</h1>
      <p class="text-[#55565A] text-[16px]">Kelola keamanan sistem dan implementasi SSL</p>
    </div>

    <!-- Section: Basic -->
   <a-card class="border border-gray-200 rounded-lg shadow-sm overflow-hidden mb-6">
  <div class="p-4">
    <h2 class="text-[18px] font-semibold text-[#03386B] mb-4">Basic</h2>

    <!-- Row 1: Password -->
    <v-row class="items-center py-3 border-b border-gray-200">
      <v-col cols="12" md="12" class="flex justify-between items-center">
        <!-- Kiri -->
        <div>
          <p class="text-[15px] font-semibold text-gray-800 mb-1">Password</p>
          <p class="text-[14px] text-gray-500">Atur password untuk menjaga akun anda</p>
        </div>

        <!-- Kanan -->
        <div class="flex items-center gap-3">
          <span class="font-mono text-lg tracking-widest">************</span>
          <span class="text-green-600 text-sm font-medium flex items-center">
            <Icon icon="ri:shield-check-line" class="mr-1 text-base" /> Sangat Aman
          </span>
          <a-button
            type="default"
            class="ml-4 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50"
          >
            Edit
          </a-button>
        </div>
      </v-col>
    </v-row>

    <!-- Row 2: Two-step Verification -->
    <v-row class="items-center py-3">
      <v-col cols="12" md="12" class="flex justify-between items-center">
        <!-- Kiri -->
        <div>
          <p class="text-[15px] font-semibold text-gray-800 mb-1">Two-step verification</p>
          <p class="text-[14px] text-gray-500 w-[90%]">
            Kami merekomendasikan untuk menambahkan verification code pada password anda
          </p>
        </div>

        <!-- Kanan -->
        <div class="flex items-center gap-3">
          <a-switch v-model:checked="twoStep" />
          <span class="text-gray-700 font-medium">Two-step verification</span>
          <a-button
            type="default"
            class="border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50"
          >
            Edit
          </a-button>
        </div>
      </v-col>
    </v-row>
  </div>
</a-card>


    <!-- Section: Browser & Device -->
    <a-card class="border border-gray-200 rounded-lg shadow-sm">
      <div class="p-4">
        <h2 class="text-[18px] font-semibold text-[#03386B] mb-1">Browser dan Perangkat</h2>
        <p class="text-[#55565A] mb-4">
          Browser dan perangkat sekarang yang masuk ke akun anda. Hapus perangkat yang tidak dikenal
        </p>

        <!-- Reusable Table -->
        <EditableTable
          :columns="columns"
          :data="data"
          :actions="actions"
          row-key="key"
          @delete="(record) => handleDelete(record as Device)"
        />
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import EditableTable from '@/components/tabel/EditableTable.vue'

interface Device {
  key: number
  browser: string
  ip: string
  lokasi: string
  waktu: string
}

const twoStep = ref(true)

const data = ref<Device[]>([
  { key: 1, browser: 'Brave on Mac OS X', ip: '192.168.1.100', lokasi: 'Jakarta, Indonesia', waktu: '15 Menit yang lalu' },
  { key: 2, browser: 'Brave on Mac OS X', ip: '192.168.1.100', lokasi: 'Jakarta, Indonesia', waktu: '15 Menit yang lalu' },
  { key: 3, browser: 'Brave on Mac OS X', ip: '192.168.1.100', lokasi: 'Jakarta, Indonesia', waktu: '15 Menit yang lalu' },
  { key: 4, browser: 'Brave on Mac OS X', ip: '192.168.1.100', lokasi: 'Jakarta, Indonesia', waktu: '15 Menit yang lalu' },
  { key: 5, browser: 'Brave on Mac OS X', ip: '192.168.1.100', lokasi: 'Jakarta, Indonesia', waktu: '15 Menit yang lalu' },
])

const columns = [
  { title: '', dataIndex: 'check', key: 'check', width: 60 },
  { title: 'Browser', dataIndex: 'browser', key: 'browser' },
  { title: 'IP Address', dataIndex: 'ip', key: 'ip' },
  { title: 'Lokasi', dataIndex: 'lokasi', key: 'lokasi' },
  { title: 'Waktu Masuk', dataIndex: 'waktu', key: 'waktu' },
  { title: 'Actions', dataIndex: 'operation', key: 'operation', width: 100 },
]

const actions = [
  {
    key: 'delete',
    label: '',
    icon: 'ri:delete-bin-6-line',
    event: 'delete',
    style: {
      backgroundColor: 'transparent',
      color: '#333',
      borderRadius: '6px',
      border: 'none',
      width: '36px',
      height: '36px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }
  }
]

const handleDelete = (record: Device) => {
  console.log('Hapus perangkat:', record)
  data.value = data.value.filter(d => d.key !== record.key)
}
</script>

<style scoped>
:deep(.ant-card) {
  background-color: #fff;
}
</style>
