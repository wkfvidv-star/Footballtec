<template>
  <div class="min-h-[80vh] flex flex-col items-center justify-center p-6 space-y-16 animate-fade-in" dir="rtl">
    
    <!-- Branding Header -->
    <header class="text-center space-y-4 max-w-2xl">
      <div class="relative inline-block px-8 py-2 border border-neon-cyan/20 rounded-full bg-neon-cyan/5 backdrop-blur-md mb-4">
         <span class="text-[10px] font-orbitron tracking-[0.5em] text-neon-cyan font-black uppercase">Football Tec HQ // Pro Intelligence Gateway</span>
         <div class="absolute -inset-1 blur-md bg-neon-cyan/10 opacity-50 -z-10"></div>
      </div>
      <h1 class="text-5xl font-almarai font-black text-white leading-tight">
        طريقك نحو <span class="glow-cyan text-neon-cyan uppercase">الاحتراف</span>
      </h1>
      <p class="text-white/40 font-almarai text-sm leading-relaxed max-w-xl mx-auto">
        اختر مسارك في المنصة الرياضية الأكثر تطوراً في الشرق الأوسط. انطلق نحو تحليل الأداء، تطوير المهارات، أو اكتشاف الفرص العالمية.
      </p>
    </header>

    <!-- Portal Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-7xl">
       <PortalCard 
         v-for="portal in portals" 
         :key="portal.id" 
         v-bind="portal" 
         @select="router.push(portal.path)"
       />
    </div>

    <!-- HUD Background Decor -->
    <div class="fixed inset-0 pointer-events-none -z-10 overflow-hidden flex items-center justify-center opacity-30">
        <div class="w-[800px] h-[800px] border border-white/5 rounded-full animate-pulse-slow"></div>
        <div class="absolute w-[600px] h-[600px] border border-neon-cyan/5 rounded-full animate-spin-slow"></div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { Users, Activity, ShoppingCart } from 'lucide-vue-next'
import { onMounted } from 'vue'
import PortalCard from '../shared/ui/PortalCard.vue'
import { useAuthStore } from '../core/store/authStore'
import { SimulatorService } from '../core/services/SimulatorService'

const router = useRouter()
const auth = useAuthStore()

onMounted(() => {
  // Atomic Initialization: Wipe all module states when entering Gateway
  auth.resetAllStores()
  // Clean up any background services
  SimulatorService.stopService()
})

const portals = [
  {
    id: 'coach',
    title: 'المدرب',
    subtitle: 'COACH_PORTAL_V6',
    description: 'تخطيط تكتيكي احترافي، تحليل أداء اللاعبين باستخدام الذكاء الاصطناعي، وإدارة شاملة للفريق والأكاديمية.',
    icon: Users,
    color: 'magenta',
    tags: ['تحسين المهارات', 'تحليل الأداء', 'إدارة الفريق'],
    path: '/dashboard/coach',
    portalId: 'CMD_NODE_01'
  },
  {
    id: 'player',
    title: 'اللاعب',
    subtitle: 'PLAYER_PORTAL_V6',
    description: 'برامج تدريبية مخصصة، تتبع التقدم البدني والمهاري لحظياً، والوصول إلى بروتوكولات الاستشفاء العالمية.',
    icon: Activity,
    color: 'cyan',
    tags: ['تتبع التقدم', 'برامج تدريبية', 'تحليل بيومتري'],
    path: '/dashboard/player',
    portalId: 'PLY_NODE_07'
  },
  {
    id: 'market',
    title: 'سوق المواهب',
    subtitle: 'TALENT_MARKET_01',
    description: 'اكتشف المواهب الواعدة، فرص احترافية عالمية، وبناء مصفوفة تسويقية متكاملة للاعبين الكبار.',
    icon: ShoppingCart,
    color: 'gold',
    tags: ['فرص احترافية', 'اكتشاف المواهب', 'تحليل السوق'],
    path: '/dashboard/market',
    portalId: 'MKT_NODE_XX'
  }
]
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 1.2s ease-out forwards;
}
.animate-pulse-slow {
  animation: pulse 8s infinite ease-in-out;
}
.animate-spin-slow {
  animation: spin 30s linear infinite;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 0.1; }
  50% { transform: scale(1.1); opacity: 0.3; }
}
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
