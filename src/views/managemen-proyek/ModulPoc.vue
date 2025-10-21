<template>
  <div class="p-8 mb-6">
    <!-- Header -->
    <div class="mb-6">
      <h1 class="text-[24px] font-bold text-[#03386B]">Modul POC</h1>
      <p class="text-[#55565A]">
        Kelola aktivitas POC (Proof Of Concept), penjadwalan, dan komunikasi
      </p>
    </div>

    <!-- 📋 Jadwal POC -->
    <div class="bg-[#fff] rounded-lg shadow-sm border border-gray-100 px-6 py-6">
      <div class="flex justify-between items-center mb-4">
        <div></div>
        <button
          class="bg-[#03386B] hover:bg-[#1565c0] text-white px-5 py-3 rounded-md"
          @click="openModal"
        >
          + Tambah Jadwal
        </button>
      </div>

      <!-- 🧩 Reusable Table -->
      <EditableTable
        :columns="columns"
        :data="data"
        row-key="key"
        :actions="tableActions"
        @edit="(record) => onEdit(record as Jadwal)"
      />
    </div>

    <!-- 📬 Broadcast Section -->
    <div class="h-full bg-[#fff] px-6 py-8 rounded-lg shadow-md mt-6">
      <div class="mb-6">
        <h2 class="text-[24px] font-bold text-[#03386B]">Kirim Broadcast POC</h2>
        <p class="text-[#55565A]">Kirim informasi atau update ke peserta POC</p>
      </div>

      <a-form layout="vertical" @submit.prevent="handleSubmit" class="space-y-4">
        <a-form-item label="Judul Broadcast" name="title" class="mb-4">
          <a-input
            v-model:value="form.title"
            placeholder="Masukan judul broadcast"
            class="bg-gray-100 w-[50%]"
          />
        </a-form-item>

        <a-form-item label="Pesan" name="message" class="mb-4">
          <a-textarea
            v-model:value="form.message"
            rows="4"
            placeholder="Masukan pesan sesuai kegiatan POC..."
            class="bg-gray-100 w-[50%]"
          />
        </a-form-item>

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

        <a-form-item>
          <a-button
            type="primary"
            html-type="submit"
            class="bg-[#003366] hover:bg-[#002855] text-white font-medium rounded-md w-[50%] md:w-auto"
          >
            Kirim POC Broadcast
          </a-button>
        </a-form-item>
      </a-form>
    </div>

    <AddJadwalModal ref="jadwalModalRef" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { ColumnsType } from 'ant-design-vue/es/table'
import { message } from 'ant-design-vue'
import AddJadwalModal from './AddJadwalModal.vue'
import EditableTable from '@/components/tabel/EditableTable.vue'

interface Jadwal {
  key: number
  judul: string
  lembaga: string
  tanggal_waktu: string
  peserta: string
  prioritas: string
  status: string
}

const data = ref<Jadwal[]>([
  {
    key: 1,
    judul: 'Rapat Kickoff POC',
    lembaga: 'PT PLN (Persero)',
    tanggal_waktu: '2025-10-18 09:00',
    peserta: 'John Doe, Kiki Gara',
    prioritas: 'Tinggi',
    status: 'Terjadwal',
  },
  {
    key: 2,
    judul: 'Demo Sistem Vendor A',
    lembaga: 'ICON+',
    tanggal_waktu: '2025-10-19 14:00',
    peserta: 'Fakih Lana, Dini',
    prioritas: 'Sedang',
    status: 'Selesai',
  },
  {
    key: 3,
    judul: 'Evaluasi Teknis Produk X',
    lembaga: 'Kementerian ESDM',
    tanggal_waktu: '2025-10-20 10:00',
    peserta: 'Maul Kika, Satrio Hilmi',
    prioritas: 'Tinggi',
    status: 'Dibatalkan',
  },
])

const columns: ColumnsType<Jadwal> = [
  { title: 'Judul', dataIndex: 'judul', key: 'judul' },
  { title: 'Lembaga', dataIndex: 'lembaga', key: 'lembaga' },
  { title: 'Tanggal & Waktu', dataIndex: 'tanggal_waktu', key: 'tanggal_waktu' },
  { title: 'Peserta', dataIndex: 'peserta', key: 'peserta' },
  { title: 'Prioritas', dataIndex: 'prioritas', key: 'prioritas' },
  { title: 'Status', dataIndex: 'status', key: 'status' },
  { title: '', dataIndex: 'operation', key: 'operation', align: 'center' },
]

// 🧩 Aksi tabel
const tableActions = [
  {
    key: 'edit',
    label: 'Edit',
    icon: 'ri:edit-line',
    event: 'edit',
    style: {
      backgroundColor: '#3B82F6',
      color: '#fff',
      border: 'none',
      borderRadius: '6px',
      fontSize: '13px',
      fontWeight: '500',
      height: '32px',
      width: '100px',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '6px',
    },
  },
]

// 🧩 Event dari tabel
const onEdit = (record: Jadwal) => {
  message.info(`✏️ Edit jadwal POC: ${record.judul}`)
}

const onDelete = (record: Jadwal) => {
  message.warning(`🗑️ Hapus jadwal POC: ${record.judul}`)
}

// Modal tambah
const jadwalModalRef = ref<InstanceType<typeof AddJadwalModal> | null>(null)
const openModal = () => {
  jadwalModalRef.value?.openModal()
}

// 📤 Form broadcast
const form = ref({
  title: '',
  message: '',
  target: 'all',
})

const handleSubmit = () => {
  console.log('📤 Broadcast POC:', form.value)
  message.success('Broadcast POC berhasil dikirim!')
}
</script>

<style scoped>
.ant-pagination {
  margin: 0;
}
</style>
