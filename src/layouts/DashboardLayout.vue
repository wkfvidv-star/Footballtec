<template>
  <div class="min-h-screen bg-slate-950 text-white flex overflow-hidden" dir="rtl">
    <!-- Cyber Sidebar -->
    <aside 
      v-if="!isGateway"
      class="hidden lg:flex w-64 glass-panel border-l border-white/5 flex-col z-20 transition-all duration-300"
    >
      <div class="p-8 flex items-center gap-3">
        <div class="w-8 h-8 border-2 border-neon-cyan rotate-45 flex items-center justify-center">
          <span class="rotate-[-45deg] font-orbitron font-black text-sm">F</span>
        </div>
        <span class="font-orbitron font-bold text-sm tracking-widest text-neon-cyan">FOOTBALL<span class="text-white">TEC</span></span>
      </div>

      <nav class="flex-1 px-4 py-4 space-y-2">
        <router-link 
          v-for="item in menuItems" 
          :key="item.path" 
          :to="item.path"
          class="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-white/5 transition-all group"
          active-class="bg-neon-cyan/10 border-r-2 border-neon-cyan"
        >
          <component :is="item.icon" class="w-5 h-5 text-white/50 group-hover:text-neon-cyan transition-colors" />
          <span class="font-almarai text-sm">{{ item.label }}</span>
        </router-link>
      </nav>

      <div class="p-4 border-t border-white/5">
        <button @click="handleLogout" class="w-full flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-red-500/10 text-red-500 transition-all">
          <LogOut class="w-5 h-5" />
          <span class="font-almarai text-sm">تسجيل الخروج</span>
        </button>
      </div>
    </aside>

    <!-- Main Content Area -->
    <div class="flex-1 flex flex-col min-w-0 overflow-hidden relative pb-20 lg:pb-0">
      <!-- Top HUD Bar -->
      <header class="h-16 border-b border-white/5 flex items-center justify-between px-8 backdrop-blur-md">
        <div v-if="!isGateway" class="flex items-center gap-4">
          <Menu class="w-5 h-5 cursor-pointer lg:hidden" />
          <h2 class="font-almarai text-sm font-bold opacity-70">{{ currentRouteName }}</h2>
        </div>
        <div v-else class="flex items-center justify-between w-full">
           <div class="flex items-center gap-3">
             <div class="w-6 h-6 border-2 border-neon-cyan rotate-45 flex items-center justify-center">
               <span class="rotate-[-45deg] font-orbitron font-black text-[10px]">F</span>
             </div>
             <span class="font-orbitron font-bold text-xs tracking-widest text-neon-cyan">FOOTBALL<span class="text-white">TEC</span></span>
           </div>
           
           <button @click="handleLogout" class="text-red-500 hover:bg-red-500/10 px-4 py-2 rounded-lg transition-all flex items-center gap-2 border border-red-500/20">
             <LogOut class="w-4 h-4" />
             <span class="text-xs font-almarai">خروج (تنظيف الجلسة)</span>
           </button>
        </div>

        <div v-if="!isGateway" class="flex items-center gap-6">
          <!-- IoT Status HUD -->
          <div class="hidden lg:flex items-center gap-4 px-4 py-2 bg-white/5 rounded-lg border border-white/5 mr-4 overflow-hidden relative group">
             <div class="absolute inset-0 bg-neon-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
             
             <button @click="iot.setMode(iot.mode === 'MOCK' ? 'REAL' : 'MOCK')" class="text-[8px] font-orbitron font-black px-2 py-0.5 rounded bg-white/10 hover:bg-neon-cyan hover:text-black transition-all">
                {{ iot.mode }}
             </button>

             <div class="w-[1px] h-4 bg-white/10"></div>

             <div v-for="device in iot.devices" :key="device.id" class="flex items-center gap-2 group/dev cursor-help" :title="device.label">
                <div class="w-1.5 h-1.5 rounded-full" :class="device.status === 'ONLINE' ? 'bg-neon-cyan shadow-[0_0_8px_rgba(0,243,255,0.5)]' : 'bg-red-500'"></div>
                <span class="text-[8px] font-orbitron text-white/40 group-hover/dev:text-white/60 transition-colors uppercase">{{ device.type }}</span>
             </div>
          </div>

          <div class="flex flex-col text-left">
            <span class="text-[10px] text-white/40 uppercase font-orbitron">User Node</span>
            <span class="text-xs font-almarai text-neon-cyan">{{ auth.user?.name || 'مستخدم' }}</span>
          </div>
          <div class="w-10 h-10 rounded-full bg-gradient-to-br from-neon-cyan to-neon-magenta p-[1px]">
            <div class="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden">
               <User class="w-6 h-6 text-white/30" />
            </div>
          </div>
        </div>
      </header>

      <!-- Dashboard View -->
      <main class="flex-1 overflow-y-auto p-8 relative">
        <div class="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
        <Suspense>
          <template #default>
            <router-view />
          </template>
          <template #fallback>
            <SkeletonLoader />
          </template>
        </Suspense>
      </main>

      <!-- Mobile Navigation -->
      <BottomNav v-if="!isGateway" class="lg:hidden" />
    </div>

    <!-- Global HUD Scanline -->
    <div v-if="!isGateway" class="fixed inset-0 pointer-events-none scanline opacity-30"></div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { 
  LayoutDashboard, 
  Users, 
  Activity, 
  Settings, 
  LogOut, 
  Menu, 
  User,
  ShieldCheck,
  Zap,
  ShoppingCart
} from 'lucide-vue-next'
import { useAuthStore } from '../core/store/authStore'
import { useIotStore } from '../core/store/iotStore'
import BottomNav from '../shared/components/BottomNav.vue'
import SkeletonLoader from '../shared/ui/SkeletonLoader.vue'

const auth = useAuthStore()
const iot = useIotStore()
const router = useRouter()
const route = useRoute()

const isGateway = computed(() => route.name === 'PortalGateway')
const isCoach = computed(() => auth.user?.role === 'COACH' || auth.role === 'COACH')

const menuItems = computed(() => {
  const role = auth.role || auth.user?.role || 'PLAYER'; // Fallback for dev
  const items = [];
  
  if (role === 'PLAYER') {
    items.push({ path: '/dashboard/player', label: 'منصة اللاعب', icon: Activity });
  } else if (role === 'COACH') {
    items.push({ path: '/dashboard/coach', label: 'إدارة الفريق', icon: Users });
    items.push({ path: '/dashboard/academy', label: 'إدارة الأكاديمية', icon: LayoutDashboard });
  }
  
  // Everyone sees the market and settings
  items.push({ path: '/dashboard/market', label: 'سوق التحويلات', icon: ShoppingCart });
  items.push({ path: '/dashboard/settings', label: 'الإعدادات', icon: Settings });
  
  return items;
});

const currentRouteName = computed(() => {
  // Check exact path match or if the current path starts with the menu item path
  const currentPath = route.path;
  const match = menuItems.value.find(item => 
    currentPath === item.path || (item.path !== '/dashboard' && currentPath.startsWith(item.path + '/'))
  );
  return match?.label || 'المنصة'
})

const handleLogout = () => {
  auth.logout()
  router.push('/login')
}
</script>

<style scoped>
.router-link-active span {
  color: var(--color-neon-cyan);
}
</style>
