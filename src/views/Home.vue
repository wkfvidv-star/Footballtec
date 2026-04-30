<template>
  <div class="min-h-screen bg-slate-950 text-white selection:bg-neon-cyan/30 selection:text-neon-cyan overflow-x-hidden" dir="rtl">
    <!-- Background Layer -->
    <div class="fixed inset-0 z-0">
      <VideoPlaceholder />
    </div>

    <!-- HUD Layout -->
    <div class="relative z-10 flex flex-col min-h-screen">
      <!-- Top Navigation -->
      <nav class="h-24 px-12 flex items-center justify-between border-b border-white/5 backdrop-blur-md">
        <div class="flex items-center gap-4 cursor-pointer" @click="router.push('/')">
          <div class="w-10 h-10 border-2 border-neon-cyan rotate-45 flex items-center justify-center">
            <span class="rotate-[-45deg] font-orbitron font-black text-xl">F</span>
          </div>
          <span class="font-orbitron font-bold text-xl tracking-widest">فوتبول<span class="text-neon-cyan">تيك</span></span>
        </div>
        
        <div class="hidden md:flex items-center gap-10">
          <a v-for="link in navLinks" :key="link.en" href="#" class="font-almarai text-xs tracking-widest text-white/60 hover:text-neon-cyan transition-colors uppercase">
            {{ link.ar }}
          </a>
        </div>

        <div class="flex gap-4">
          <router-link to="/login">
            <CyberButton variant="cyan" :withLine="false" class="scale-90">تسجيل الدخول</CyberButton>
          </router-link>
        </div>
      </nav>

      <!-- Main Content -->
      <main class="flex-1 flex flex-col lg:flex-row p-8 lg:p-12 gap-8 items-center lg:items-stretch">
        <!-- Hero Section -->
        <div class="flex-1 flex flex-col justify-center gap-8 max-w-2xl text-right">
          <div class="flex items-center gap-3 justify-start">
            <div class="w-2 h-2 rounded-full bg-neon-cyan animate-pulse"></div>
            <span class="text-neon-cyan font-almarai text-xs tracking-widest uppercase font-bold">تم تحميل محرك الذكاء الاصطناعي التكتيكي</span>
          </div>
          
          <h1 class="text-6xl lg:text-7xl font-black leading-tight font-almarai">
            أطلق عنان <br />
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-white">رياضيي الجيل التقني</span>
          </h1>

          <p class="text-white/60 font-almarai text-lg leading-relaxed max-w-md">
            تحليلات أداء الجيل القادم. نجمع بين بيانات الأجهزة القابلة للارتداء وتحليل الفيديو الفوري لإعادة تعريف بروتوكولات التدريب.
          </p>

          <div class="flex flex-wrap gap-6 mt-4">
            <router-link to="/register">
              <CyberButton variant="cyan">ابدأ الآن مجاناً</CyberButton>
            </router-link>
            <div class="flex items-center gap-4 px-6 py-4 glass-panel rounded-lg cursor-pointer hover:bg-white/5 transition-all">
              <span class="font-almarai text-xs tracking-widest uppercase">جولة في النظام</span>
              <Play class="w-5 h-5 text-neon-magenta fill-neon-magenta rotate-180" />
            </div>
          </div>

          <!-- Feature Grid -->
          <div class="grid grid-cols-2 gap-6 mt-12 pt-12 border-t border-white/5">
            <div v-for="feat in features" :key="feat.title">
              <div class="text-neon-cyan font-almarai text-xs tracking-widest mb-2 font-bold">{{ feat.title }}</div>
              <div class="text-white/40 text-xs font-almarai">{{ feat.desc }}</div>
            </div>
          </div>
        </div>

        <!-- Stats Section -->
        <div class="w-full lg:w-[500px] flex flex-col gap-6 justify-center">
          <div class="relative group">
            <div class="absolute -inset-1 bg-gradient-to-r from-neon-cyan to-neon-magenta rounded-2xl opacity-20 blur group-hover:opacity-40 transition-opacity"></div>
            <RadarChart />
          </div>

          <div class="glass-panel p-6 rounded-2xl border-r-4 border-neon-magenta flex items-center justify-between">
            <div>
              <div class="text-xs text-white/40 font-almarai uppercase mb-1">درجة استكشاف النخبة</div>
              <div class="text-2xl font-orbitron font-bold">7</div>
            </div>
            <TrendingUp class="w-10 h-10 text-neon-magenta opacity-50" />
          </div>
        </div>
      </main>

      <!-- Footer -->
      <footer class="h-16 px-12 flex items-center justify-between text-[10px] font-almarai tracking-widest text-white/30 border-t border-white/5">
        <span>© 2026 فوتبول تيك // نظام التشغيل V1.0.4</span>
        <div class="flex gap-8">
          <span>التأخير: 12ms</span>
          <span>الحالة: مثالي</span>
          <span class="text-neon-cyan font-bold">اتصال مشفر</span>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { Play, TrendingUp } from 'lucide-vue-next'
import CyberButton from '../shared/ui/CyberButton.vue'
import VideoPlaceholder from '../shared/ui/VideoPlaceholder.vue'
import RadarChart from '../shared/charts/RadarChart.vue'

const router = useRouter()

const navLinks = [
  { en: 'Dashboard', ar: 'لوحة التحكم' },
  { en: 'Intelligence', ar: 'الذكاء' },
  { en: 'Fleet', ar: 'الأسطول' },
  { en: 'Protocols', ar: 'البروتوكولات' }
]

const features = [
  { title: 'مزامنة حيوية', desc: 'تدفق بيانات حيوية فورية من الأجهزة القابلة للارتداء.' },
  { title: 'تحليل الميدان', desc: 'تغليف تكتيكي فوري عبر رؤية الكمبيوتر.' }
]
</script>
