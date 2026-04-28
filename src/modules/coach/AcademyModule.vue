<template>
  <div class="space-y-8 animate-fade-in pb-12" dir="rtl">
    <header class="flex justify-between items-end">
      <div>
        <h1 class="text-4xl font-almarai font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">
          إدارة الأكاديمية (Academy Hub)
        </h1>
        <p class="text-neon-cyan font-almarai text-sm tracking-widest mt-2 uppercase">Central Command: ACADEMY_CORE // Role: Administrator</p>
      </div>

      <div class="flex gap-4">
        <CyberButton variant="cyan" :withLine="false" class="scale-90" @click="showDeployModal = true">نشر بروتوكول جديد</CyberButton>
      </div>
    </header>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <!-- Squad Management (Batch Ops) -->
      <div class="lg:col-span-3 space-y-6">
        <div class="glass-panel p-8 rounded-3xl border border-white/5">
          <div class="flex justify-between items-center mb-8">
            <h3 class="font-almarai font-bold text-lg">إدارة الفئات الشبانية</h3>
            <div class="flex gap-4">
               <div v-for="tag in ['U15', 'U17', 'U19', 'PRO']" :key="tag" class="px-3 py-1 bg-white/5 rounded-full text-[10px] font-orbitron text-white/40 border border-white/5 cursor-pointer hover:border-neon-cyan transition-all">
                 {{ tag }}
               </div>
            </div>
          </div>

          <div class="space-y-4">
            <div v-for="squad in squads" :key="squad.id" class="p-6 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-between group hover:border-neon-cyan/30 transition-all">
              <div class="flex items-center gap-6">
                <div class="w-12 h-12 rounded-xl bg-neon-cyan/10 flex items-center justify-center">
                  <component :is="squad.icon" class="w-6 h-6 text-neon-cyan" />
                </div>
                <div>
                  <div class="text-sm font-almarai font-bold">{{ squad.name }}</div>
                  <div class="text-[8px] text-white/30 uppercase mt-1">{{ squad.players }} Players // Coach: {{ squad.coach }}</div>
                </div>
              </div>

              <div class="flex gap-8">
                 <div v-for="m in squad.metrics" :key="m.l" class="text-center">
                    <div class="text-[8px] text-white/20 mb-1 font-orbitron">{{ m.l }}</div>
                    <div class="text-xs font-bold text-white/80">{{ m.v }}%</div>
                 </div>
              </div>

              <div class="flex gap-4">
                 <button class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-neon-cyan/20 transition-all group-hover:scale-110">
                    <Zap class="w-4 h-4 text-neon-cyan" />
                 </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions Sidebar -->
      <div class="lg:col-span-1 space-y-6">
        <div class="glass-panel p-6 rounded-2xl border-l-4 border-neon-cyan text-right">
          <h3 class="font-almarai font-bold text-sm mb-4">أهداف الأكاديمية (KPIs)</h3>
          <div class="space-y-6">
             <div v-for="kpi in kpis" :key="kpi.label">
                <div class="flex justify-between text-[10px] mb-2">
                   <span class="text-white/40">{{ kpi.label }}</span>
                   <span class="text-neon-cyan font-bold">{{ kpi.val }}%</span>
                </div>
                <div class="h-1 bg-white/5 rounded-full overflow-hidden">
                   <div class="h-full bg-neon-cyan" :style="{ width: kpi.val + '%' }"></div>
                </div>
             </div>
          </div>
        </div>

        <RecommendationCard title="توصيات التطوير الإداري" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { Users, ShieldCheck, Zap } from 'lucide-vue-next'
import CyberButton from '../../shared/ui/CyberButton.vue'
import RecommendationCard from '../../shared/cards/RecommendationCard.vue'

const squads = [
  { id: 1, name: 'فريق النخبة (U19)', coach: 'المدرب مجيد', players: 24, icon: ShieldCheck, metrics: [{l:'PHY', v:88}, {l:'SKL', v:92}, {l:'TAC', v:85}] },
  { id: 2, name: 'فريق الناشئين (U17)', coach: 'المدرب رفيق', players: 22, icon: Users, metrics: [{l:'PHY', v:82}, {l:'SKL', v:78}, {l:'TAC', v:75}] }
]

const kpis = [
  { label: 'كفاءة التدريب الإجمالية', val: 84 },
  { label: 'نسبة الالتزام بالبروتوكول', val: 92 },
  { label: 'معدل التطور الفردي', val: 78 }
]
</script>
