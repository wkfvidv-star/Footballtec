<template>
  <div class="relative w-full h-[300px] glass-panel rounded-2xl p-4 overflow-hidden group">
    <div class="absolute top-4 right-4 flex flex-col gap-1 z-10 text-right">
      <div class="text-[10px] text-neon-cyan font-orbitron font-black tracking-widest uppercase">Sampling Mode: {{ samplingLabel }}</div>
      <div class="text-[8px] text-white/30 font-almarai tracking-wider uppercase leading-none">توزيع الكثافة الميدانية (Heatmap)</div>
    </div>

    <div class="absolute inset-4 border border-white/10 rounded-sm opacity-20 pointer-events-none">
      <div class="absolute inset-0 flex justify-center items-center">
        <div class="w-16 h-16 border border-white/10 rounded-full"></div>
        <div class="w-[1px] h-full bg-white/10"></div>
      </div>
    </div>

    <v-chart class="chart" :option="option" autoresize />

    <!-- Critical Event HUD -->
    <div v-if="isCritical" class="absolute inset-0 border-2 border-red-500/50 animate-pulse pointer-events-none z-20">
       <div class="absolute top-2 left-2 px-2 py-1 bg-red-500 text-[8px] font-orbitron text-white uppercase font-black">Critical Override Active</div>
    </div>
  </div>
</template>

<script setup>
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { HeatmapChart } from 'echarts/charts'
import { TitleComponent, TooltipComponent, VisualMapComponent, GridComponent } from 'echarts/components'
import VChart from 'vue-echarts'
import { ref, computed, onMounted, onUnmounted } from 'vue'

use([CanvasRenderer, HeatmapChart, TitleComponent, TooltipComponent, VisualMapComponent, GridComponent])

const props = defineProps({
  isCritical: { type: Boolean, default: false },
  samplingRate: { type: Number, default: 5000 } // Default 5s
})

const samplingLabel = computed(() => props.isCritical ? 'REAL_TIME' : 'DEBOUNCED_5s')

// Internal data state
const currentData = ref([
  [10, 20, 5], [15, 25, 10], [50, 50, 15], [80, 70, 8], [20, 80, 4]
])

const option = computed(() => ({
  backgroundColor: 'transparent',
  grid: { top: 10, bottom: 10, left: 10, right: 10 },
  xAxis: { type: 'value', min: 0, max: 100, show: false },
  yAxis: { type: 'value', min: 0, max: 100, show: false },
  visualMap: {
    min: 0, max: 25, show: false,
    inRange: { color: ['rgba(0, 243, 255, 0)', 'rgba(0, 243, 255, 0.3)', 'rgba(255, 0, 85, 0.6)'] }
  },
  series: [{
    type: 'heatmap',
    data: currentData.value,
    pointSize: 20,
    blurSize: 30
  }]
}))

let intervalId = null

const updateData = () => {
    // Simulate data update
    currentData.value = currentData.value.map(point => [
        Math.max(0, Math.min(100, point[0] + (Math.random() - 0.5) * 5)),
        Math.max(0, Math.min(100, point[1] + (Math.random() - 0.5) * 5)),
        point[2]
    ])
}

const startSampling = () => {
    const rate = props.isCritical ? 500 : props.samplingRate
    intervalId = setInterval(updateData, rate)
    console.log(`[HEATMAP] Sampling started at ${rate}ms`);
}

onMounted(() => startSampling())
onUnmounted(() => {
    if (intervalId) {
        clearInterval(intervalId)
        console.log('[HEATMAP] Node deactivated. Sampling killed.');
    }
})
</script>

<style scoped>
.chart { height: 100%; width: 100%; }
</style>
