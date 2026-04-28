<template>
  <div class="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden" dir="rtl">
    <!-- Background HUD -->
    <div class="absolute inset-0 z-0 opacity-20">
      <VideoPlaceholder />
    </div>

    <div class="relative z-10 w-full max-w-md">
      <div class="glass-panel p-10 rounded-2xl border-t-2 border-neon-cyan relative overflow-hidden">
        <div class="absolute top-0 right-0 w-32 h-32 bg-neon-cyan/5 blur-3xl"></div>
        
        <div class="flex flex-col items-center mb-10">
          <div class="w-16 h-16 border-2 border-neon-cyan rotate-45 flex items-center justify-center mb-6">
            <span class="rotate-[-45deg] font-orbitron font-black text-2xl">F</span>
          </div>
          <h1 class="text-3xl font-almarai font-black tracking-widest text-center uppercase">تسجيل الدخول</h1>
          <p class="text-white/40 font-almarai text-xs mt-2 uppercase tracking-widest">Football Tec Platform Access</p>
        </div>

        <div v-if="auth.error" class="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-xs font-almarai text-center">
          {{ auth.error }}
        </div>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <div class="space-y-2">
            <label class="text-[10px] uppercase font-orbitron tracking-widest text-white/60">البريد الإلكتروني</label>
            <input 
              v-model="email"
              type="email" 
              class="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-lg focus:border-neon-cyan outline-none transition-all font-almarai text-sm text-right"
              placeholder="example@mail.com"
              required
            />
          </div>

          <div class="space-y-2">
            <label class="text-[10px] uppercase font-orbitron tracking-widest text-white/60">كلمة المرور</label>
            <input 
              v-model="password"
              type="password" 
              class="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-lg focus:border-neon-cyan outline-none transition-all font-almarai text-sm text-right"
              placeholder="••••••••"
              required
            />
          </div>

          <div class="pt-4">
            <CyberButton :loading="auth.loading" variant="cyan" :withLine="false" class="w-full py-4 text-sm group">
              دخول
              <Zap class="w-4 h-4 mr-2 inline group-hover:animate-pulse" />
            </CyberButton>
          </div>
        </form>

        <div class="mt-8 pt-8 border-t border-white/5 text-center">
          <p class="text-white/40 font-almarai text-xs">
            ليس لديك حساب بعد؟ 
            <router-link to="/register" class="text-neon-cyan hover:underline mr-1">إنشاء حساب جديد</router-link>
          </p>
        </div>
      </div>

      <div class="mt-6 flex justify-between text-[8px] font-orbitron text-white/20 uppercase tracking-[0.4em]">
        <span>System: Online</span>
        <span>Version: 1.0.0</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Zap } from 'lucide-vue-next'
import { useAuthStore } from '../core/store/authStore'
import CyberButton from '../shared/ui/CyberButton.vue'
import VideoPlaceholder from '../shared/ui/VideoPlaceholder.vue'

const email = ref('')
const password = ref('')
const auth = useAuthStore()
const router = useRouter()

const handleLogin = async () => {
  const success = await auth.login(email.value, password.value)
  if (success) {
    router.push('/dashboard')
  }
}
</script>
