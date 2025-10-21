<template>
  <div class="p-8">
    <!--  Header -->
    <div class="mb-6">
      <h1 class="text-[24px] font-bold text-[#03386B]">Levelisasi & Manajemen Role</h1>
      <p class="text-[#55565A] text-[16px]">
        kelola role dan level pengguna aplikasi mobile
      </p>
    </div>

    <!--  Card Container -->
    <div class="bg-[#fff] rounded-lg shadow-sm border border-gray-100 px-6 py-6">
      <!--  Search & Filter -->
      <div class="flex gap-2 mb-4">
        <a-input
          v-model="searchText"
          placeholder="Cari..."
          class="custom-input"
          style="width: 240px; background-color: #eaeaea;"
          allow-clear
        >
          <template #prefix>
            <SearchOutlined style="color: #333;" />
          </template>
        </a-input>

        <a-button class="flex justify-center items-center">
          <template #icon>
            <Icon icon="ri:filter-line" style="font-size: 16px; margin-right: 4px;" />
          </template>
          Filter
        </a-button>
      </div>

      <!--  Reusable Editable Table -->
      <EditableTable
        :columns="columns"
        :data="filteredData"
        row-key="key"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { SearchOutlined } from '@ant-design/icons-vue'
import { Icon } from '@iconify/vue'
import EditableTable from '@/components/tabel/EditableTable.vue'
import type { ColumnsType } from 'ant-design-vue/es/table'

interface LogAkses {
  key: number
  waktu: string
  pengguna: string
  role: string
  alamat_ip: string
  status: string
  detail: string
}

const searchText = ref('')
const selectedModule = ref<string | undefined>(undefined)

const data = ref<LogAkses[]>([
  { key: 1, waktu: '2025-10-18 08:45', pengguna: 'John Doe', role: 'Administrator', alamat_ip: '192.168.1.12', status: 'Berhasil', detail: 'Login ke sistem' },
  { key: 2, waktu: '2025-10-18 09:15', pengguna: 'Fakih Lana', role: 'User', alamat_ip: '192.168.1.33', status: 'Gagal', detail: 'Password salah' },
  { key: 3, waktu: '2025-10-18 10:02', pengguna: 'Kiki Gara', role: 'Supervisor', alamat_ip: '10.0.0.15', status: 'Berhasil', detail: 'Melihat laporan' },
  { key: 4, waktu: '2025-10-18 10:30', pengguna: 'Maul Kika', role: 'Administrator', alamat_ip: '172.16.0.22', status: 'Berhasil', detail: 'Mengubah data pengguna' },
  { key: 5, waktu: '2025-10-18 11:10', pengguna: 'Satrio Hilmi', role: 'User', alamat_ip: '192.168.10.5', status: 'Gagal', detail: 'Akses ditolak' },
  { key: 6, waktu: '2025-10-18 11:35', pengguna: 'Mujib', role: 'Administrator', alamat_ip: '10.10.0.8', status: 'Berhasil', detail: 'Menambahkan data baru' },
])

// 📑 Kolom Tabel
const columns: ColumnsType<LogAkses> = [
  { title: 'Waktu', dataIndex: 'waktu', key: 'waktu' },
  { title: 'Pengguna', dataIndex: 'pengguna', key: 'pengguna' },
  { title: 'Role', dataIndex: 'role', key: 'role' },
  { title: 'Alamat IP', dataIndex: 'alamat_ip', key: 'alamat_ip' },
  { title: 'Status', dataIndex: 'status', key: 'status' },
  { title: 'Detail', dataIndex: 'detail', key: 'detail' },
]

// 🎯 Tombol aksi (reusable dan rapi)

// 🔎 Filter Pencarian
const filteredData = computed(() => {
  if (!searchText.value) return data.value
  return data.value.filter((log) =>
    Object.values(log).some((v) =>
      String(v).toLowerCase().includes(searchText.value.toLowerCase())
    )
  )
})

// 🧩 Event Aksi
const onView = (record: LogAkses) => {
  console.log('👁️ Melihat detail aktivitas:', record)
}

const onDelete = (record: LogAkses) => {
  console.log('🗑️ Hapus log aktivitas:', record)
}
</script>

<style scoped>
:deep(.custom-input input::placeholder) {
  color: #111827;
  background-color: #eaeaea;
}
:deep(.custom-input.ant-input-affix-wrapper-focused .ant-input) {
  background-color: #eaeaea !important;
}

.custom-select-gray :deep(.ant-select-selector) {
  background-color: #eaeaea !important;
  border: none !important;
  border-radius: 6px !important;
}

.custom-select-gray :deep(.ant-select-selection-item),
.custom-select-gray :deep(.ant-select-selection-placeholder) {
  color: #333 !important;
}
:deep(.custom-input input::placeholder) {
  color: #111827;
  padding: 10px;
  background-color: #eaeaea;
}
:deep(.custom-input.ant-input-affix-wrapper-focused .ant-input) {
  background-color: #eaeaea !important;
}
</style>
