<template>
  <div class="min-h-screen bg-[#f6f8fb] p-8">
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-[#03386B]">Manajemen Pengguna</h1>
      <p class="text-[#55565A]">Kelola akun pengguna, role, dan izin</p>
    </div>

     <div class="bg-[white] rounded-lg shadow-sm border border-gray-100 px-6 py-6">
        <div class="flex justify-between items-center mb-4">
        <div>
          <h2 class="text-[24px] font-semibold text-[#03386B]">Daftar Pengguna</h2>
          <p class="text-sm text-[#55565A]">Lihat dan kelola semua pengguna terdaftar</p>
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
         <a-table
           :columns="columns"
           :data-source="paginatedData"
           bordered
           row-key="key"
           :pagination="false"
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
         <!-- 📄 Pagination Info -->
    <div class="flex justify-between items-center mt-4">
      <!-- Info kiri -->
      <div class="text-sm text-gray-500">
        Menampilkan {{ displayedCount }} dari {{ filteredData.length }} pengguna
      </div>

      <!-- Pagination tengah + tombol kanan -->
      <div class="flex items-center gap-3">
        <a-pagination
          v-model:current="pagination.current"
          :page-size="pagination.pageSize"
          :total="filteredData.length"
          :show-size-changer="false"
          :show-less-items="true"
          size="small"
        />

        <!-- Tombol kanan -->
        <div class="flex items-center gap-2 ml-2">
          <a-button
            type="default"
            size="small"
            :disabled="pagination.current === 1"
            @click="goPrev"
          >
            Sebelumnya
          </a-button>
          <a-button
            type="default"
            size="small"
            :disabled="pagination.current === totalPages"
            @click="goNext"
          >
            Selanjutnya
          </a-button>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
import type { ColumnsType } from "ant-design-vue/es/table"
import { useRouter } from 'vue-router'
import { SearchOutlined } from '@ant-design/icons-vue'
import { Icon } from '@iconify/vue';
// =====================
// Interface User
// =====================
interface User {
  key: number
  name: string
  email: string
  role: string
  status: string
  registered: string
}

// =====================
// Dummy Data
// =====================
const data = ref<User[]>([
  { key: 1, name: "John Doe", email: "johndoe@gmail.com", role: "Administrator", status: "Aktif", registered: "2024-12-23" },
  { key: 2, name: "Fakih Lana", email: "fakihlana@gmail.com", role: "Administrator", status: "Aktif", registered: "2024-12-23" },
  { key: 3, name: "Kiki Gara", email: "kikigara@gmail.com", role: "Administrator", status: "Aktif", registered: "2024-12-23" },
  { key: 4, name: "Maul Kika", email: "maulkika@gmail.com", role: "Administrator", status: "Aktif", registered: "2024-12-23" },
  { key: 5, name: "Satrio Hilmi", email: "satriohilmi@gmail.com", role: "Administrator", status: "Aktif", registered: "2024-12-23" },
  { key: 6, name: "Mujib", email: "mujib@gmail.com", role: "Administrator", status: "Aktif", registered: "2024-12-23" },
  { key: 7, name: "Mamang", email: "mamang@gmail.com", role: "Administrator", status: "Aktif", registered: "2024-12-23" },
  { key: 8, name: "Anam", email: "anam@gmail.com", role: "Administrator", status: "Aktif", registered: "2024-12-23" },
  { key: 9, name: "Dini", email: "dini@gmail.com", role: "Administrator", status: "Aktif", registered: "2024-12-23" },
  { key: 10, name: "Dela", email: "dela@gmail.com", role: "Administrator", status: "Aktif", registered: "2024-12-23" },
  { key: 1, name: "John Doe", email: "johndoe@gmail.com", role: "Administrator", status: "Aktif", registered: "2024-12-23" },
  { key: 2, name: "Fakih Lana", email: "fakihlana@gmail.com", role: "Administrator", status: "Aktif", registered: "2024-12-23" },
  { key: 3, name: "Kiki Gara", email: "kikigara@gmail.com", role: "Administrator", status: "Aktif", registered: "2024-12-23" },
  { key: 4, name: "Maul Kika", email: "maulkika@gmail.com", role: "Administrator", status: "Aktif", registered: "2024-12-23" },
  { key: 5, name: "Satrio Hilmi", email: "satriohilmi@gmail.com", role: "Administrator", status: "Aktif", registered: "2024-12-23" },
  { key: 6, name: "Mujib", email: "mujib@gmail.com", role: "Administrator", status: "Aktif", registered: "2024-12-23" },
  { key: 7, name: "Mamang", email: "mamang@gmail.com", role: "Administrator", status: "Aktif", registered: "2024-12-23" },
  { key: 8, name: "Anam", email: "anam@gmail.com", role: "Administrator", status: "Aktif", registered: "2024-12-23" },
  { key: 9, name: "Dini", email: "dini@gmail.com", role: "Administrator", status: "Aktif", registered: "2024-12-23" },
  { key: 10, name: "Dela", email: "dela@gmail.com", role: "Administrator", status: "Aktif", registered: "2024-12-23" },
  { key: 1, name: "John Doe", email: "johndoe@gmail.com", role: "Administrator", status: "Aktif", registered: "2024-12-23" },
  { key: 2, name: "Fakih Lana", email: "fakihlana@gmail.com", role: "Administrator", status: "Aktif", registered: "2024-12-23" },
  { key: 3, name: "Kiki Gara", email: "kikigara@gmail.com", role: "Administrator", status: "Aktif", registered: "2024-12-23" },
  { key: 4, name: "Maul Kika", email: "maulkika@gmail.com", role: "Administrator", status: "Aktif", registered: "2024-12-23" },
  { key: 5, name: "Satrio Hilmi", email: "satriohilmi@gmail.com", role: "Administrator", status: "Aktif", registered: "2024-12-23" },
  { key: 6, name: "Mujib", email: "mujib@gmail.com", role: "Administrator", status: "Aktif", registered: "2024-12-23" },
  { key: 7, name: "Mamang", email: "mamang@gmail.com", role: "Administrator", status: "Aktif", registered: "2024-12-23" },
  { key: 8, name: "Anam", email: "anam@gmail.com", role: "Administrator", status: "Aktif", registered: "2024-12-23" },
  { key: 9, name: "Dini", email: "dini@gmail.com", role: "Administrator", status: "Aktif", registered: "2024-12-23" },
  { key: 10, name: "Dela", email: "dela@gmail.com", role: "Administrator", status: "Aktif", registered: "2024-12-23" },
  { key: 1, name: "John Doe", email: "johndoe@gmail.com", role: "Administrator", status: "Aktif", registered: "2024-12-23" },
  { key: 2, name: "Fakih Lana", email: "fakihlana@gmail.com", role: "Administrator", status: "Aktif", registered: "2024-12-23" },
  { key: 3, name: "Kiki Gara", email: "kikigara@gmail.com", role: "Administrator", status: "Aktif", registered: "2024-12-23" },
  { key: 4, name: "Maul Kika", email: "maulkika@gmail.com", role: "Administrator", status: "Aktif", registered: "2024-12-23" },
  { key: 5, name: "Satrio Hilmi", email: "satriohilmi@gmail.com", role: "Administrator", status: "Aktif", registered: "2024-12-23" },
  { key: 6, name: "Mujib", email: "mujib@gmail.com", role: "Administrator", status: "Aktif", registered: "2024-12-23" },
  { key: 7, name: "Mamang", email: "mamang@gmail.com", role: "Administrator", status: "Aktif", registered: "2024-12-23" },
  { key: 8, name: "Anam", email: "anam@gmail.com", role: "Administrator", status: "Aktif", registered: "2024-12-23" },
  { key: 9, name: "Dini", email: "dini@gmail.com", role: "Administrator", status: "Aktif", registered: "2024-12-23" },
  { key: 10, name: "Dela", email: "dela@gmail.com", role: "Administrator", status: "Aktif", registered: "2024-12-23" },
])

const columns: ColumnsType<User> = [
  { title: "Nama", dataIndex: "name", key: "name" },
  { title: "Email", dataIndex: "email", key: "email" },
  { title: "Role", dataIndex: "role", key: "role" },
  { title: "Status", dataIndex: "status", key: "status" },
  { title: "Terdaftar", dataIndex: "registered", key: "registered" },
  { title: "", key: "actions", align: "center", width: 60 },
]

const router = useRouter()
const searchText = ref("")
const openModal = () => {
  router.push({ name: 'Tambah Daftar Pengguna' }) // pakai name dari router
}

// =====================
// Pagination Logic
// =====================
const pagination = ref({
  current: 1,
  pageSize: 5,
})

// Data terfilter (jika nanti mau search/filter)
const filteredData = computed(() => data.value)

// Total halaman
const totalPages = computed(() =>
  Math.ceil(filteredData.value.length / pagination.value.pageSize)
)

// Data per halaman
const paginatedData = computed(() => {
  const start = (pagination.value.current - 1) * pagination.value.pageSize
  const end = start + pagination.value.pageSize
  return filteredData.value.slice(start, end)
})

// Jumlah data yang tampil
const displayedCount = computed(() => {
  const end = Math.min(
    pagination.value.current * pagination.value.pageSize,
    filteredData.value.length
  )
  return end
})

// Navigasi
const goPrev = () => {
  if (pagination.value.current > 1) pagination.value.current--
}

const goNext = () => {
  if (pagination.value.current < totalPages.value) pagination.value.current++
}

const onEdit = (record: User) => {
  console.log("Edit user:", record)
}

const onDelete = (record: User) => {
  console.log("Hapus user:", record)
}
</script>

<style scoped>
.ant-pagination {
  margin: 0;
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
