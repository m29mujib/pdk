<template>
  <div class="w-[100%] p-8">
    <!--  Header -->
    <div class="mb-6">
      <h1 class="text-[24px] font-bold text-[#03386B]">Manajemen Pengguna</h1>
      <p class="text-[#55565A] text-[16px]">
        Kelola akun pengguna, role, dan izin
      </p>
    </div>

    <!--  Card Container -->
    <div class="bg-[#fff] rounded-lg shadow-sm border border-gray-100 px-6 py-6">
      <!--  Header Actions -->
      <div class="flex justify-between items-center mb-4">
        <div></div>
        <button
          class="bg-[#03386B] hover:bg-[#1565c0] text-white px-3 py-3 rounded-md"
          @click="openModal"
        >
          + Tambah Pengguna
        </button>
      </div>

      <!--  Search & Filter -->
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
            <Icon icon="ri:filter-line" style="font-size: 16px; margin-right: 4px;" />
          </template>
          Filter
        </a-button>
      </div>

      <!--  Editable Table -->
      <EditableTable
        :columns="columns"
        :data="filteredData"
        row-key="key"
        :actions="tableActions"
        @disable="(record) => onDisable(record as User)"
        @delete="(record) => onDelete(record as User)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { SearchOutlined } from '@ant-design/icons-vue'
import { Icon } from '@iconify/vue'
import { useRouter } from 'vue-router'
import EditableTable from '@/components/tabel/EditableTable.vue'
import type { ColumnsType } from 'ant-design-vue/es/table'

interface User {
  key: number
  name: string
  email: string
  role: string
  status: string
  registered: string
}


const router = useRouter()
const searchText = ref('')


const data = ref<User[]>([
  { key: 1, name: 'John Doe', email: 'john@gmail.com', role: 'Admin', status: 'Aktif', registered: '2025-01-10' },
  { key: 2, name: 'Fakih Lana', email: 'fakih@gmail.com', role: 'Admin', status: 'Aktif', registered: '2025-02-12' },
  { key: 3, name: 'Kiki Gara', email: 'kiki@gmail.com', role: 'Admin', status: 'Nonaktif', registered: '2025-03-20' },
  { key: 4, name: 'Anam', email: 'anam@gmail.com', role: 'Viewer', status: 'Aktif', registered: '2025-03-29' },
  { key: 5, name: 'Mujib', email: 'mujib@gmail.com', role: 'Operator', status: 'Aktif', registered: '2025-04-05' },
])

const columns: ColumnsType<User> = [
  { title: 'Nama', dataIndex: 'name', key: 'name', align: 'center' },
  { title: 'Email', dataIndex: 'email', key: 'email', align: 'center' },
  { title: 'Role', dataIndex: 'role', key: 'role', align: 'center' },
  { title: 'Status', dataIndex: 'status', key: 'status', align: 'center' },
  { title: 'Terdaftar', dataIndex: 'registered', key: 'registered', align: 'center' },
  { title: 'Action', dataIndex: 'operation', key: 'operation', align: 'center' },
]

const tableActions = [
  { key: 'disable', label: 'Nonaktifkan', icon: 'mdi:account-off-outline', event: 'disable',
       style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '6px',                // jarak kecil antara ikon & teks
      backgroundColor: 'transparent',
      color: '#000',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      fontWeight: '500',
      fontSize: '13px',
      height: '32px',
      width: '110px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    },
  },
  { key: 'delete', label: 'Hapus', icon: 'mdi:delete-outline', event: 'delete', danger: true,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '6px',                // jarak kecil antara ikon & teks
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


const filteredData = computed(() => {
  if (!searchText.value) return data.value
  return data.value.filter((u) =>
    Object.values(u).some((v) =>
      String(v).toLowerCase().includes(searchText.value.toLowerCase())
    )
  )
})

const openModal = () => {
  router.push({ name: 'Tambah Daftar Pengguna' })
}

const onDisable = (record: User) => {
  console.log('User dinonaktifkan:', record.name)
}

const onDelete = (record: User) => {
  console.log('User dihapus:', record.name)
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

:deep(.ant-select-selector) {
  background-color: #fff !important;
  border: 1px solid #d9d9d9 !important;
  border-radius: 6px !important;
  height: 28px !important;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 8px !important;
}

:deep(.ant-select-selection-item) {
  font-size: 13px !important;
  font-weight: 500 !important;
  color: #000 !important;
}
:deep(.custom-input input::placeholder) {
  color: #111827; 
  padding: 10px;
  background-color: #eaeaea;
}
:deep(.custom-input.ant-input-affix-wrapper-focused .ant-input) {
  background-color: #eaeaea !important;
  /* pertahankan abu-abu */
}
</style>
