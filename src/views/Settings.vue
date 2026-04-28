<template>
  <div class="space-y-8 animate-fade-in" dir="rtl">
    <header>
      <h1 class="text-4xl font-almarai font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">
        الإعدادات والبروتوكولات
      </h1>
      <p class="text-white/40 font-almarai text-sm tracking-widest mt-2 uppercase">System Configuration // Node_Settings_Active</p>
    </header>

    <div class="glass-panel p-12 rounded-3xl border border-white/5 flex flex-col items-center justify-center min-h-[400px]">
      <SettingsIcon class="w-16 h-16 text-white/5 mb-6 animate-spin-slow" />
      <h2 class="text-xl font-almarai font-bold text-white/40 mb-2">قيد التطوير التكتيكي</h2>
      <p class="text-sm font-almarai text-white/20">يتم حالياً تجهيز واجهات التحكم المتقدمة بإعدادات الأداء والأمان.</p>
    </div>
  </div>
</template>

<script setup>
import { Settings as SettingsIcon } from 'lucide-vue-next'
</script>

<style scoped>
.glass-panel {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(12px);
}
.animate-spin-slow {
  animation: spin 8s linear infinite;
}
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
