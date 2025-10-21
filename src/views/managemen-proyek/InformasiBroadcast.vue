<template>
  <div class="p-8">
    <!-- Header -->
    <div>
      <h1 class="text-[24px] font-bold text-[#03386B]">Informasi Broadcast</h1>
      <p class="text-[#55565A] text-[16px]">
        Kirim notifikasi dan pengumuman ke pengguna aplikasi mobile
      </p>
    </div>

    <!-- 📋 Riwayat Broadcast -->
    <div class="bg-[#fff] p-8 rounded-lg">
      <div class="bg-white rounded-lg shadow-sm border border-gray-100 px-6 py-6">
        <div class="flex justify-between items-center mb-4">
          <div>
            <h2 class="text-[20px] font-semibold text-[#03386B]">Riwayat Broadcast</h2>
            <p class="text-sm text-[#55565A]">
              Broadcast yang baru-baru ini dikirim dan terjadwal
            </p>
          </div>
        </div>

        <!-- 🧩 Reusable Editable Table -->
        <EditableTable
          :columns="columns"
          :data="data"
          row-key="key"
          :actions="tableActions"
          @edit="(record) => onEdit(record as Broadcast)"
        />
      </div>
    </div>

    <!-- 📤 Form Broadcast -->
    <div class="bg-[#fff] px-6 py-8 rounded-lg shadow-md mt-6">
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
            placeholder="Masukan pesan sesuai pengumuman..."
            class="bg-gray-100 w-[50%]"
          />
        </a-form-item>

        <a-form-item label="Target Peserta" name="target" class="mb-6 w-[50%]">
          <a-select
            v-model:value="form.target"
            placeholder="Pilih peserta"
            class="bg-gray-100 w-[50%]"
          >
            <a-select-option value="all">pengguna</a-select-option>
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
            Kirim Broadcast
          </a-button>
        </a-form-item>
      </a-form>
    </div>

    
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { ColumnsType } from 'ant-design-vue/es/table'
import { message } from 'ant-design-vue'
import EditableTable from '@/components/tabel/EditableTable.vue'

interface Broadcast {
  key: number
  judul: string
  lembaga: string
  tanggal_waktu: string
  peserta: string
  prioritas: string
  status: string
}

const data = ref<Broadcast[]>([
  {
    key: 1,
    judul: 'Pengumuman Maintenance Server',
    lembaga: 'PT PLN (Persero)',
    tanggal_waktu: '2025-10-18 09:00',
    peserta: 'Semua Pengguna',
    prioritas: 'Tinggi',
    status: 'Terkirim',
  },
  {
    key: 2,
    judul: 'Pemberitahuan POC Hari Ini',
    lembaga: 'ICON+',
    tanggal_waktu: '2025-10-19 14:00',
    peserta: 'Tim Internal',
    prioritas: 'Sedang',
    status: 'Terjadwal',
  },
  {
    key: 3,
    judul: 'Update Fitur Mobile Apps',
    lembaga: 'ICON+',
    tanggal_waktu: '2025-10-20 10:00',
    peserta: 'All Users',
    prioritas: 'Rendah',
    status: 'Terkirim',
  },
])

// 📑 Kolom Tabel
const columns: ColumnsType<Broadcast> = [
  { title: 'Judul', dataIndex: 'judul', key: 'judul' },
  { title: 'Lembaga', dataIndex: 'lembaga', key: 'lembaga' },
  { title: 'Tanggal & Waktu', dataIndex: 'tanggal_waktu', key: 'tanggal_waktu' },
  { title: 'Peserta', dataIndex: 'peserta', key: 'peserta' },
  { title: 'Prioritas', dataIndex: 'prioritas', key: 'prioritas' },
  { title: 'Status', dataIndex: 'status', key: 'status' },
  { title: '', dataIndex: 'operation', key: 'operation', align: 'center' },
]

// 🎯 Tombol aksi untuk reusable table
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

// 🧩 Event Handler
const onEdit = (record: Broadcast) => {
  message.info(`✏️ Edit Broadcast: ${record.judul}`)
}

const onDelete = (record: Broadcast) => {
  message.warning(`🗑️ Hapus Broadcast: ${record.judul}`)
}

// 📤 Form Broadcast
const form = ref({
  title: '',
  message: '',
  target: 'all',
})

const handleSubmit = () => {
  console.log('📤 Broadcast dikirim:', form.value)
  message.success('Broadcast berhasil dikirim!')
}
</script>

<style scoped>
.ant-pagination {
  margin: 0;
}
</style>
