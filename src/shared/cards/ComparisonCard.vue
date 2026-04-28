<template>
  <div class="glass-panel p-6 rounded-2xl relative overflow-hidden group border-t border-white/5">
    <div class="flex justify-between items-center mb-8">
      <h3 class="text-xs font-orbitron font-black text-white/40 tracking-[0.3em] uppercase">Comparison Matrix // مقارنة الأداء</h3>
      <div class="flex gap-2">
        <Users class="w-4 h-4 text-neon-cyan" />
      </div>
    </div>

    <!-- Players Header -->
    <div class="flex justify-between items-center mb-10 px-4">
      <div class="text-right">
        <div class="w-12 h-12 rounded-full border-2 border-neon-cyan p-1 mb-2">
          <div class="w-full h-full rounded-full bg-slate-900 flex items-center justify-center font-orbitron text-xs font-bold text-neon-cyan">A</div>
        </div>
        <div class="text-xs font-almarai font-bold">ياسين فوزي</div>
        <div class="text-[8px] text-white/30 uppercase mt-1">Player Target</div>
      </div>

      <div class="text-xs font-orbitron font-black text-neon-magenta/40">VS</div>

      <div class="text-right flex flex-col items-end">
        <div class="w-12 h-12 rounded-full border-2 border-white/20 p-1 mb-2">
          <div class="w-full h-full rounded-full bg-slate-900 flex items-center justify-center font-orbitron text-xs font-bold text-white/40">B</div>
        </div>
        <div class="text-xs font-almarai font-bold">متوسط الفريق</div>
        <div class="text-[8px] text-white/30 uppercase mt-1">Squad Average</div>
      </div>
    </div>

    <!-- Metrics Grid -->
    <div class="space-y-6">
      <div v-for="metric in metrics" :key="metric.label" class="space-y-2">
        <div class="flex justify-between text-[10px] font-almarai uppercase tracking-widest px-2">
          <span class="text-white/40">{{ metric.label }}</span>
          <div class="flex gap-4">
            <span class="text-neon-cyan font-bold">{{ metric.valA }}%</span>
            <span class="text-white/20 font-bold">{{ metric.valB }}%</span>
          </div>
        </div>
        <div class="h-1.5 bg-white/5 rounded-full overflow-hidden flex relative">
          <!-- Baseline comparison -->
          <div class="absolute inset-0 flex justify-between px-[50%] opacity-20"><div class="w-[1px] h-full bg-white"></div></div>
          
          <div class="h-full bg-neon-cyan relative z-10" :style="{ width: (metric.valA / 2) + '%', marginLeft: '0%' }"></div>
          <div class="h-full bg-white/10 relative z-10" :style="{ width: (metric.valB / 2) + '%', marginLeft: '50%', transform: 'translateX(-100%)' }"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Users } from 'lucide-vue-next'

const metrics = [
  { label: 'السرعة القصوى', valA: 92, valB: 85 },
  { label: 'دقة التمرير', valA: 88, valB: 78 },
  { label: 'الذكاء الفراغي', valA: 94, valB: 82 },
  { label: 'التحمل البدني', valA: 81, valB: 80 }
]
</script>
