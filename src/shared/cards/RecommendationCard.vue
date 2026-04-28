<template>
  <div class="glass-panel p-6 rounded-2xl relative overflow-hidden group border-r-4 border-neon-cyan">
    <!-- Background AI Brain Pulse -->
    <div class="absolute top-0 right-0 w-32 h-32 bg-neon-cyan/5 blur-3xl group-hover:bg-neon-cyan/10 transition-colors"></div>
    
    <div class="flex justify-between items-start mb-6">
      <div class="text-right">
        <h3 class="text-sm font-almarai font-black uppercase text-white tracking-widest">{{ title }}</h3>
        <p class="text-[8px] text-neon-cyan font-orbitron mt-1">AI_Tactical_Analysis // NODE_ALPHA_07</p>
      </div>
      <BrainCircuit class="w-6 h-6 text-neon-cyan animate-pulse" />
    </div>

    <div class="space-y-4">
      <div v-for="(rec, index) in recommendations" :key="index" class="flex gap-4 items-center p-3 bg-white/5 rounded-lg border border-white/5 hover:border-neon-cyan/30 transition-all cursor-crosshair">
        <div class="w-8 h-8 rounded-lg bg-neon-cyan/10 flex items-center justify-center font-orbitron text-[10px] font-bold text-neon-cyan">
          0{{ index + 1 }}
        </div>
        <p class="text-[10px] font-almarai text-white/60 leading-relaxed text-right flex-1">
          {{ rec }}
        </p>
      </div>
    </div>

    <!-- HUD Line -->
    <div class="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mt-6 mb-4"></div>
    
    <div class="flex justify-between items-center text-[8px] font-orbitron uppercase tracking-widest text-white/20">
      <span>Confidence: 94.2%</span>
      <span>Live Node Tracking</span>
    </div>
  </div>
</template>

<script setup>
import { BrainCircuit } from 'lucide-vue-next'

defineProps({
  title: {
    type: String,
    default: 'توصيات الذكاء الاصطناعي'
  },
  recommendations: {
    type: Array,
    default: () => [
      'زيادة حدة الركض في الثلث الأخير من الملعب لاستغلال المساحات.',
      'التركيز على التمرير الطولي لكسر الخط الدفاعي للخصم.',
      'تقليل زمن الاستشفاء بين التمارين عالية الكثافة بنسبة 5%.'
    ]
  }
})
</script>
