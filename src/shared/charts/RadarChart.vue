<template>
  <div class="w-full h-[400px] glass-panel rounded-2xl p-4 overflow-hidden relative">
    <div class="absolute top-4 left-4 flex flex-col gap-1 z-10">
      <div class="text-[10px] text-neon-cyan font-orbitron font-bold tracking-widest uppercase">Biometric Hub</div>
      <div class="text-[8px] text-white/30 font-almarai tracking-wider">نظام فحص النخبة V.04</div>
    </div>
    <v-chart class="chart" :option="option" autoresize />
  </div>
</template>

<script setup>
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { RadarChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  VisualMapComponent
} from 'echarts/components'
import VChart from 'vue-echarts'
import { ref, provide } from 'vue'

use([
  CanvasRenderer,
  RadarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  VisualMapComponent
])

const option = ref({
  backgroundColor: 'transparent',
  color: ['#00f3ff', '#ff0055'],
  radar: {
    shape: 'polygon',
    indicator: [
      { name: 'السرعة', max: 100 },
      { name: 'التحمل', max: 100 },
      { name: 'القوة', max: 100 },
      { name: 'الرشاقة', max: 100 },
      { name: 'التقنية', max: 100 },
      { name: 'الرؤية', max: 100 }
    ],
    splitNumber: 5,
    axisName: {
      color: 'rgba(255, 255, 255, 0.6)',
      fontFamily: 'Almarai',
      fontSize: 10,
      fontWeight: 'bold',
      padding: [3, 5]
    },
    splitLine: {
      lineStyle: {
        color: 'rgba(0, 243, 255, 0.1)'
      }
    },
    splitArea: {
      areaStyle: {
        color: ['rgba(0, 243, 255, 0.02)', 'rgba(0, 243, 255, 0.05)']
      }
    },
    axisLine: {
      lineStyle: {
        color: 'rgba(0, 243, 255, 0.2)'
      }
    }
  },
  series: [
    {
      name: 'قدرات اللاعب',
      type: 'radar',
      data: [
        {
          value: [85, 92, 78, 90, 88, 82],
          name: 'المستوى الحالي',
          areaStyle: {
            color: 'rgba(0, 243, 255, 0.3)'
          },
          lineStyle: {
            width: 2,
            color: '#00f3ff'
          },
          symbol: 'none'
        }
      ]
    }
  ]
})
</script>

<style scoped>
.chart {
  height: 100%;
  width: 100%;
}
</style>
