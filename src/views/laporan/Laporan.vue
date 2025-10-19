<script setup lang="ts">
import { ref } from 'vue'

// ECharts core + chart + components + renderer
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart } from 'echarts/charts'
import { BarChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
} from 'echarts/components'

// Vue wrapper
import VChart from 'vue-echarts'

// TypeScript types (opsional tapi membantu)
import type { ComposeOption } from 'echarts/core'
import type { PieSeriesOption } from 'echarts/charts'
import type {
  TitleComponentOption,
  TooltipComponentOption,
  LegendComponentOption
} from 'echarts/components'

// register only what we use (tree-shaking)
use([CanvasRenderer, BarChart, PieChart, TitleComponent, TooltipComponent, LegendComponent, GridComponent])

// Compose option type for TS
type ECOption = ComposeOption<
  | TitleComponentOption
  | TooltipComponentOption
  | LegendComponentOption
  | PieSeriesOption
>
interface Ringkasan {
  title: string
  subtitle: string
  data: {
    label: string
    value: number
  }[]
}

const ringkasanList = ref<Ringkasan[]>([
  {
    title: 'Ringkasan Juknis',
    subtitle: 'Total permintaan 6 bulan terakhir',
    data: [
      { label: 'Total Diajukan', value: 355 },
      { label: 'Disetujui', value: 170 },
      { label: 'Pending', value: 170 },
      { label: 'Ditolak', value: 70 }
    ]
  },
  {
    title: 'Ringkasan POC',
    subtitle: 'Total permintaan 6 bulan terakhir',
    data: [
      { label: 'Total Diajukan', value: 355 },
      { label: 'Disetujui', value: 170 },
      { label: 'Pending', value: 170 },
      { label: 'Ditolak', value: 70 }
    ]
  }
])

// example pie chart options
const barOption = ref({
  title: {
    text: 'Total Pengajuan per Bulan',
    left: 'center',
    textStyle: {
      fontSize: 16
    }
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'shadow' }
  },
  legend: {
    bottom: 0
  },
  grid: {
    top: 50,
    left: '3%',
    right: '4%',
    bottom: '10%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: 'Pengajuan PKS',
      type: 'bar',
      data: [120, 200, 150, 80, 70, 110, 130],
      itemStyle: {
        color: '#42A5F5' // biru
      }
    },
    {
      name: 'Pengajuan POC',
      type: 'bar',
      data: [90, 150, 200, 130, 160, 90, 100],
      itemStyle: {
        color: '#FFA726' // oranye
      }
    }
  ]
})

