<template>
  <div class="h-full bg-[#f6f8fb] p-8 mb-6">
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-[#03386B]">Modul POC</h1>
      <p class="text-[#55565A]">Kelola aktivitas POC (Prof Of Concept), penjadwalan, dan komunikasi </p>
    </div>

     <div class="bg-[white] rounded-lg shadow-sm border border-gray-100 px-6 py-6">
        <div class="flex justify-between items-center mb-4">
        <div>
          <h2 class="text-[24px] font-semibold text-[#03386B]">Jadwal POC</h2>
          <p class="text-sm text-[#55565A]">Kelola dan jadwalkan aktivitas POC</p>
        </div>
        <button class="bg-[#03386B] hover:bg-[#1565c0] text-white px-5 py-3 rounded-md" @click="openModal">+ Tambah Jadwal</button>
      </div>

      <!-- Search & Filter -->
         <a-table
           :columns="columns"
           :data-source="paginatedData"
           bordered
           row-key="key"
           :pagination="false"
         >
          <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'actions'">
            <a-space>
              <template v-for="btn in actions" :key="btn.action">
                <a-tooltip :title="btn.tooltip">
                  <a-button
                    :style="{
                      backgroundColor: btn.color,
                      color: 'black',
                      border: '1px solid black',
                      borderRadius: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }"
                    @click="handleAction(btn.action, record)"
                  >
                    {{ btn.label }}
                  </a-button>
                </a-tooltip>
              </template>
            </a-space>
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
  <div class="h-full bg-[#fff] px-6 py-8 rounded-lg shadow-md">
    <!-- Judul Section -->
    <div class="mb-6">
      <h2 class="text-2xl font-bold text-[#03386B]">Kirim Broadcast POC</h2>
      <p class="text-[#55565A]">
        Kirim informasi atau update ke peserta POC
      </p>
    </div>

    <!-- Form Broadcast -->
    <a-form layout="vertical" @submit.prevent="handleSubmit" class="space-y-4">
      <!-- Judul Broadcast -->
      <a-form-item label="Judul Broadcast" name="title" class="mb-4">
        <a-input
          v-model:value="form.title"
          placeholder="Masukan judul broadcast"
          class="bg-gray-100 w-[50%]"
        />
      </a-form-item>

      <!-- Pesan -->
      <a-form-item label="Pesan" name="message" class="mb-4">
        <a-textarea
          v-model:value="form.message"
          rows="4"
          placeholder="Masukan pesan sesuai Juknis..."
          class="bg-gray-100 w-[50%]"
        />
      </a-form-item>

      <!-- Target Peserta -->
      <a-form-item label="Target Peserta" name="target" class="mb-6 w-[50%]">
        <a-select
          v-model:value="form.target"
          placeholder="Pilih peserta"
          class="bg-gray-100 w-[50%]"
        >
          <a-select-option value="all">All Users</a-select-option>
          <a-select-option value="internal">Internal Team</a-select-option>
          <a-select-option value="vendor">Vendor</a-select-option>
        </a-select>
      </a-form-item>

      <!-- Tombol Submit -->
      <a-form-item>
        <a-button
          type="primary"
          html-type="submit"
          class="bg-[#003366] hover:bg-[#002855] text-white font-medium rounded-md w-[50%] md:w-auto"
        >
          Kirim Juknis Broadcast
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
import type { ColumnsType } from "ant-design-vue/es/table"
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue';
import { message } from 'ant-design-vue'
// =====================
// Interface User
// =====================
// =====================
// Interface Baru
// =====================
interface Jadwal {
  key: number
  judul: string
  lembaga: string
  tanggal_waktu: string
  peserta: string
  prioritas: string
  status: string
}

// =====================
// Dummy Data
// =====================
const data = ref<Jadwal[]>([
  {
    key: 1,
    judul: "Rapat Koordinasi Proyek A",
    lembaga: "PT PLN (Persero)",
    tanggal_waktu: "2025-10-18 09:00",
    peserta: "John Doe, Kiki Gara",
    prioritas: "Tinggi",
    status: "Terjadwal",
  },
  {
    key: 2,
    judul: "Presentasi Vendor Baru",
    lembaga: "ICON+",
    tanggal_waktu: "2025-10-19 14:00",
    peserta: "Fakih Lana, Dini",
    prioritas: "Sedang",
    status: "Selesai",
  },
  {
    key: 3,
    judul: "Evaluasi Laporan Mingguan",
    lembaga: "Kementerian ESDM",
    tanggal_waktu: "2025-10-20 10:00",
    peserta: "Maul Kika, Satrio Hilmi",
    prioritas: "Tinggi",
    status: "Dibatalkan",
  },
  {
    key: 4,
    judul: "Rapat Internal Divisi",
    lembaga: "PT ICON+",
    tanggal_waktu: "2025-10-21 13:30",
    peserta: "Mujib, Anam",
    prioritas: "Rendah",
    status: "Terjadwal",
  },
  {
    key: 5,
    judul: "Koordinasi Vendor Infrastruktur",
    lembaga: "PT PLN Nusantara Power",
    tanggal_waktu: "2025-10-22 08:30",
    peserta: "Mamang, Dela",
    prioritas: "Sedang",
    status: "Selesai",
  },
])

// =====================
// Kolom Tabel
// =====================
const columns: ColumnsType<Jadwal> = [
  { title: "Judul", dataIndex: "judul", key: "judul" },
  { title: "Lembaga", dataIndex: "lembaga", key: "lembaga" },
  { title: "Tanggal & Waktu", dataIndex: "tanggal_waktu", key: "tanggal_waktu" },
  { title: "Peserta", dataIndex: "peserta", key: "peserta" },
  { title: "Prioritas", dataIndex: "prioritas", key: "prioritas" },
  { title: "Status", dataIndex: "status", key: "status" },
  { title: "Actions", key: "actions", align: "center", width: 60 },
]

const actions = [
  {
    action: 'edit',
    label: 'Edit',
    color: '#fff',
    tooltip: 'Edit data ini',
    size: 'small'
  },
]

const handleAction = (action: string, record: Jadwal) => {
  if (action === 'approve') {
    message.success(`✅ ${record.judul} disetujui`)
  } else if (action === 'reject') {
    message.error(`❌ ${record.judul} ditolak`)
  }
}

const handleEdit = (record: any) => {
  console.log('Edit data:', record)
  // Di sini bisa arahkan ke halaman edit atau tampilkan modal
}
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

const onEdit = (record: Jadwal) => {
  console.log("Edit user:", record)
}

const onDelete = (record: Jadwal) => {
  console.log("Hapus user:", record)
}

const form = ref({
  title: '',
  message: '',
  target: 'all',
})

const handleSubmit = () => {
  console.log('Data form:', form.value)
  // TODO: integrasi API kirim broadcast
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
