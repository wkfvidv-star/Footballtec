<template>
  <nav class="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-t border-white/10 px-6 py-4">
    <div class="flex justify-between items-center max-w-lg mx-auto">
      <router-link 
        v-for="item in navItems" 
        :key="item.path" 
        :to="item.path"
        class="flex flex-col items-center gap-1 group"
        v-slot="{ isActive }"
      >
        <div class="p-2 rounded-xl transition-all duration-300"
             :class="isActive ? 'bg-neon-cyan/20 text-neon-cyan' : 'text-white/40 group-hover:text-white'">
          <component :is="item.icon" class="w-5 h-5" />
        </div>
        <span class="text-[8px] font-almarai font-bold uppercase tracking-widest"
              :class="isActive ? 'text-neon-cyan' : 'text-white/20'">
          {{ item.label }}
        </span>
      </router-link>
    </div>
  </nav>
</template>

<script setup>
import { Home, LayoutDashboard, ShoppingCart, User, Settings } from 'lucide-vue-next'

const navItems = [
  { path: '/dashboard', label: 'الرئيسية', icon: Home },
  { path: '/dashboard/academy', label: 'الأكاديمية', icon: LayoutDashboard },
  { path: '/dashboard/market', label: 'التحويلات', icon: ShoppingCart },
  { path: '/dashboard/settings', label: 'الإعدادات', icon: Settings }
]
</script>

<style scoped>
.router-link-active .glow-on-active {
  box-shadow: 0 0 15px rgba(0, 243, 255, 0.3);
}
</style>
