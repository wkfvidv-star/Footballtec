<template>
  <div class="space-y-8 animate-fade-in" dir="rtl">
    <header>
      <div class="flex items-center gap-4 mb-2">
        <div class="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
        <span class="text-[10px] font-orbitron text-red-500 uppercase font-black">AI_SIMULATION_ACTIVE</span>
      </div>
      <h1 class="text-4xl font-almarai font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">
        استخبارات الفيديو (AI Simulation)
      </h1>
      <p class="text-white/40 font-almarai text-sm tracking-widest mt-2">تتبع الحركة بالأبعاد الثلاثية // 3D Tracking Overlays</p>
    </header>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <!-- Main Video Feed (Simulation) -->
      <div class="lg:col-span-3 space-y-6">
        <div class="relative aspect-video glass-panel rounded-3xl overflow-hidden border border-white/10 group">
          <!-- Mock Video Content -->
          <div class="absolute inset-0 bg-slate-900 flex items-center justify-center">
             <VideoPlaceholder class="w-full h-full opacity-40" />
             <div class="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent"></div>
          </div>

          <!-- AR Tracking Overlays (CSS/SVG Simulation) -->
          <div class="absolute inset-0 pointer-events-none">
             <!-- Dynamic Player Boxes from Simulator -->
             <div v-for="obj in trackingData" :key="obj.id" 
                  class="absolute border-2 rounded-lg animate-pulse transition-all duration-1000"
                  :style="{ top: obj.y + '%', left: obj.x + '%', width: '80px', height: '140px', borderColor: obj.id === 'BALL' ? '#ff0055' : '#00f3ff' }"
             >
                <div class="absolute -top-12 left-0 bg-white/10 backdrop-blur-md p-2 rounded-md border border-white/20 w-32">
                   <div class="text-[8px] font-orbitron text-white uppercase">ID: {{ obj.id }}</div>
                   <div class="text-[10px] font-bold" :class="obj.id === 'BALL' ? 'text-neon-magenta' : 'text-neon-cyan'">
                      {{ obj.id === 'BALL' ? 'BALL_SPEED' : 'SPEED' }}: {{ obj.speed }} km/h
                   </div>
                </div>
             </div>

             <!-- Grid Overlay -->
             <div class="absolute inset-0 bg-[linear-gradient(to_right,#00f3ff0a_1px,transparent_1px),linear-gradient(to_bottom,#00f3ff0a_1px,transparent_1px)] bg-[size:50px_50px]"></div>
          </div>

          <!-- HUD Controls -->
          <div class="absolute bottom-8 left-8 right-8 flex justify-between items-center z-10">
             <div class="flex gap-4">
                <button class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all">
                   <Play class="w-4 h-4" />
                </button>
                <div class="px-4 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10 text-[10px] font-orbitron uppercase text-white/60 flex items-center gap-3">
                   <span class="w-2 h-2 bg-neon-cyan rounded-full animate-pulse"></span>
                   Frame Tracking: Synchronized
                </div>
             </div>
             <div class="text-[10px] font-orbitron text-white/20 uppercase tracking-[0.4em]">Node: VIDEO_CORE_STX</div>
          </div>
        </div>
      </div>

      <!-- Analysis Sidebar -->
      <div class="lg:col-span-1 space-y-6">
        <div class="glass-panel p-6 rounded-2xl border-l-4 border-neon-cyan">
           <h3 class="font-almarai font-black text-sm mb-4">كشف الأنماط (AI Pattern)</h3>
           <div class="space-y-4">
              <div v-for="pattern in patterns" :key="pattern.id" class="p-3 bg-white/5 rounded-xl border border-white/5 text-[10px] font-almarai leading-relaxed">
                 <span class="text-neon-cyan font-bold block mb-1">نمط #0{{ pattern.id }}:</span>
                 {{ pattern.desc }}
              </div>
           </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Play } from 'lucide-vue-next'
import VideoPlaceholder from '../../shared/ui/VideoPlaceholder.vue'
import { SimulatorService } from '../../core/services/SimulatorService'

const trackingData = SimulatorService.getMockTrackingData()
const patterns = SimulatorService.getMockPatterns()
</script>
