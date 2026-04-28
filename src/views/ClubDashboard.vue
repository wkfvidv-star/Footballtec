<template>
  <div class="space-y-8 animate-fade-in pb-12" dir="rtl">
    <!-- Header -->
    <header class="flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div>
        <h1 class="text-4xl font-almarai font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">
          إدارة الكشافة والاستثمار الاستراتيجي
        </h1>
        <p class="text-neon-cyan font-almarai text-sm tracking-widest mt-2 uppercase text-right">Corporate Node: CLUB_HQ_DUBAI // ROI: Maximized</p>
      </div>
      
      <div class="flex gap-4">
        <CyberButton variant="cyan" :withLine="false" class="scale-90">تقرير الذكاء المالي</CyberButton>
      </div>
    </header>

    <!-- Executive Intelligence Matrix -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div v-for="metric in executiveMetrics" :key="metric.label" class="glass-panel p-6 rounded-2xl border-b-2" :class="metric.borderColor">
        <div class="flex items-center justify-between mb-4">
          <span class="text-[10px] text-white/40 font-almarai uppercase">{{ metric.label }}</span>
          <component :is="metric.icon" class="w-4 h-4 text-neon-cyan" />
        </div>
        <div class="text-2xl font-orbitron font-bold text-white">{{ metric.value }}</div>
        <div class="text-[8px] text-neon-magenta mt-1 uppercase">{{ metric.trend }}</div>
      </div>
    </div>

    <!-- Main Strategic Hub -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      <!-- Scouting Hub (Primary) -->
      <div class="lg:col-span-2 space-y-6">
        <div class="glass-panel p-8 rounded-3xl relative overflow-hidden text-right">
          <div class="flex justify-between items-center mb-10">
            <div>
              <h3 class="font-almarai font-bold text-lg">لوحة استكشاف المواهب (AI Scouting)</h3>
              <p class="text-[10px] text-white/30 uppercase mt-1">Global Target Identification // Live Node Detection</p>
            </div>
            <div class="flex gap-2">
               <Target class="w-5 h-5 text-neon-cyan" />
            </div>
          </div>

          <!-- Market Value Table -->
          <div class="overflow-x-auto">
            <table class="w-full text-right">
              <thead>
                <tr class="text-[10px] text-white/30 uppercase font-orbitron border-b border-white/5">
                  <th class="pb-6 pr-2 font-medium">اللاعب / Node</th>
                  <th class="pb-6 font-medium text-center">التنبؤ بالنمو</th>
                  <th class="pb-6 font-medium">القيمة السوقية</th>
                  <th class="pb-6 font-medium">درجة المطابقة</th>
                  <th class="pb-6"></th>
                </tr>
              </thead>
              <tbody class="divide-y divide-white/5">
                <tr v-for="player in prospects" :key="player.name" class="group hover:bg-white/5 transition-all">
                  <td class="py-6 pr-2">
                    <div class="flex items-center gap-4">
                      <div class="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                        <User class="w-5 h-5 text-white/20" />
                      </div>
                      <div>
                        <div class="text-sm font-almarai font-bold">{{ player.name }}</div>
                        <div class="text-[8px] text-white/40 uppercase">{{ player.age }} years // {{ player.pos }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="py-6 text-center">
                    <span class="text-[10px] font-orbitron text-neon-cyan">{{ player.growth }}</span>
                    <TrendingUp class="w-2 h-2 text-neon-cyan inline mr-1" />
                  </td>
                  <td class="py-6">
                    <span class="text-xs font-orbitron text-white/80">{{ player.value }}</span>
                  </td>
                  <td class="py-6">
                     <div class="flex items-center gap-2">
                        <div class="w-16 h-1 bg-white/5 rounded-full overflow-hidden">
                           <div class="h-full bg-neon-cyan" :style="{ width: player.match + '%' }"></div>
                        </div>
                        <span class="text-[10px] font-orbitron">{{ player.match }}%</span>
                     </div>
                  </td>
                  <td class="py-6 text-left pl-2">
                    <CyberButton variant="white" :withLine="false" class="scale-75 opacity-0 group-hover:opacity-100 transition-opacity">تذكير</CyberButton>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- ROI & Market Intelligence -->
      <div class="lg:col-span-1 space-y-6">
        
        <RecommendationCard title="توصيات الاستثمار AI" />

        <section class="glass-panel p-6 rounded-2xl border-r-4 border-neon-magenta text-right">
          <h3 class="font-almarai font-bold mb-6 text-sm">مؤشرات ROI المتوقعة</h3>
          <div class="space-y-6">
             <div v-for="roi in roiCards" :key="roi.label">
                <div class="flex justify-between items-center mb-2">
                   <span class="text-[10px] text-white/40 font-almarai uppercase">{{ roi.label }}</span>
                   <span class="text-xs font-orbitron font-bold text-neon-magenta">{{ roi.value }}</span>
                </div>
                <div class="h-1 bg-white/5 rounded-full overflow-hidden">
                   <div class="h-full bg-neon-magenta" :style="{ width: roi.percent + '%' }"></div>
                </div>
             </div>
          </div>
        </section>

        <section class="glass-panel p-6 rounded-2xl bg-gradient-to-br from-neon-cyan/5 to-transparent text-right">
           <div class="flex items-center justify-between mb-4">
              <h3 class="font-almarai font-bold text-sm">تنبيهات الانتقالات</h3>
              <Zap class="w-4 h-4 text-neon-cyan" />
           </div>
           <div class="p-3 bg-white/5 rounded-lg border border-white/5">
              <p class="text-[10px] text-white/60 font-almarai leading-relaxed">تنبيه: تحرك مكثف لأندية منافسة نحو استهداف المواهب في مركز <span class="text-neon-cyan">صانع الألعاب</span> هذا الأسبوع.</p>
           </div>
        </section>

      </div>
    </div>
  </div>
</template>

<script setup>
import { User, TrendingUp, DollarSign, Target, BarChart3, Zap } from 'lucide-vue-next'
import CyberButton from '../shared/ui/CyberButton.vue'
import RecommendationCard from '../shared/cards/RecommendationCard.vue'

const executiveMetrics = [
  { label: 'أصول المواهب المدارة', value: '184', trend: 'ACTIVE SQUAD', icon: User, borderColor: 'border-white/20' },
  { label: 'قيمة المحفظة الكلية', value: '$14.2M', trend: '+1.4M vs Q1', icon: DollarSign, borderColor: 'border-neon-cyan' },
  { label: 'كفاءة الاستقطاب', value: '82%', trend: 'ABOVE TARGET', icon: Target, borderColor: 'border-neon-cyan' },
  { label: 'العائد السنوي المتوقع', value: '16.5%', trend: 'PROJECTED', icon: BarChart3, borderColor: 'border-neon-magenta' }
]

const prospects = [
  { name: 'منذر', age: 19, pos: 'وسط ميدان هجومي', growth: '+12.4%', value: '$2.1M', match: 94 },
  { name: 'محمد', age: 17, pos: 'مدافع محوري', growth: '+8.1%', value: '$1.4M', match: 88 },
  { name: 'رحيم', age: 18, pos: 'جناح أيمن', growth: '+2.2%', value: '$850K', match: 82 },
  { name: 'رفيق', age: 20, pos: 'مهاجم', growth: '+5.4%', value: '$1.2M', match: 79 }
]

const roiCards = [
  { label: 'تطوير القيمة المضافة', percent: 85, value: '340% ROI' },
  { label: 'كفاءة أكاديمية النخبة', percent: 91, value: '91/100' }
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
</style>
