<template>
  <div class="w-full">
    <!-- 📋 Tabel -->
    <a-table
      :columns="columns"
      :data-source="paginatedData"
      bordered
      :row-key="rowKey"
      :pagination="false"
    >
      <template #bodyCell="{ column, text, record }">
        <!-- ✅ Editable cells -->
        <template v-if="editableColumns.includes(column.dataIndex)">
          <div>
            <a-input
              v-if="editableData[record[rowKey]]"
              v-model:value="editableData[record[rowKey]][column.dataIndex]"
              style="margin: -5px 0"
            />
            <template v-else>{{ text }}</template>
          </div>
        </template>

        <!-- ✅ Operation column: langsung tombol -->
        <template v-else-if="column.dataIndex === 'operation'">
          <div class="flex justify-center gap-2 flex-wrap">
            <a-button
              v-for="action in actions"
              :key="action.key"
              size="small"
              :danger="action.danger"
              v-bind="action.buttonProps"
              :style="action.style"
              @click="emit(action.event, record)"
            >
              <Icon v-if="action.icon" :icon="action.icon" class="mr-1 text-sm" />
              {{ action.label }}
            </a-button>
          </div>
        </template>

        <!-- ✅ Default non-editable cell -->
        <template v-else>{{ text }}</template>
      </template>
    </a-table>

    <!-- 📄 Footer Info -->
    <div class="flex justify-between items-center mt-4">
      <!-- Info kiri -->
      <div class="text-sm text-gray-500">
        Menampilkan {{ displayedCount }} dari {{ internalData.length }} pengguna
      </div>

      <!-- Pagination kanan -->
      <div class="flex items-center gap-3">
        <a-select
          v-model:value="pageSize"
          :options="pageSizeOptions"
          class="w-[100px]"
          size="small"
          @change="handlePageSizeChange"
        >
          <template #suffixIcon>
            <span class="text-gray-500 text-xs">▼</span>
          </template>
        </a-select>

        <a-pagination
          v-model:current="currentPage"
          :page-size="pageSize"
          :total="internalData.length"
          :show-less-items="true"
          size="small"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch, computed, type UnwrapRef } from 'vue'
import { Icon } from '@iconify/vue'

/* ================================
   📦 Props & Emits
================================ */
const props = defineProps<{
  columns: any[]
  data: any[]
  editableColumns?: string[]
  rowKey?: string
  actions?: {
    key: string
    label: string
    icon?: string
    event: string
    danger?: boolean
    style?: Record<string, string | number> // ✅ style khusus per action
    buttonProps?: Record<string, any> // optional: dukung props tambahan dari Antd
  }[]
}>()

const emit = defineEmits<{
  (event: string, record?: any): void
}>()

/* ================================
   ⚙️ Defaults
================================ */
const editableColumns = props.editableColumns || []
const rowKey = props.rowKey || 'key'
const actions = props.actions || [] // tombol dikontrol dari luar

/* ================================
   📊 Data & State
================================ */
const internalData = ref([...props.data])
const editableData: UnwrapRef<Record<string, any>> = reactive({})
const currentPage = ref(1)
const pageSize = ref(5)

const pageSizeOptions = [
  { label: '5 / page', value: 5 },
  { label: '10 / page', value: 10 },
  { label: '20 / page', value: 20 },
  { label: '50 / page', value: 50 },
]

/* ================================
   🔄 Watcher
================================ */
watch(
  () => props.data,
  (val) => (internalData.value = [...val]),
  { deep: true }
)

/* ================================
   📑 Pagination
================================ */
const handlePageSizeChange = (newSize: number) => {
  pageSize.value = newSize
  currentPage.value = 1
}

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return internalData.value.slice(start, end)
})

const displayedCount = computed(() => {
  const end = Math.min(currentPage.value * pageSize.value, internalData.value.length)
  return end
})
</script>

<style scoped>
:deep(.ant-table-thead > tr > th) {
  background-color: #fafafa !important;
  font-weight: 600;
}

:deep(.ant-btn) {
  font-weight: 500;
}

:deep(.ant-btn:hover) {
  opacity: 0.9;
}
</style>
