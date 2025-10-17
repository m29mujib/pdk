<template>
  <div class="min-h-screen bg-[#f6f8fb] p-8">
    <!-- Page Header -->
    <div class="mb-6">
      <h1 class="text-2xl font-semibold text-gray-800">Manajemen Pengguna</h1>
      <p class="text-gray-500">Kelola akun pengguna, role, dan izin</p>
    </div>

    <!-- Main Card -->
    <div class="bg-[white] rounded-lg shadow-sm border border-gray-100 px-6 py-6">
      <!-- Header Card -->
      <div class="flex justify-between items-center mb-4">
        <div>
          <h2 class="text-lg font-semibold text-gray-800">Daftar Pengguna</h2>
          <p class="text-sm text-gray-500">Lihat dan kelola semua pengguna terdaftar</p>
        </div>
        <button class="bg-[#03386B] hover:bg-[#1565c0] text-white px-3 py-3 rounded-md" @click="openModal">+ Tambah Pengguna</button>
      </div>

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

     <!-- Modal Tambah Pengguna -->
    <a-modal
      v-model:open="visible"
      :footer="null"
      :mask-closable="false"
      destroy-on-close
      centered
      width="800px"
      body-style="max-height: 80vh; overflow-y: auto; border-radius: 12px;"
      style="top: 0;"
    >
      <template #title>
        <h3 class="text-lg font-semibold text-[#03386B]">Tambah Pengguna Baru</h3>
      </template>

      <!-- Komponen Form -->
      <AddDialogDaftarPengguna @close="closeModal" />
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import type { ColumnsType } from "ant-design-vue/es/table"
import { SearchOutlined } from '@ant-design/icons-vue'
import { Icon } from '@iconify/vue';
import AddDialogDaftarPengguna from './AddDialogDaftarPengguna.vue'
const visible = ref(false)

const openModal = () => {
  visible.value = true
}

const closeModal = () => {
  visible.value = false
}

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
  { key: 6, name: "Mujib", email: "mujib@gmail.com", role: "Administrator", status: "Aktif", registered: "2024-12-23" },
  { key: 7, name: "Mamang", email: "mamang@gmail.com", role: "Administrator", status: "Aktif", registered: "2024-12-23" },
  { key: 8, name: "Anam", email: "kikigara@gmail.com", role: "Administrator", status: "Aktif", registered: "2024-12-23" },
  { key: 9, name: "Dini", email: "maulkika@gmail.com", role: "Administrator", status: "Aktif", registered: "2024-12-23" },
  { key: 10, name: "Dela", email: "satriohilmi@gmail.com", role: "Administrator", status: "Aktif", registered: "2024-12-23" },
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
