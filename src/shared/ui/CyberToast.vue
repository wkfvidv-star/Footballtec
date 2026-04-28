<template>
  <div class="fixed top-6 left-6 z-[100] flex flex-col gap-4 w-80 pointer-events-none" dir="rtl">
    <TransitionGroup name="toast">
      <div 
        v-for="notif in store.notifications" 
        :key="notif.id"
        class="pointer-events-auto glass-panel p-4 rounded-xl border-t-2 relative overflow-hidden shadow-2xl"
        :class="variantClasses(notif.type)"
      >
        <div class="absolute top-0 right-0 w-24 h-24 bg-white/5 blur-2xl"></div>
        
        <div class="flex items-start gap-3">
          <div class="mt-1">
            <AlertCircle v-if="notif.type === 'critical'" class="w-4 h-4 text-red-500" />
            <Zap v-else-if="notif.type === 'info'" class="w-4 h-4 text-neon-cyan" />
            <CheckCircle v-else class="w-4 h-4 text-green-500" />
          </div>
          
          <div class="flex-1">
            <h4 class="text-[10px] font-orbitron font-black tracking-widest uppercase mb-1" :class="notif.type === 'critical' ? 'text-red-500' : 'text-white'">
              {{ notif.title || defaultTitle(notif.type) }}
            </h4>
            <p class="text-[10px] font-almarai text-white/70 leading-relaxed">{{ notif.message }}</p>
          </div>

          <button @click="store.removeNotification(notif.id)" class="text-white/20 hover:text-white transition-colors">
            <X class="w-3 h-3" />
          </button>
        </div>

        <!-- Progress Bar -->
        <div class="absolute bottom-0 right-0 h-[1px] bg-white/20 progress-anim" :style="{ animationDuration: notif.duration + 'ms' }"></div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { AlertCircle, Zap, CheckCircle, X } from 'lucide-vue-next'
import { useNotificationStore } from '../../core/store/notificationStore'

const store = useNotificationStore()

const variantClasses = (type) => {
  switch(type) {
    case 'critical': return 'border-red-500 bg-red-500/10'
    case 'error': return 'border-red-400 bg-red-400/5'
    case 'warning': return 'border-yellow-500 bg-yellow-500/5'
    default: return 'border-neon-cyan bg-neon-cyan/5'
  }
}

const defaultTitle = (type) => {
  switch(type) {
    case 'critical': return 'CRITICAL_ALERT'
    case 'error': return 'NODE_ERROR'
    default: return 'SYSTEM_MESSAGE'
  }
}
</script>

<style scoped>
.toast-enter-active, .toast-leave-active {
  transition: all 0.4s cubic-bezier(0.19, 1, 0.22, 1);
}
.toast-enter-from {
  opacity: 0;
  transform: translateX(-50px) scale(0.9);
}
.toast-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

.progress-anim {
  animation: progress linear forwards;
}

@keyframes progress {
  from { width: 100%; }
  to { width: 0%; }
}
</style>