const pieOption = ref<ECOption>({
  title: {
    text: 'Referer of a Website',
    subtext: 'Fake Data',
    left: 'center',
    textStyle: { fontSize: 14 }
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '50%',
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
})
</script>

<template>
  <div class="pl-2">
    <h1 class="text-[24px] font-semibold text-[#03386B]">
      Laporan
    </h1>
    <p class="text-[#55565A] text-[16px]">System actifyty and performnace overview</p>
  </div>
 <v-row class="gap-1">
    <!-- Card 1 -->
    <v-col cols="12" lg="3">
      <v-card
        elevation="0"
        class="flex justify-between items-center bg-white border border-gray-200 rounded-4xl px-6 py-6 shadow-sm w-full h-[120px]"
      >
        <div>
          <p class="text-[26px] font-bold text-[#0a0a0a] leading-tight mb-[-5px]" style="font-weight: 600;">248</p>
          <p class="text-[15px] text-[#0a0a0a] font-medium">Pengguna Mobile</p>
        </div>
        <div class="p-[12px] flex justify-center items-center rounded-[12px] bg-[#d8e8ff]">
          <v-icon color="#1565c0" size="30">mdi-account-group-outline</v-icon>
        </div>
      </v-card>
    </v-col>

    <!-- Card 2 -->
    <v-col cols="12" lg="3">
      <v-card
        elevation="0"
        class="flex justify-between items-center bg-white border border-gray-200 rounded-xl px-6 py-6 shadow-sm w-full h-[120px]"
      >
        <div>
          <p class="text-[26px] font-bold text-[#0a0a0a] leading-tight mb-[-5px]" style="font-weight: 600;">29 min</p>
          <p class="text-[15px] text-[#0a0a0a] font-medium mb-[-5px]">Durasi rata-rata</p>
          <p class="text-[13px] text-gray-500">Per pengguna</p>
        </div>
        <div class="p-[12px] flex justify-center items-center rounded-[12px] bg-[#d8f5d0]">
          <v-icon color="#2e7d32" size="30">mdi-file-document-outline</v-icon>
        </div>
      </v-card>
    </v-col>

    <!-- Card 3 -->
    <v-col cols="12" lg="3">
      <v-card
        elevation="0"
        class="flex justify-between items-center bg-white border border-gray-200 rounded-xl px-6 py-6 shadow-sm w-full h-[120px]"
      >
        <div>
          <p class="text-[26px] font-bold text-[#0a0a0a] leading-tight mb-[-5px]" style="font-weight: 600;">362</p>
          <p class="text-[15px] text-[#0a0a0a] font-medium mb-[-5px]">Permintaan Juknis</p>
          <p class="text-[13px] text-gray-500">6 Bulan terakhir</p>
        </div>
        <div class="p-[12px] flex justify-center items-center rounded-[12px] bg-[#faecd8]">
          <v-icon color="#8d6e63" size="30">mdi-account-check-outline</v-icon>
        </div>
      </v-card>
    </v-col>

    <!-- Card 4 -->
    <v-col cols="12" lg="3">
      <v-card
        elevation="0"
        class="flex justify-between items-center bg-white border border-gray-200 rounded-xl px-6 py-6 shadow-sm w-full h-[120px]"
      >
        <div>
          <p class="text-[26px] font-bold text-[#0a0a0a] leading-tight mb-[-5px]" style="font-weight: 600;">240</p>
          <p class="text-[15px] text-[#0a0a0a] font-medium  mb-[-5px]">Permintaan POC</p>
          <p class="text-[13px] text-gray-500">6 Bulan terakhir</p>
        </div>
        <div class="p-[12px] flex justify-center items-center rounded-[12px] bg-[#eaddff]">
          <v-icon color="#8e24aa" size="30">mdi-bell-outline</v-icon>
        </div>
      </v-card>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" lg="6">
      <v-card elevation="10" class="pa-4">
        <h5 class="text-h6 mb-3">Statistik Projek</h5>
        <p class="text-p4 mb-4">Distribusi Juknis dan POC Projek</p>
        <VChart :option="barOption" style="height: 350px; width: 100%;" />
      </v-card>
    </v-col>
    <v-col cols="12" lg="6">
      <v-card elevation="10" class="pa-4">
        <h5 class="text-h6 mb-3">Statistik Pengajuan Project</h5>
        <p class="text-p4 mb-4">Statistik Pengajuan Project Bulanan</p>
        <v-chart :option="pieOption" style="height: 350px; width: 100%;" />
      </v-card>
    </v-col>
  </v-row>

  <v-row class="mt-4 flex w-full">
    <v-col
      v-for="(item, index) in ringkasanList"
      :key="index"
      cols="12"
      md="6"
      lg="6"
      class="flex justify-center"
    >
      <a-card
        :bordered="false"
        class="w-full bg-white border border-gray-200 rounded-2xl shadow-sm p-4"
      >
        <h3 class="text-[17px] font-semibold text-gray-900">
          {{ item.title }}
        </h3>
        <p class="text-[14px] text-gray-500 mb-4">{{ item.subtitle }}</p>

        <div class="divide-y divide-gray-100">
          <div
            v-for="(row, idx) in item.data"
            :key="idx"
            class="flex justify-between items-center py-2"
          >
            <span class="text-[15px] text-gray-800">{{ row.label }}</span>
            <span class="text-[15px] font-medium text-gray-900">
              {{ row.value }}
            </span>
          </div>
        </div>
      </a-card>
    </v-col>
  </v-row>
  
</template>
