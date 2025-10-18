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
    <h1 class="font-bold text-2xl">
      Dashboard
    </h1>
    <p>Selamat Datang Di Dashboard Sistem Managemen</p>
  </div>
  <v-row>
    <v-col cols="12" lg="4">
      <v-card elevation="0"
        class="flex justify-between items-center bg-white border border-gray-200 rounded-2xl px-6 py-4 shadow-sm w-full md:w-[380px]">
        <!-- Kiri -->
        <div class="flex items-start gap-3">
          <!-- Icon lingkaran merah -->
          <div
            class="w-12 h-12 flex justify-center items-center rounded-full bg-red-500 border-[3px] border-yellow-300 shadow-sm">
            <v-icon color="black" size="30">mdi-bell-outline</v-icon>
          </div>
          <!-- Teks -->
          <div>
            <p class="text-[15px] font-medium text-gray-900 leading-tight" style="font-weight:500;">
              Notifikasi Pengajuan PKS
            </p>
            <p class="text-[28px] font-bold text-black mt-1 leading-none" style="font-weight: bold;">24</p>
          </div>
        </div>

        <!-- Kanan: icon dalam kotak biru -->
        <div class="p-[10px] flex justify-center items-center rounded-[12px] bg-[#66b3ff] shadow-lg">
          <v-icon color="white" size="45">mdi-file-document-outline</v-icon>
        </div>
      </v-card>

    </v-col>
    <v-col cols="12" lg="4">
      <v-card elevation="0"
        class="flex justify-between items-center bg-white border border-gray-200 rounded-2xl px-6 py-4 shadow-sm w-full md:w-[380px]">
        <!-- Kiri -->
        <div class="flex items-start gap-3">
          <!-- Icon lingkaran merah -->
          <div
            class="w-12 h-12 flex justify-center items-center rounded-full bg-red-500 border-[3px] border-yellow-300 shadow-sm">
            <v-icon color="black" size="30">mdi-bell-outline</v-icon>
          </div>
          <!-- Teks -->
          <div>
            <p class="text-[15px] font-medium text-gray-900 leading-tight" style="font-weight:500;">
              Notifikasi Pengajuan Juknis
            </p>
            <p class="text-[28px] font-bold text-black mt-1 leading-none" style="font-weight: bold;">33</p>
          </div>
        </div>

        <!-- Kanan: icon dalam kotak biru -->
       <div class="p-[10px] flex justify-center items-center rounded-[12px] bg-[#66b3ff] shadow-lg">
          <v-icon color="white" size="45">mdi-clipboard-list-outline</v-icon>
        </div>
      </v-card>
    </v-col>
    <v-col cols="12" lg="4">
      <v-card elevation="0"
        class="flex justify-between items-center bg-white border border-gray-200 rounded-2xl px-6 py-4 shadow-sm w-full md:w-[380px]">
        <!-- Kiri -->
        <div class="flex items-start gap-3">
          <!-- Icon lingkaran merah -->
          <div
            class="w-12 h-12 flex justify-center items-center rounded-full bg-red-500 border-[3px] border-yellow-300 shadow-sm">
            <v-icon color="black" size="30">mdi-bell-outline</v-icon>
          </div>
          <!-- Teks -->
          <div>
            <p class="text-[15px] font-medium text-gray-900 leading-tight" style="font-weight:500;">
              Notifikasi Pengajuan POC
            </p>
            <p class="text-[28px] font-bold text-black mt-1 leading-none" style="font-weight: bold;">12</p>
          </div>
        </div>

        <!-- Kanan: icon dalam kotak biru -->
        <div class="p-[10px] flex justify-center items-center rounded-[12px] bg-[#66b3ff] shadow-lg">
          <v-icon color="white" size="45">mdi-card-account-details-outline</v-icon>
        </div>
      </v-card>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" lg="6">
      <v-card elevation="10" style="display: flex; justify-content: center; align-items: center; padding: 10px 20px;">
        <v-card-text>
          <h5 class="title font-weight-medium mb-2 text-h6 ">
            Total User
          </h5>
          <p class="mb-3 text-grey-darken-1" style="font-size: 30px; font-weight: bold;">59</p>
        </v-card-text>
        <v-icon color="primary" size="36">mdi-cog</v-icon>
      </v-card>
    </v-col>
    <v-col cols="12" lg="6">
      <v-card elevation="10" style="display: flex; justify-content: center; align-items: center; padding: 10px 20px;">
        <v-card-text>
          <h5 class="title font-weight-medium mb-2 text-h6 ">
            Total Pengajuan Bulan Ini
          </h5>
          <p class="mb-3 text-grey-darken-1" style="font-size: 30px; font-weight: bold;">2871</p>
        </v-card-text>
        <v-icon color="warning" size="36">mdi-cog</v-icon>
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
</template>
