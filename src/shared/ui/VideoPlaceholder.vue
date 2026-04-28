<template>
  <div class="absolute inset-0 w-full h-full bg-slate-900 overflow-hidden">
    <!-- Grid Pattern Overlay -->
    <div class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
    
    <!-- AR HUD Elements Simulator -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-10 right-10 w-48 h-24 border-r-2 border-t-2 border-neon-cyan/30 p-4">
        <div class="text-[8px] text-neon-cyan/50 font-orbitron">SYSTEM_ALT: 45.2</div>
        <div class="w-full h-1 bg-white/5 mt-2 overflow-hidden">
          <div class="h-full bg-neon-cyan/40 w-[65%]"></div>
        </div>
      </div>
      
      <div class="absolute bottom-10 left-10 w-64 h-32 border-l-2 border-b-2 border-neon-magenta/30 p-4">
        <div class="text-[8px] text-neon-magenta/50 font-orbitron">ANALYSIS_MODE: TACTICAL</div>
        <div class="mt-2 space-y-1">
          <div v-for="i in 3" :key="i" class="h-[2px] bg-white/10" :style="{ width: (100 - (i*20)) + '%' }"></div>
        </div>
      </div>

      <!-- Scanning Line -->
      <div class="absolute inset-0 bg-gradient-to-b from-transparent via-neon-cyan/5 to-transparent h-20 scanline-anim"></div>
    </div>

    <!-- Background "Simulation" Image or Placeholder -->
    <div class="w-full h-full bg-slate-950/80 backdrop-blur-3xl animate-pulse flex items-center justify-center">
      <div class="text-white/5 font-orbitron text-[10vw] font-black select-none tracking-tighter">FOOTBALL TEC</div>
    </div>
  </div>
</template>

<style scoped>
.scanline-anim {
  animation: scan 4s linear infinite;
}

@keyframes scan {
  from { top: -20%; }
  to { top: 120%; }
}
</style>
