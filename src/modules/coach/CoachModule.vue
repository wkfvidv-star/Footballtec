<template>
  <div class="space-y-8 animate-fade-in pb-12" dir="rtl">
    <!-- Header -->
    <header class="flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
      <div>
        <h1 class="text-4xl font-almarai font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">
          مركز قيادة الاستخبارات Squad HQ
        </h1>
        <p class="text-neon-magenta font-almarai text-sm tracking-widest mt-2 uppercase text-right">Command Center: COACH_NODE_01 // SQUAD: Alpha Academy</p>
      </div>
      
      <div class="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
        <div v-if="isSyncing" class="px-6 py-3 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center gap-3">
          <RefreshCw class="w-5 h-5 text-neon-magenta animate-spin" />
          <span class="font-almarai font-bold text-sm text-white/80">جاري معالجة تكتيكات الفريق...</span>
        </div>
        <CyberButton v-else @click="showModal = true" variant="magenta" class="w-full md:w-auto shadow-[0_0_15px_rgba(255,0,255,0.2)]">
          <div class="flex items-center gap-2">
            <BrainCircuit class="w-5 h-5 animate-pulse" />
            <span class="font-almarai font-bold">محاكاة التدريب والمباراة القادمة</span>
          </div>
        </CyberButton>
      </div>
    </header>

    <!-- Squad Intelligence Hub -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
      
      <!-- Left Column: Squad Metrics & Alerts -->
      <div class="lg:col-span-2 space-y-8">
        
        <!-- Squad Summary Grid -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div v-for="stat in currentStats" :key="stat.label" class="glass-panel p-5 rounded-xl border-l-2 relative overflow-hidden transition-all duration-500" :class="[stat.borderColor, isSyncing ? 'opacity-50' : 'opacity-100']">
            <div v-if="isSyncing" class="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]"></div>
            <div class="text-[10px] text-white/40 font-almarai uppercase mb-2 text-right">{{ stat.label }}</div>
            <div class="text-3xl font-orbitron font-bold text-right text-transparent bg-clip-text bg-gradient-to-br from-white to-white/70">{{ stat.value }}</div>
            <div class="text-[9px] mt-2 text-right font-bold tracking-wider" :class="stat.trendColor">{{ stat.trend }}</div>
          </div>
        </div>

        <!-- Tactical Visualizer -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <PitchHeatmap />
          <!-- Replaced static RecommendationCard with dynamic AI Feedback -->
          <div class="glass-panel p-6 rounded-2xl border border-neon-magenta/30 relative overflow-hidden group">
            <div class="absolute inset-0 bg-gradient-to-br from-neon-magenta/5 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
            <div class="relative z-10">
               <div class="flex items-center gap-3 mb-4">
                  <div class="w-10 h-10 rounded-xl bg-neon-magenta/20 flex items-center justify-center border border-neon-magenta/40">
                     <Target class="w-5 h-5 text-neon-magenta" />
                  </div>
                  <h3 class="font-almarai font-black text-lg text-white">توصيات المساعد الذكي (AI)</h3>
               </div>
               <div class="space-y-4">
                  <div class="p-4 bg-white/5 rounded-xl border border-white/10 font-almarai text-sm text-white/80 leading-relaxed">
                     <p v-if="!hasSimulated">قم بتشغيل المحاكاة لجمع بيانات الفريق وتقديم أفضل توصية تكتيكية لمواجهة الخصم القادم.</p>
                     <p v-else class="text-neon-cyan">{{ aiFeedbackText }}</p>
                  </div>
                  <button class="w-full py-2.5 bg-neon-magenta/10 hover:bg-neon-magenta/20 border border-neon-magenta/30 rounded-lg text-xs text-neon-magenta font-almarai font-bold transition-all flex items-center justify-center gap-2">
                     <Zap class="w-4 h-4" /> تطبيق التوصيات فوراً
                  </button>
               </div>
            </div>
          </div>
        </div>

        <!-- Squad List with 4-Quadrant Preview -->
        <div class="space-y-4 relative">
          <div v-if="isSyncing" class="absolute inset-0 bg-black/50 backdrop-blur-sm z-20 flex items-center justify-center rounded-2xl">
             <RefreshCw class="w-8 h-8 text-neon-cyan animate-spin" />
          </div>

          <div class="flex justify-between items-center mb-4">
             <h3 class="text-xs font-orbitron text-white/40 tracking-[0.4em] uppercase text-right">Live Squad Monitor / مراقبة مباشرة</h3>
             <Activity class="w-4 h-4 text-neon-magenta animate-pulse" />
          </div>
          
          <div v-for="player in currentPlayers" :key="player.id" class="glass-panel p-4 rounded-xl flex items-center justify-between group hover:bg-white/5 transition-all">
            <div class="flex items-center gap-6">
               <div class="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center font-orbitron" :class="player.efficiency < 70 ? 'text-red-400' : 'text-neon-cyan'">
                 {{ player.rank }}
               </div>
               <div class="text-right">
                 <div class="font-almarai font-bold text-sm" :class="player.efficiency < 70 ? 'text-red-400' : 'text-white'">{{ player.name }}</div>
                 <div class="text-[8px] text-white/30 uppercase">{{ player.position }}</div>
               </div>
            </div>

            <!-- Mini 4-Quadrant Status -->
            <div class="hidden md:flex gap-8">
               <div v-for="(val, label) in player.quadrants" :key="label" class="text-center">
                  <div class="text-[8px] text-white/20 mb-1 font-orbitron">{{ label }}</div>
                  <div class="w-8 h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div class="h-full transition-all duration-1000" 
                         :class="val < 50 ? 'bg-red-500' : val > 80 ? 'bg-green-500' : 'bg-neon-cyan'" 
                         :style="{ width: `${val}%` }"></div>
                  </div>
               </div>
            </div>

            <div class="flex items-center gap-4">
               <div class="text-right">
                  <div class="text-sm font-bold font-orbitron" :class="player.efficiency < 70 ? 'text-red-500' : 'text-neon-cyan'">{{ player.efficiency }}%</div>
                  <div class="text-[8px] text-white/30 uppercase font-orbitron tracking-widest">Efficiency</div>
               </div>
               <ChevronLeft class="w-4 h-4 text-white/10 group-hover:text-neon-cyan transition-colors" />
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Comparison & Intelligence -->
      <div class="lg:col-span-1 space-y-6">
        
        <ComparisonCard />

        <!-- Dynamic Injury Warning Node -->
        <div class="glass-panel p-6 rounded-2xl border-l-4 transition-all duration-500" :class="injuryAlert.isActive ? 'border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.2)]' : 'border-green-500'">
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-almarai font-bold text-sm" :class="injuryAlert.isActive ? 'text-red-500' : 'text-green-500'">منع الإصابات (Warning Node)</h3>
            <AlertTriangle v-if="injuryAlert.isActive" class="w-5 h-5 text-red-500 animate-pulse" />
            <ShieldCheck v-else class="w-5 h-5 text-green-500" />
          </div>
          <div class="space-y-4">
            <div class="p-4 rounded-lg border transition-all duration-500" :class="injuryAlert.isActive ? 'bg-red-500/10 border-red-500/20' : 'bg-green-500/10 border-green-500/20'">
              <p v-if="injuryAlert.isActive" class="text-xs font-almarai text-white leading-relaxed">
                تحذير: اللاعب <span class="text-red-400 font-black">{{ injuryAlert.playerName }}</span> {{ injuryAlert.message }}
              </p>
              <p v-else class="text-xs font-almarai text-green-100 leading-relaxed">
                جميع اللاعبين في النطاق الآمن. لا توجد مؤشرات على إجهاد عضلي خطير.
              </p>
              <div class="mt-3 text-[9px] font-orbitron font-bold uppercase tracking-widest" :class="injuryAlert.isActive ? 'text-red-400/80' : 'text-green-400/80'">
                Action: {{ injuryAlert.action }}
              </div>
            </div>
          </div>
        </div>

        <section class="glass-panel p-6 rounded-2xl text-right">
          <h4 class="font-almarai font-bold text-xs mb-4 text-white/40 uppercase tracking-widest">Global Talent Index / كشافة النخبة</h4>
          <div class="space-y-4">
            <div v-for="i in 2" :key="i" class="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer rounded-lg">
               <div class="w-8 h-8 rounded-lg bg-neon-cyan/10 flex items-center justify-center"><User class="w-4 h-4 text-neon-cyan" /></div>
               <div>
                  <div class="text-[10px] font-almarai font-bold">لاعب أكاديمية مستهدف #{{ i }}</div>
                  <div class="text-[8px] text-white/30 uppercase">Match Score: {{ 92 + i }}% // High Growth</div>
               </div>
            </div>
          </div>
        </section>

      </div>
    </div>

    <!-- Coach Simulation Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in text-right" dir="rtl">
      <div class="glass-panel w-full max-w-2xl rounded-2xl border border-neon-magenta/40 overflow-hidden shadow-[0_0_50px_rgba(255,0,255,0.15)] flex flex-col">
        <div class="p-6 border-b border-white/10 flex justify-between items-center bg-white/5 relative overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-r from-neon-magenta/10 to-transparent"></div>
          <div class="flex items-center gap-3 relative z-10">
            <div class="w-10 h-10 rounded-full bg-neon-magenta/20 border border-neon-magenta/50 flex items-center justify-center">
              <BrainCircuit class="w-5 h-5 text-neon-magenta" />
            </div>
            <div>
              <h3 class="text-xl font-almarai font-black text-white">غرفة المحاكاة الذكية</h3>
              <p class="text-xs text-white/50 font-almarai mt-1">أدخل خطة التدريب لمعرفة تأثيرها على الفريق</p>
            </div>
          </div>
          <button @click="showModal = false" class="text-white/40 hover:text-white p-2 rounded-full hover:bg-white/10 transition-all relative z-10"><X class="w-5 h-5" /></button>
        </div>

        <div class="p-6 space-y-6 bg-black/40">
          <div class="space-y-3">
            <h4 class="font-almarai text-white/90 font-bold flex items-center gap-2 text-sm"><Activity class="w-4 h-4 text-neon-magenta/70" /> نوع التدريب اليوم (Training Focus)</h4>
            <div class="flex gap-2">
              <button v-for="t in ['استشفاء (Recovery)', 'تكتيكي مكثف (Tactical)', 'بدني شاق (Physical)']" :key="t"
                @click="simConfig.training = t"
                class="flex-1 py-3 rounded-lg font-almarai font-bold text-xs transition-all border border-transparent"
                :class="simConfig.training === t ? 'bg-neon-magenta text-white border-white/50 shadow-[0_0_15px_rgba(255,0,255,0.3)]' : 'bg-white/5 text-white/50 hover:bg-white/10'">{{ t }}</button>
            </div>
          </div>

          <div class="space-y-3">
            <h4 class="font-almarai text-white/90 font-bold flex items-center gap-2 text-sm"><Swords class="w-4 h-4 text-neon-magenta/70" /> قوة الخصم القادم</h4>
            <div class="flex gap-2">
              <button v-for="o in ['ضعيف / دفاعي', 'متوسط', 'قوي جداً (ديربي)']" :key="o"
                @click="simConfig.opponent = o"
                class="flex-1 py-3 rounded-lg font-almarai font-bold text-xs transition-all border border-transparent"
                :class="simConfig.opponent === o ? 'bg-neon-magenta text-white border-white/50 shadow-[0_0_15px_rgba(255,0,255,0.3)]' : 'bg-white/5 text-white/50 hover:bg-white/10'">{{ o }}</button>
            </div>
          </div>

          <div class="space-y-3">
            <h4 class="font-almarai text-white/90 font-bold flex items-center gap-2 text-sm"><Map class="w-4 h-4 text-neon-magenta/70" /> التشكيلة المقترحة (Formation)</h4>
            <div class="flex gap-2">
              <button v-for="f in ['4-3-3 هجومي', '4-4-2 متوازن', '5-3-2 دفاعي']" :key="f"
                @click="simConfig.formation = f"
                class="flex-1 py-3 rounded-lg font-almarai font-bold text-xs transition-all border border-transparent"
                :class="simConfig.formation === f ? 'bg-neon-magenta text-white border-white/50 shadow-[0_0_15px_rgba(255,0,255,0.3)]' : 'bg-white/5 text-white/50 hover:bg-white/10'">{{ f }}</button>
            </div>
          </div>
        </div>

        <div class="p-6 border-t border-white/10 bg-white/5 flex justify-end gap-3">
          <button @click="showModal = false" class="px-6 py-3 rounded-xl border border-white/10 text-white/70 font-almarai font-bold hover:bg-white/5 transition-all">إلغاء</button>
          <CyberButton @click="runSimulation" variant="magenta" :disabled="!isConfigComplete">
            <div class="flex items-center gap-2"><Play class="w-5 h-5" /> تشغيل محرك الذكاء الاصطناعي</div>
          </CyberButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ChevronLeft, AlertTriangle, Activity, User, RefreshCw, BrainCircuit, Target, Zap, ShieldCheck, X, Swords, Map, Play } from 'lucide-vue-next'
