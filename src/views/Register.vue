<template>
  <div class="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden" dir="rtl">
    <!-- Background HUD -->
    <div class="absolute inset-0 z-0 opacity-20">
      <VideoPlaceholder />
    </div>

    <div class="relative z-10 w-full max-w-lg">
      <div class="glass-panel p-10 rounded-2xl border-t-2 border-neon-magenta relative overflow-hidden">
        <div class="absolute top-0 right-0 w-32 h-32 bg-neon-magenta/5 blur-3xl"></div>
        
        <!-- زر الرجوع -->
        <button @click="router.back()" class="absolute top-6 left-6 text-white/40 hover:text-white transition-colors flex items-center gap-2 z-20">
          <ArrowRight class="w-5 h-5" />
          <span class="text-xs font-almarai font-bold">رجوع</span>
        </button>

        <div class="flex flex-col items-center mb-8">
          <div class="w-16 h-16 border-2 border-neon-magenta rotate-45 flex items-center justify-center mb-6">
            <span class="rotate-[-45deg] font-orbitron font-black text-2xl">F</span>
          </div>
          <h1 class="text-3xl font-almarai font-black tracking-widest text-center uppercase">إنشاء هوية جديدة</h1>
          <p class="text-white/40 font-almarai text-xs mt-2 uppercase tracking-widest">Football Tec Platform Enrollment</p>
        </div>

        <form @submit.prevent="handleRegister" class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-2">
            <label class="text-[10px] uppercase font-orbitron tracking-widest text-white/60">Full Name / الاسم الكامل</label>
            <input 
              v-model="name"
              type="text" 
              class="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-lg focus:border-neon-magenta outline-none transition-all font-almarai text-sm"
              placeholder="الاسم الثلاثي"
              required
            />
          </div>

          <div class="space-y-2">
            <label class="text-[10px] uppercase font-orbitron tracking-widest text-white/60">Email / البريد الإلكتروني</label>
            <input 
              v-model="email"
              type="email" 
              class="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-lg focus:border-neon-magenta outline-none transition-all font-almarai text-sm"
              placeholder="name@link.com"
              required
            />
          </div>

          <div class="space-y-2">
            <label class="text-[10px] uppercase font-orbitron tracking-widest text-white/60">User Role / دور المستخدم</label>
            <select 
              v-model="role"
              class="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-lg focus:border-neon-magenta outline-none transition-all font-almarai text-sm"
            >
              <option value="PLAYER">لاعب (Player)</option>
              <option value="COACH">مدرب (Coach)</option>
              <option value="CLUB_ADMIN">نادي (Club)</option>
            </select>
          </div>

          <div class="space-y-2">
            <label class="text-[10px] uppercase font-orbitron tracking-widest text-white/60">Security Key / الرمز السري</label>
            <input 
              v-model="password"
              type="password" 
              class="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-lg focus:border-neon-magenta outline-none transition-all font-almarai text-sm"
              placeholder="••••••••"
              required
            />
          </div>

          <div class="md:col-span-2 pt-4">
            <CyberButton :loading="auth.loading" variant="magenta" :withLine="false" class="w-full py-4 text-sm group">
              تأكيد التسجيل
              <UserPlus class="w-4 h-4 ml-2 inline" />
            </CyberButton>
          </div>
        </form>

        <div class="mt-8 pt-8 border-t border-white/5 text-center">
          <p class="text-white/40 font-almarai text-xs">
            لديك حساب بالفعل؟ 
            <router-link to="/login" class="text-neon-magenta hover:underline ml-1">تسجيل الدخول</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { UserPlus, ArrowRight } from 'lucide-vue-next'
import { useAuthStore } from '../core/store/authStore'
import CyberButton from '../shared/ui/CyberButton.vue'
import VideoPlaceholder from '../shared/ui/VideoPlaceholder.vue'

const name = ref('')
const email = ref('')
const password = ref('')
const role = ref('PLAYER')
const auth = useAuthStore()
const router = useRouter()

const handleRegister = async () => {
  const success = await auth.register(name.value, email.value, password.value, role.value)
  if (success) {
    router.push('/login')
  }
}
</script>
