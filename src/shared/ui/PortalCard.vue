<template>
  <div 
    class="relative group cursor-pointer transition-all duration-500 hover:-translate-y-2"
    @click="$emit('select')"
  >
    <!-- Background Glow -->
    <div 
      class="absolute -inset-1 opacity-20 blur-2xl group-hover:opacity-60 transition-opacity duration-500 rounded-3xl"
      :style="{ backgroundColor: glowColor }"
    ></div>

    <div class="relative glass-panel p-8 rounded-3xl border-2 overflow-hidden h-full flex flex-col justify-between"
         :class="borderColorClass">
      
      <!-- Scanline Overlay -->
      <div class="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(255,255,255,0.02)_50%)] bg-[size:100%_4px] pointer-events-none"></div>

      <div class="relative z-10">
        <div class="flex justify-between items-start mb-6">
          <div class="text-right">
            <h2 class="text-3xl font-almarai font-black tracking-tighter" :class="glowTextClass">{{ title }}</h2>
            <p class="text-[10px] font-orbitron uppercase tracking-[0.4em] opacity-40 mt-1">{{ subtitle }}</p>
          </div>
          <div class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
             <component :is="icon" class="w-6 h-6 transition-transform duration-500 group-hover:scale-110" :class="iconColorClass" />
          </div>
        </div>

        <p class="text-xs font-almarai text-white/60 leading-relaxed mb-8 text-right">
          {{ description }}
        </p>

        <div class="space-y-3">
          <div v-for="tag in tags" :key="tag" class="flex items-center gap-3 justify-end text-[10px] font-almarai uppercase tracking-widest text-white/30">
             <span>{{ tag }}</span>
             <div class="w-1.5 h-1.5 rounded-full" :class="tagColorClass"></div>
          </div>
        </div>
      </div>

      <!-- Footer / ID -->
      <div class="relative z-10 mt-12 flex justify-between items-end border-t border-white/5 pt-6">
         <ArrowLeft class="w-5 h-5 text-white/20 group-hover:-translate-x-2 transition-transform duration-500" :class="glowTextClass" />
         <div class="text-[8px] font-orbitron opacity-10 tracking-[0.8em] uppercase">{{ portalId }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ArrowLeft } from 'lucide-vue-next'
import { computed } from 'vue'

const props = defineProps({
  title: String,
  subtitle: String,
  description: String,
  icon: Object,
  color: { type: String, default: 'cyan' },
  tags: Array,
  portalId: String
})

const glowColor = computed(() => {
  if (props.color === 'magenta') return '#ff0055'
  if (props.color === 'gold') return '#ffcc00'
  return '#00f3ff'
})

const borderColorClass = computed(() => `border-neon-${props.color}`)
const glowTextClass = computed(() => `glow-${props.color} text-neon-${props.color}`)
const iconColorClass = computed(() => `text-neon-${props.color}`)
const tagColorClass = computed(() => `bg-neon-${props.color}`)
</script>

<style scoped>
.glass-panel {
  background: rgba(10, 15, 25, 0.8);
  backdrop-filter: blur(20px);
}
</style>
