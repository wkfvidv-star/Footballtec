<template>
  <div class="font-almarai bg-slate-950 min-h-screen text-white antialiased">
    <!-- Global Notifications HUD -->
    <CyberToast />
    
    <!-- Navigation Progress or Routing -->
    <router-view v-slot="{ Component }">
      <transition 
        name="page" 
        mode="out-in"
      >
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { watch, onMounted } from 'vue'
import { useAuthStore } from './core/store/authStore'
import { socketService } from './core/services/socketService'
import CyberToast from './shared/ui/CyberToast.vue'

const auth = useAuthStore()

// Manage Socket connection based on Auth status
watch(() => auth.isAuthenticated, (isAuth) => {
  if (isAuth) {
    socketService.connect()
  } else {
    socketService.disconnect()
  }
}, { immediate: true })

onMounted(() => {
  if (auth.isAuthenticated) {
    socketService.connect()
  }
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Almarai:wght@300;400;700;800&family=Orbitron:wght@400;500;700;900&display=swap');

.font-almarai { font-family: 'Almarai', sans-serif; }
.font-orbitron { font-family: 'Orbitron', sans-serif; }

.page-enter-active, .page-leave-active {
  transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.19, 1, 0.22, 1);
}
.page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Custom Scrollbar for Cyber Theme */
::-webkit-scrollbar {
  width: 4px;
}
::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.02);
}
::-webkit-scrollbar-thumb {
  background: #00f3ff;
  border-radius: 2px;
}
</style>
