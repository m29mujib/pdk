<template>
  <div class="min-h-screen bg-[#f6f8fb] p-8">
    <!-- Page Header -->
    <div class="mb-6">
      <h1 class="text-2xl font-semibold text-gray-800">Manajemen Pengguna</h1>
      <p class="text-gray-500">Kelola akun pengguna, role, dan izin</p>
    </div>

    <!-- Main Card -->
    <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
      <!-- Header Card -->
      <div class="flex justify-between items-center mb-4">
        <div>
          <h2 class="text-lg font-semibold text-gray-800">Daftar Pengguna</h2>
          <p class="text-sm text-gray-500">Lihat dan kelola semua pengguna terdaftar</p>
        </div>
        <a-button type="primary" class="bg-[#0d47a1] hover:bg-[#1565c0]">+ Tambah Pengguna</a-button>
      </div>

      <!-- Search & Filter -->
      <div class="flex gap-2 mb-4">
        <a-input
          v-model="searchText"
          placeholder="Cari Users....."
          style="width: 240px"
          allow-clear
        />
        <a-button icon="filter-outlined">Filter</a-button>
      </div>

      <!-- Table -->
      <a-table
        :columns="columns"
        :data-source="paginatedData"
        :pagination="false"
        row-key="key"
        bordered
        class="rounded-md overflow-hidden"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'actions'">
            <a-dropdown placement="bottomRight">
              <template #overlay>
                <a-menu>
                  <a-menu-item key="1" @click="onEdit(record)">✏️ Edit</a-menu-item>
                  <a-menu-item key="2" danger @click="onDelete(record)">🗑️ Hapus</a-menu-item>
                </a-menu>
              </template>
              <a-button type="text" class="text-lg">...</a-button>
            </a-dropdown>
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

interface User {
  key: number
  name: string
  email: string
  role: string
  status: string
  registered: string
}

// Dummy data
const data = ref<User[]>([
  { key: 1, name: "John Doe", email: "johndoe@gmail.com", role: "Administrator", status: "Aktif", registered: "2024-12-23" },
  { key: 2, name: "Fakih Lana", email: "fakihlana@gmail.com", role: "Administrator", status: "Aktif", registered: "2024-12-23" },
  { key: 3, name: "Kiki Gara", email: "kikigara@gmail.com", role: "Administrator", status: "Aktif", registered: "2024-12-23" },
  { key: 4, name: "Maul Kika", email: "maulkika@gmail.com", role: "Administrator", status: "Aktif", registered: "2024-12-23" },
  { key: 5, name: "Satrio Hilmi", email: "satriohilmi@gmail.com", role: "Administrator", status: "Aktif", registered: "2024-12-23" },
  { key: 6, name: "John Doe", email: "johndoe@gmail.com", role: "Administrator", status: "Aktif", registered: "2024-12-23" },
  { key: 7, name: "Fakih Lana", email: "fakihlana@gmail.com", role: "Administrator", status: "Aktif", registered: "2024-12-23" },
  { key: 8, name: "Kiki Gara", email: "kikigara@gmail.com", role: "Administrator", status: "Aktif", registered: "2024-12-23" },
  { key: 9, name: "Maul Kika", email: "maulkika@gmail.com", role: "Administrator", status: "Aktif", registered: "2024-12-23" },
  { key: 10, name: "Satrio Hilmi", email: "satriohilmi@gmail.com", role: "Administrator", status: "Aktif", registered: "2024-12-23" },
])

const searchText = ref("")

// Kolom tabel
const columns: ColumnsType<User> = [
  { title: "Nama", dataIndex: "name", key: "name" },
  { title: "Email", dataIndex: "email", key: "email" },
  { title: "Role", dataIndex: "role", key: "role" },
  { title: "Status", dataIndex: "status", key: "status" },
  { title: "Terdaftar", dataIndex: "registered", key: "registered" },
  { title: "", key: "actions", align: "center", width: 60 },
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
const onEdit = (record: User) => {
  console.log("Edit user:", record)
}

const onDelete = (record: User) => {
  console.log("Hapus user:", record)
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
</style>
