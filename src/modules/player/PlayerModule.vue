<template>
  <div class="space-y-8 animate-fade-in pb-12" dir="rtl">
    <!-- Header Hero -->
    <header class="flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div>
        <h1 class="text-4xl font-almarai font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">
          منصة الأداء الشاملة
        </h1>
        <p class="text-neon-cyan font-almarai text-sm tracking-widest mt-2 uppercase">Node ID: PLAYER_ALPHA_7 // Security: Encrypted Tunnel</p>
      </div>
      
      <div class="flex gap-4">
        <CyberButton variant="cyan" :withLine="false" class="scale-90">مزامنة الحساسات</CyberButton>
      </div>
    </header>

    <!-- Player Info Bar (Simplified) -->
    <div class="glass-panel p-4 rounded-xl border border-white/5 flex items-center justify-between">
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 rounded-full bg-slate-800 border-2 border-neon-cyan flex items-center justify-center">
          <User class="w-6 h-6 text-white/50" />
        </div>
        <div>
          <h2 class="text-lg font-almarai font-bold">ياسين فوزي</h2>
          <p class="text-[10px] text-neon-cyan uppercase font-orbitron">First-Team Striker</p>
        </div>
      </div>
      <div class="text-right">
        <div class="text-[10px] text-white/40 uppercase mb-1">Overall Rating</div>
        <div class="text-2xl font-orbitron font-bold text-white">88<span class="text-sm text-neon-cyan">/100</span></div>
      </div>
    </div>

    <!-- Navigation Tabs for the 6 Aspects -->
    <nav class="flex overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 hide-scrollbar gap-2">
      <router-link 
        v-for="tab in tabs" 
        :key="tab.path"
        :to="tab.path"
        class="flex-shrink-0 px-6 py-3 rounded-xl border border-white/5 bg-white/5 flex items-center gap-2 hover:bg-white/10 transition-all font-almarai text-sm"
        active-class="bg-neon-cyan/20 border-neon-cyan text-neon-cyan font-bold"
      >
        <component :is="tab.icon" class="w-4 h-4" />
        {{ tab.label }}
      </router-link>
    </nav>

    <!-- Dynamic View Content -->
    <main class="min-h-[400px] relative">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

  </div>
</template>

<script setup>
import { User, Zap, Target, Compass, Brain, Video, Activity } from 'lucide-vue-next'
import CyberButton from '../../shared/ui/CyberButton.vue'

const tabs = [
  { label: 'الجانب البدني', path: '/dashboard/player/physical', icon: Zap },
  { label: 'الجانب المهاري', path: '/dashboard/player/skill', icon: Target },
  { label: 'الجانب التكتيكي', path: '/dashboard/player/tactical', icon: Compass },
  { label: 'الجانب النفسي', path: '/dashboard/player/psychological', icon: Brain },
  { label: 'تحليل الفيديو', path: '/dashboard/player/video', icon: Video },
  { label: 'التغذية والكشف عن الاصابات', path: '/dashboard/player/nutrition', icon: Activity },
]
</script>

<style scoped>
.glass-panel {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}
.animate-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Hide scrollbar for the horizontal tabs */
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* Route transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