import CyberButton from '../../shared/ui/CyberButton.vue'
import PitchHeatmap from '../../shared/charts/PitchHeatmap.vue'
import ComparisonCard from '../../shared/cards/ComparisonCard.vue'

// Base Data
const baseStats = [
  { label: 'جاهزية الفريق (Team Readiness)', value: '88%', borderColor: 'border-white/20', trend: 'OPTIMAL', trendColor: 'text-neon-cyan' },
  { label: 'متوسط الإجهاد (Average Load)', value: `65%`, borderColor: 'border-neon-cyan', trend: 'STABLE', trendColor: 'text-neon-cyan' },
  { label: 'التوافق التكتيكي (Tactical Sync)', value: '75%', borderColor: 'border-neon-cyan', trend: 'NEEDS WORK', trendColor: 'text-yellow-400' },
  { label: 'خطر الإصابة (Injury Risk)', value: 'LOW', borderColor: 'border-green-500', trend: 'ALL CLEAR', trendColor: 'text-green-500' }
]

const basePlayers = [
  { id: 1, name: 'رفيق', position: 'مهاجم صريح', rank: '01', efficiency: 94, quadrants: { PHY: 85, SKL: 95, TAC: 80, PSY: 90 } },
  { id: 2, name: 'رحيم', position: 'مدافع محوري', rank: '02', efficiency: 78, quadrants: { PHY: 60, SKL: 70, TAC: 88, PSY: 75 } },
  { id: 3, name: 'منصف', position: 'وسط ميدان', rank: '03', efficiency: 86, quadrants: { PHY: 82, SKL: 85, TAC: 90, PSY: 80 } },
  { id: 4, name: 'مراد', position: 'رواق أيمن', rank: '04', efficiency: 82, quadrants: { PHY: 78, SKL: 75, TAC: 85, PSY: 82 } }
]

