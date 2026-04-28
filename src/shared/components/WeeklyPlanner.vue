<template>
  <div class="glass-panel p-8 rounded-3xl border border-white/5 relative overflow-hidden group">
    <div class="absolute top-0 right-0 w-64 h-64 bg-neon-cyan/5 blur-3xl opacity-20 pointer-events-none"></div>
    
    <div class="flex justify-between items-center mb-8">
      <div>
        <h3 class="font-almarai font-black text-lg">مخطط الأحمال الأسبوعي</h3>
        <p class="text-[10px] text-white/30 uppercase font-orbitron mt-1">Workload_Management // Node_Schedule_Active</p>
      </div>
      <div class="flex gap-2">
         <Calendar class="w-5 h-5 text-neon-cyan" />
      </div>
    </div>

    <!-- Calendar Grid -->
    <div class="grid grid-cols-7 gap-4">
      <div v-for="day in training.weeklyPlan" :key="day.day" class="space-y-4">
        <div class="text-[10px] font-almarai font-bold text-center text-white/40 uppercase tracking-widest">{{ day.day }}</div>
        
        <div 
          class="aspect-[4/5] rounded-xl border border-white/5 flex flex-col items-center justify-center p-3 transition-all relative group/day cursor-pointer"
          :class="[
            day.status === 'COMPLETED' ? 'bg-neon-cyan/10 border-neon-cyan/30' : 
            day.status === 'ACTIVE' ? 'bg-neon-magenta/10 border-neon-magenta/30 shadow-[0_0_15px_rgba(255,0,133,0.1)]' : 
            'bg-white/5 hover:bg-white/10'
          ]"
        >
          <!-- Status Icon -->
          <div class="mb-2">
             <CheckCircle2 v-if="day.status === 'COMPLETED'" class="w-4 h-4 text-neon-cyan" />
             <Activity v-else-if="day.status === 'ACTIVE'" class="w-4 h-4 text-neon-magenta animate-pulse" />
             <Moon v-else class="w-4 h-4 text-white/10" />
          </div>

          <!-- Data Preview -->
          <div v-if="day.protocolId" class="text-center">
             <div class="text-[8px] font-almarai text-white/60 line-clamp-2 leading-tight">
                {{ getProtocolTitle(day.protocolId) }}
             </div>
             <div class="mt-2 text-[8px] font-orbitron text-neon-cyan font-bold">LOAD: {{ getProtocolLoad(day.protocolId) }}%</div>
          </div>
          <div v-else class="text-[8px] font-orbitron text-white/10 uppercase">Rest</div>

          <!-- Add/Edit Overlay -->
          <div class="absolute inset-0 bg-slate-950/80 backdrop-blur-sm opacity-0 group-hover/day:opacity-100 transition-opacity flex items-center justify-center rounded-xl">
             <Plus class="w-5 h-5 text-neon-cyan" />
          </div>
        </div>
      </div>
    </div>

    <!-- Load Warning HUD -->
    <div class="mt-8 flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
       <div class="flex items-center gap-4">
          <div class="w-2 h-2 rounded-full bg-neon-cyan animate-ping"></div>
          <span class="text-[10px] font-almarai text-white/60">تنبيه: الحمل البدني للأسبوع القادم متوازن ومثالي حسب الخوارزمية.</span>
       </div>
       <div class="text-[10px] font-orbitron text-neon-cyan">OPTIMAL_LOAD: 82%</div>
    </div>
  </div>
</template>

<script setup>
import { Calendar, CheckCircle2, Activity, Moon, Plus } from 'lucide-vue-next'
import { useTrainingStore } from '../../core/store/trainingStore'

const training = useTrainingStore()

const getProtocolTitle = (id) => {
  return training.protocols.find(p => p.id === id)?.title || ''
}

const getProtocolLoad = (id) => {
  return training.protocols.find(p => p.id === id)?.load || 0
}
</script>
