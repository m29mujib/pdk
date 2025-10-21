<template>
  <div class="p-8">
    <!-- 🧭 Header -->
    <div class="mb-6">
      <h1 class="text-[24px] font-bold text-[#03386B]">
        Pengajuan Lupa Kata Sandi Pengguna
      </h1>
      <p class="text-[#55565A] text-[16px]">
        Pengelolaan pengajuan lupa kata sandi user
      </p>
    </div>

    <!-- 🧩 Container -->
    <div class="bg-[#fff] rounded-lg shadow-sm border border-gray-100 px-6 py-6">
      <!-- 🔍 Search & Filter -->
      <div class="flex gap-2 mb-4">
        <a-input
          v-model:value="searchText"
          placeholder="Cari pengguna..."
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
            <Icon
              icon="ri:filter-line"
              style="font-size: 16px; margin-right: 4px;"
            />
          </template>
          Filter
        </a-button>
      </div>

      <!-- 🧮 Reusable Table -->
      <EditableTable
        :columns="columns"
        :data="filteredData"
        row-key="key"
        :actions="tableActions"
        @approve="(record) => onApprove(record as User)"
        @reject="(record) => onReject(record as User)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import { SearchOutlined } from "@ant-design/icons-vue"
import { Icon } from "@iconify/vue"
import { message } from "ant-design-vue"
import EditableTable from "@/components/tabel/EditableTable.vue"
import type { ColumnsType } from "ant-design-vue/es/table"

interface User {
  key: number
  name: string
  email: string
  role: string
  dikirim: string
  terdaftar: string
}

/* =====================
   📊 Dummy Data
===================== */
const data = ref<User[]>([
  { key: 1, name: "John Doe", email: "johndoe@gmail.com", role: "Administrator", dikirim: "2025-08-01", terdaftar: "2024-12-23" },
  { key: 2, name: "Fakih Lana", email: "fakihlana@gmail.com", role: "Administrator", dikirim: "2025-08-01", terdaftar: "2024-12-23" },
  { key: 3, name: "Kiki Gara", email: "kikigara@gmail.com", role: "Administrator", dikirim: "2025-08-01", terdaftar: "2024-12-23" },
  { key: 4, name: "Maul Kika", email: "maulkika@gmail.com", role: "Administrator", dikirim: "2025-08-01", terdaftar: "2024-12-23" },
  { key: 5, name: "Satrio Hilmi", email: "satriohilmi@gmail.com", role: "Administrator", dikirim: "2025-08-01", terdaftar: "2024-12-23" },
  { key: 6, name: "Mujib", email: "mujib@gmail.com", role: "Administrator", dikirim: "2025-08-01", terdaftar: "2024-12-23" },
  { key: 7, name: "Mamang", email: "mamang@gmail.com", role: "Administrator", dikirim: "2025-08-01", terdaftar: "2024-12-23" },
  { key: 8, name: "Anam", email: "anam@gmail.com", role: "Administrator", dikirim: "2025-08-01", terdaftar: "2024-12-23" },
  { key: 9, name: "Dini", email: "dini@gmail.com", role: "Administrator", dikirim: "2025-08-01", terdaftar: "2024-12-23" },
  { key: 10, name: "Dela", email: "dela@gmail.com", role: "Administrator", dikirim: "2025-08-01", terdaftar: "2024-12-23" },
])

/* =====================
   🔍 Search Logic
===================== */
const searchText = ref("")
const filteredData = computed(() => {
  if (!searchText.value) return data.value
  return data.value.filter(
    (u) =>
      u.name.toLowerCase().includes(searchText.value.toLowerCase()) ||
      u.email.toLowerCase().includes(searchText.value.toLowerCase())
  )
})

/* =====================
   🧱 Columns Definition
===================== */
const columns: ColumnsType<User> = [
  { title: "Nama", dataIndex: "name", key: "name" },
  { title: "Email", dataIndex: "email", key: "email" },
  { title: "Role", dataIndex: "role", key: "role" },
  { title: "Dikirim", dataIndex: "dikirim", key: "dikirim" },
  { title: "Terdaftar", dataIndex: "terdaftar", key: "terdaftar" },
  { title: "Operation", dataIndex: "operation", key: "operation", align: "center" },
]

/* =====================
   ⚙️ Actions (untuk menu dropdown)
===================== */
const tableActions = [
  {
    key: 'approve',
    label: 'Setujui',
    icon: 'ri:check-line',
    event: 'approve',
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '6px',                // jarak kecil antara ikon & teks
      backgroundColor: '#22C55E',
      color: '#fff',
      border: 'none',
      borderRadius: '6px',
      fontWeight: '500',
      fontSize: '13px',
      height: '32px',
      width: '110px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    },
  },
  {
    key: 'reject',
    label: 'Tolak',
    icon: 'ri:close-line',
    event: 'reject',
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '6px',
      backgroundColor: '#EF4444',
      color: '#fff',
      border: 'none',
      borderRadius: '6px',
      fontWeight: '500',
      fontSize: '13px',
      height: '32px',
      width: '110px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    },
  },
]


/* =====================
   🧩 Event Handlers
===================== */
const onApprove = (record: User) => {
  message.success(`✅ ${record.name} telah disetujui`)
}

const onReject = (record: User) => {
  message.error(`❌ ${record.name} telah ditolak`)
}
</script>

<style scoped>
/* 🎨 Table Header */
.ant-table-thead > tr > th {
  background-color: #fafafa !important;
  font-weight: 600;
  color: #333;
}

/* 🎨 Input Placeholder */
:deep(.custom-input input::placeholder) {
  color: #111827;
  padding: 10px;
  background-color: #eaeaea;
}
:deep(.custom-input.ant-input-affix-wrapper-focused .ant-input) {
  background-color: #eaeaea !important;
}
</style>