// State
const isSyncing = ref(false)
const hasSimulated = ref(false)
const showModal = ref(false)
const simConfig = ref({ training: null, opponent: null, formation: null })

const currentStats = ref(JSON.parse(JSON.stringify(baseStats)))
const currentPlayers = ref(JSON.parse(JSON.stringify(basePlayers)))
const aiFeedbackText = ref('')
const injuryAlert = ref({ isActive: false, playerName: '', message: '', action: 'MAINTAIN ROUTINE' })

const isConfigComplete = computed(() => simConfig.value.training && simConfig.value.opponent && simConfig.value.formation)

// Simulation Engine Logic
const runSimulation = () => {
  showModal.value = false
  isSyncing.value = true
  
  const { training, opponent, formation } = simConfig.value
  
  setTimeout(() => {
    // 1. Recalculate Squad Stats
    let newStats = JSON.parse(JSON.stringify(baseStats))
    
    if (training === 'بدني شاق (Physical)') {
        newStats[0].value = '72%' // Readiness drops
        newStats[0].trend = 'FATIGUED'
        newStats[0].trendColor = 'text-yellow-400'
        newStats[1].value = '92%' // Load spikes
        newStats[1].borderColor = 'border-red-500'
        newStats[1].trend = 'CRITICAL OVERLOAD'
        newStats[1].trendColor = 'text-red-500'
        newStats[3].value = 'HIGH'
        newStats[3].borderColor = 'border-red-500'
        newStats[3].trend = 'WARNING'
        newStats[3].trendColor = 'text-red-500'
    } else if (training === 'استشفاء (Recovery)') {
        newStats[0].value = '98%' // Readiness max
        newStats[0].trend = 'FULLY RECOVERED'
        newStats[0].trendColor = 'text-green-500'
        newStats[1].value = '35%' // Load low
        newStats[1].borderColor = 'border-green-500'
        newStats[1].trend = 'RESTING'
        newStats[1].trendColor = 'text-green-500'
        newStats[3].value = 'MINIMAL'
        newStats[3].borderColor = 'border-green-500'
    }

    if (formation === '4-3-3 هجومي' && training === 'تكتيكي مكثف (Tactical)') {
        newStats[2].value = '95%' // Tactical Sync rises
        newStats[2].trend = 'PERFECT SYNC'
        newStats[2].trendColor = 'text-neon-cyan'
    } else if (formation === '5-3-2 دفاعي') {
        newStats[2].value = '85%'
    }

    currentStats.value = newStats

    // 2. Recalculate Player Efficiencies
    let newPlayers = JSON.parse(JSON.stringify(basePlayers))
    
    // Khalid (Defender) gets exhausted easily in Physical
    if (training === 'بدني شاق (Physical)') {
        newPlayers[1].quadrants.PHY = 35 // Danger
        newPlayers[1].efficiency = 52
        injuryAlert.value = {
            isActive: true,
            playerName: 'رحيم',
            message: 'تجاوز عتبة الإجهاد بنسبة 85% بسبب الحمل التدريبي العالي. مؤشرات العضلة الخلفية مقلقة جداً.',
            action: 'SUBSTITUTE / ICE BATH REQUIRED'
        }
    } else {
        injuryAlert.value = { isActive: false, playerName: '', message: '', action: 'MAINTAIN ROUTINE' }
    }

    // Yassin (Striker) excels in 4-3-3 Attacking
    if (formation === '4-3-3 هجومي') {
        newPlayers[0].quadrants.TAC = 98
        newPlayers[0].efficiency = 97
    } else if (formation === '5-3-2 دفاعي') {
        newPlayers[0].quadrants.TAC = 65 // Isolated striker
        newPlayers[0].efficiency = 81
    }

    // Omar (Midfielder) performance against Opponent
    if (opponent === 'قوي جداً (ديربي)' && training !== 'استشفاء (Recovery)') {
        newPlayers[2].quadrants.PSY = 95 // Motivated for derby
        newPlayers[2].efficiency = 90
    }

    currentPlayers.value = newPlayers

    // 3. AI Smart Feedback Generation
    if (training === 'بدني شاق (Physical)' && opponent === 'قوي جداً (ديربي)') {
        aiFeedbackText.value = `تحذير تكتيكي: تدريب شاق قبل الديربي تسبب في إرهاق الخط الخلفي (خصوصاً رحيم). يُنصح بتغيير الخطة إلى ${formation !== '5-3-2 دفاعي' ? '5-3-2 دفاعي' : 'اللعب بكتلة متأخرة'} لتقليل المساحات وتخفيف الركض.`
    } else if (formation === '4-3-3 هجومي' && opponent === 'ضعيف / دفاعي') {
        aiFeedbackText.value = `خيار ممتاز. الخصم الدفاعي سيترك مساحات على الأطراف. خطة 4-3-3 ستسمح للمهاجم رفيق باستغلال كفاءته التكتيكية العالية (98%) لكسر التكتل.`
    } else if (training === 'استشفاء (Recovery)') {
        aiFeedbackText.value = `الفريق الآن في ذروة الجاهزية البدنية (98%). اللاعبون مستعدون لتطبيق خطة ${formation} بفعالية تامة. مؤشر الإصابات انخفض إلى الصفر.`
    } else {
        aiFeedbackText.value = `تكتيك متوازن. الخطة ${formation} تناسب متوسط إجهاد الفريق الحالي. تأكد من مراقبة ارتداد الرواق الأيمن مراد أثناء المباراة.`
    }

    isSyncing.value = false
    hasSimulated.value = true
  }, 2500)
}
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
@keyframes shimmer {
  100% { transform: translateX(100%); }
}
</style>
