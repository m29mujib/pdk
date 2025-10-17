<template>
  <div class="min-h-screen bg-[#f6f8fb] p-8">
    <!-- Page Header -->
    <div class="mb-6">
      <h1 class="text-2xl font-semibold text-gray-800">Pengajuan Lupa Kata Sandi Pengguna</h1>
      <p class="text-gray-500">Pengelolaan pengajuan lupa kata sandi user</p>
    </div>

    <!-- Main Card -->
    <div class="bg-[white] rounded-lg shadow-sm border border-gray-100 px-6 py-6">
      <!-- Header Card -->
     

      <!-- Search & Filter -->
      <div class="flex gap-2 mb-4">
        <a-input
          v-model="searchText"
          placeholder="Cari Users....."
          class="custom-input"
          style="width: 240px; background-color: #eaeaea;"
          allow-clear
        >
          <template #prefix>
        <!-- ✅ Gunakan SearchOutlined langsung -->
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

      <!-- Table -->
      <a-table :columns="columns" :data-source="data" row-key="key" :pagination="{ pageSize: 5 }">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'actions'">
        <a-space>
          <template v-for="btn in actions" :key="btn.action">
            <a-tooltip :title="btn.tooltip">
              <a-button
                :style="{
                  backgroundColor: btn.color,
                  border: 'none',
                  color: 'white',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }"
                @click="handleAction(btn.action, record)"
              >
                <template #icon>
                  <Icon :icon="btn.icon" style="margin-right: 4px;"/>
                </template>
                {{ btn.label }}
              </a-button>
            </a-tooltip>
          </template>
        </a-space>
      </template>
    </template>
  </a-table>

      <!-- Custom Pagination Info -->
      <div class="flex justify-between items-center mt-4">
        <div class="text-sm text-gray-500">
          Menampilkan
          {{ displayedCount }} dari {{ filteredData.length }} pengguna
        </div>

        <a-pagination
          v-model:current="pagination.current"
          :page-size="pagination.pageSize"
          :total="filteredData.length"
          :show-size-changer="false"
          :show-less-items="true"
          :locale="paginationLocale"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import type { ColumnsType } from "ant-design-vue/es/table"
import { SearchOutlined } from '@ant-design/icons-vue'
import { Icon } from '@iconify/vue';
import { message } from 'ant-design-vue'

interface User {
  key: number
  name: string
  email: string
  role: string
  dikirim: string
  terdaftar: string
}

// Dummy data
const data = ref<User[]>([
  { key: 1, name: "John Doe", email: "johndoe@gmail.com", role: "Administrator", dikirim: "2025-08-01", terdaftar: "2024-12-23" },
  { key: 2, name: "Fakih Lana", email: "fakihlana@gmail.com", role: "Administrator", dikirim: "2025-08-01", terdaftar: "2024-12-23" },
  { key: 3, name: "Kiki Gara", email: "kikigara@gmail.com", role: "Administrator", dikirim: "2025-08-01", terdaftar: "2024-12-23" },
  { key: 4, name: "Maul Kika", email: "maulkika@gmail.com", role: "Administrator", dikirim: "2025-08-01", terdaftar: "2024-12-23" },
  { key: 5, name: "Satrio Hilmi", email: "satriohilmi@gmail.com", role: "Administrator", dikirim: "2025-08-01", terdaftar: "2024-12-23" },
  { key: 6, name: "Mujib", email: "mujib@gmail.com", role: "Administrator", dikirim: "2025-08-01", terdaftar: "2024-12-23" },
  { key: 7, name: "Mamang", email: "mamang@gmail.com", role: "Administrator", dikirim: "2025-08-01", terdaftar: "2024-12-23" },
  { key: 8, name: "Anam", email: "kikigara@gmail.com", role: "Administrator", dikirim: "2025-08-01", terdaftar: "2024-12-23" },
  { key: 9, name: "Dini", email: "maulkika@gmail.com", role: "Administrator", dikirim: "2025-08-01", terdaftar: "2024-12-23" },
  { key: 10, name: "Dela", email: "satriohilmi@gmail.com", role: "Administrator", dikirim: "2025-08-01", terdaftar: "2024-12-23" },
])

const searchText = ref("")

// Kolom tabel
const columns: ColumnsType<User> = [
  { title: "Nama", dataIndex: "name", key: "name" },
  { title: "Email", dataIndex: "email", key: "email" },
  { title: "Role", dataIndex: "role", key: "role" },
  { title: "Dikirim", dataIndex: "dikirim", key: "dikirim" },
  { title: "Terdaftar", dataIndex: "terdaftar", key: "terdaftar" },
  { title: "Actions", key: "actions", align: "center", width: 60 },
]

const actions = [
  {
    action: 'approve',
    label: 'Approve',
    icon: 'ri:check-line',
    color: '#2AC54F',
    tooltip: 'Setujui data ini',
    size: 'small'
  },
  {
    action: 'reject',
    label: 'Rejected',
    icon: 'ri:close-line',
    color: '#FF0000',
    tooltip: 'Tolak data ini',
    size: 'small'
  }
]

// Pagination config
const pagination = ref({
  current: 1,
  pageSize: 5,
})

// Custom locale untuk tombol
const paginationLocale = {
  prev_page: "Sebelumnya",
  next_page: "Selanjutnya",
}

// Filter pencarian
const filteredData = computed(() => {
  if (!searchText.value) return data.value
  return data.value.filter(
    (u) =>
      u.name.toLowerCase().includes(searchText.value.toLowerCase()) ||
      u.email.toLowerCase().includes(searchText.value.toLowerCase())
  )
})

// Data per halaman
const paginatedData = computed(() => {
  const start = (pagination.value.current - 1) * pagination.value.pageSize
  return filteredData.value.slice(start, start + pagination.value.pageSize)
})

// Hitung jumlah ditampilkan
const displayedCount = computed(() => {
  const end = Math.min(
    pagination.value.current * pagination.value.pageSize,
    filteredData.value.length
  )
  return end
})

// Action handlers

const handleAction = (action: string, record: User) => {
  if (action === 'approve') {
    message.success(`✅ ${record.name} disetujui`)
  } else if (action === 'reject') {
    message.error(`❌ ${record.name} ditolak`)
  }
}
</script>

<style scoped>
.ant-table-thead > tr > th {
  background-color: #fafafa !important;
  font-weight: 600;
  color: #333;
}
.ant-pagination {
  margin: 0;
}
.ant-pagination-item-active {
  border-color: #0d47a1 !important;
}
.ant-pagination-item-active a {
  color: #0d47a1 !important;
}
:deep(.custom-input input::placeholder) {
  color: #111827; /* Tailwind: text-gray-900 */
  padding: 10px;
  background-color: #eaeaea;
}
:deep(.custom-input.ant-input-affix-wrapper-focused .ant-input) {
  background-color: #eaeaea !important;
  /* pertahankan abu-abu */
}

</style>
