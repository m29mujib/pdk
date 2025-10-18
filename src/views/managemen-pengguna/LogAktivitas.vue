<template>
  <div class="min-h-screen bg-[#f6f8fb] p-8">
    <div class="mb-6">
      <h1 class="text-[24px] font-bold text-[#03386B]">Log Aktivitas Pengguna</h1>
      <p class="text-[#55565A] text-[16px]">Pantau dan lacak semua aktivitas pengguna dalam sistem</p>
    </div>

     <div class="bg-[white] rounded-lg shadow-sm border border-gray-100 px-6 py-6">
        <div class="flex justify-between items-center mb-4">
        <div>
          <h1 class="text-[16px] font-bold text-[#03386B]">Riwayat Aktivitas</h1>
          <p class="text-[16px] text-[#55565A]">Log aktivitas pengguna dalam sistem</p>
        </div>
      </div>

      <!-- Search & Filter -->
      <div class="flex gap-2 mb-4">
        <a-input
          v-model="searchText"
          placeholder="Cari Aktivitas....."
          class="custom-input"
          style="width: 240px; background-color: #eaeaea;"
          allow-clear
        >
          <template #prefix>
        <!-- ✅ Gunakan SearchOutlined langsung -->
            <SearchOutlined style="color: #333;" />
          </template>
        </a-input>
        <a-select
          v-model:value="selectedModule"
          placeholder="Semua Modul"
          class="custom-select-gray"
          style="width: 150px; background-color: #eaeaea; border-radius: 6px;"
          allow-clear
        >
          <a-select-option value="user">Manajemen Pengguna</a-select-option>
          <a-select-option value="role">Manajemen Role</a-select-option>
          <a-select-option value="ticket">Ticketing System</a-select-option>
          <a-select-option value="survey">Monitoring Survei</a-select-option>
          <a-select-option value="report">Laporan & Statistik</a-select-option>
        </a-select>

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
// =====================
// Interface Baru
// =====================
interface LogAkses {
  key: number
  waktu: string
  pengguna: string
  role: string
  alamat_ip: string
  status: string
  detail: string
}

// =====================
// Dummy Data
// =====================
const data = ref<LogAkses[]>([
  { key: 1, waktu: "2025-10-18 08:45", pengguna: "John Doe", role: "Administrator", alamat_ip: "192.168.1.12", status: "Berhasil", detail: "Login ke sistem" },
  { key: 2, waktu: "2025-10-18 09:15", pengguna: "Fakih Lana", role: "User", alamat_ip: "192.168.1.33", status: "Gagal", detail: "Password salah" },
  { key: 3, waktu: "2025-10-18 10:02", pengguna: "Kiki Gara", role: "Supervisor", alamat_ip: "10.0.0.15", status: "Berhasil", detail: "Melihat laporan" },
  { key: 4, waktu: "2025-10-18 10:30", pengguna: "Maul Kika", role: "Administrator", alamat_ip: "172.16.0.22", status: "Berhasil", detail: "Mengubah data pengguna" },
  { key: 5, waktu: "2025-10-18 11:10", pengguna: "Satrio Hilmi", role: "User", alamat_ip: "192.168.10.5", status: "Gagal", detail: "Akses ditolak" },
  { key: 6, waktu: "2025-10-18 11:35", pengguna: "Mujib", role: "Administrator", alamat_ip: "10.10.0.8", status: "Berhasil", detail: "Menambahkan data baru" },
  { key: 7, waktu: "2025-10-18 12:05", pengguna: "Mamang", role: "User", alamat_ip: "192.168.1.40", status: "Berhasil", detail: "Melihat profil" },
  { key: 8, waktu: "2025-10-18 12:40", pengguna: "Anam", role: "Supervisor", alamat_ip: "172.20.5.2", status: "Gagal", detail: "Timeout koneksi" },
  { key: 9, waktu: "2025-10-18 13:15", pengguna: "Dini", role: "Administrator", alamat_ip: "192.168.100.15", status: "Berhasil", detail: "Login ke sistem" },
  { key: 10, waktu: "2025-10-18 14:05", pengguna: "Dela", role: "User", alamat_ip: "192.168.1.19", status: "Berhasil", detail: "Logout dari sistem" },
])

// =====================
// Kolom Tabel
// =====================
const columns: ColumnsType<LogAkses> = [
  { title: "Waktu", dataIndex: "waktu", key: "waktu" },
  { title: "Pengguna", dataIndex: "pengguna", key: "pengguna" },
  { title: "Role", dataIndex: "role", key: "role" },
  { title: "Alamat IP", dataIndex: "alamat_ip", key: "alamat_ip" },
  { title: "Status", dataIndex: "status", key: "status" },
  { title: "Detail", dataIndex: "detail", key: "detail" },
]


const router = useRouter()
const selectedModule = ref<string | undefined>(undefined)
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

const onEdit = (record: LogAkses) => {
  console.log("Edit user:", record)
}

const onDelete = (record: LogAkses) => {
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
/* ubah warna area input (selector) */
.custom-select-gray :deep(.ant-select-selector) {
  background-color: #eaeaea !important;
  border: none !important;
  border-radius: 6px !important;
  box-shadow: none !important;
}

/* ubah warna saat fokus */
.custom-select-gray :deep(.ant-select-focused .ant-select-selector) {
  border: 1px solid #ccc !important;
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.05) !important;
}

/* ubah warna dropdown list */
.custom-select-gray :deep(.ant-select-dropdown) {
  background-color: #eaeaea !important;
}

/* ubah warna teks */
.custom-select-gray :deep(.ant-select-selection-item),
.custom-select-gray :deep(.ant-select-selection-placeholder) {
  color: #333 !important;
}
</style>
