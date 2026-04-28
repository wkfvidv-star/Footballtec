<template>
  <button 
    class="relative px-8 py-3 font-orbitron font-bold text-sm tracking-[0.2em] uppercase transition-all duration-300 group overflow-hidden"
    :class="variantClasses"
  >
    <!-- Geometric Background Structure -->
    <div class="absolute inset-0 border border-white/20 group-hover:border-white/40 transition-colors"></div>
    <div class="absolute -top-[2px] -left-[2px] w-2 h-2 border-t-2 border-l-2" :class="accentBorder"></div>
    <div class="absolute -bottom-[2px] -right-[2px] w-2 h-2 border-b-2 border-r-2" :class="accentBorder"></div>
    
    <!-- Hover Scanline Effect -->
    <div class="absolute inset-0 bg-white/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
    
    <div class="relative flex items-center justify-center gap-2">
      <slot />
      <div v-if="withLine" class="w-8 h-[1px] bg-current opacity-40 group-hover:w-12 transition-all"></div>
    </div>
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'cyan' // 'cyan', 'magenta', 'white'
  },
  withLine: {
    type: Boolean,
    default: true
  }
})

const variantClasses = computed(() => {
  const base = ""
  switch(props.variant) {
    case 'magenta': return `${base} text-neon-magenta hover:bg-neon-magenta/10`
    case 'white': return `${base} text-white hover:bg-white/10`
    default: return `${base} text-neon-cyan hover:bg-neon-cyan/10`
  }
})

const accentBorder = computed(() => {
  switch(props.variant) {
    case 'magenta': return 'border-neon-magenta'
    case 'white': return 'border-white'
    default: return 'border-neon-cyan'
  }
})
</script>
