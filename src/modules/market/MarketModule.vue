<template>
  <div class="space-y-8 animate-fade-in pb-12" dir="rtl">
    <!-- Header -->
    <header class="flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
      <div>
        <h1 class="text-4xl font-almarai font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">
           السوق الرسمي لاكتشاف المواهب
        </h1>
        <p class="text-neon-gold font-almarai text-sm tracking-widest mt-2 uppercase text-right">Official Marketplace // AI Scouting Node</p>
      </div>

      <div class="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
        <div v-if="isSyncing" class="px-6 py-3 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center gap-3">
          <RefreshCw class="w-5 h-5 text-neon-gold animate-spin" />
          <span class="font-almarai font-bold text-sm text-white/80">جاري مسح قاعدة البيانات...</span>
        </div>
        <CyberButton v-else @click="showModal = true" variant="gold" class="w-full md:w-auto shadow-[0_0_15px_rgba(250,204,21,0.2)]">
          <div class="flex items-center gap-2">
            <Search class="w-5 h-5 animate-pulse" />
            <span class="font-almarai font-bold">تشغيل الكشاف الذكي (AI Scout)</span>
          </div>
        </CyberButton>
      </div>
    </header>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8 relative z-10">
      
      <!-- Main Marketplace Feed -->
      <div class="lg:col-span-3 space-y-6 relative">
        <div v-if="isSyncing" class="absolute inset-0 bg-black/50 backdrop-blur-sm z-20 flex flex-col items-center justify-center rounded-3xl border border-neon-gold/20">
             <div class="w-16 h-16 rounded-full border-t-2 border-r-2 border-neon-gold animate-spin mb-4"></div>
             <p class="font-orbitron tracking-widest text-neon-gold text-xs uppercase animate-pulse">Scanning Global Database...</p>
        </div>

        <div v-if="!hasSimulated && !isSyncing" class="glass-panel p-12 text-center rounded-3xl border border-white/5 border-dashed flex flex-col items-center justify-center min-h-[400px]">
             <Fingerprint class="w-20 h-20 text-white/10 mb-4" />
             <h3 class="text-xl font-almarai font-bold text-white/50 mb-2">النظام بانتظار أوامر البحث</h3>
             <p class="text-sm text-white/30 font-almarai max-w-md">قم بتشغيل الكشاف الذكي، وحدد المركز والميزانية ليقوم الذكاء الاصطناعي بترشيح أفضل الصفقات لك.</p>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
           <div v-for="player in displayedProspects" :key="player.id" class="glass-panel p-6 rounded-3xl border border-white/5 group hover:border-neon-gold/30 transition-all cursor-pointer relative overflow-hidden">
              <!-- Live Tag -->
              <div class="absolute top-4 left-4 z-10">
                <span class="px-2 py-0.5 bg-green-500/20 text-green-400 border border-green-500/30 rounded text-[9px] font-orbitron uppercase tracking-widest">{{ player.matchScore }}% MATCH</span>
              </div>

              <div class="relative w-full aspect-[3/4] rounded-2xl overflow-hidden mb-6">
                 <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
                 <div class="absolute inset-0 bg-slate-900 flex items-center justify-center">
                    <User class="w-20 h-20 text-white/5 group-hover:scale-110 transition-transform duration-500" />
                 </div>
                 <div class="absolute inset-x-4 bottom-4 z-20 bg-black/60 backdrop-blur-md p-3 rounded-xl border border-neon-gold/30">
                    <div class="text-[8px] font-almarai text-white/60 mb-0.5">القيمة السوقية المتوقعة</div>
                    <div class="text-sm font-orbitron text-neon-gold font-black uppercase">{{ formatCurrency(player.value) }}</div>
                 </div>
              </div>

              <div class="text-right space-y-2">
                 <h3 class="font-almarai font-black text-lg text-white group-hover:text-neon-gold transition-colors">{{ player.name }}</h3>
                 <div class="flex flex-row-reverse justify-between items-center">
                    <span class="text-[10px] text-white/40 uppercase font-orbitron tracking-widest bg-white/5 px-2 py-1 rounded">{{ player.pos }}</span>
                    <span class="text-xs font-bold text-green-400 flex items-center gap-1">
                        <TrendingUp class="w-3 h-3" /> {{ player.growth }}
                    </span>
                 </div>
              </div>

              <div class="mt-6 flex gap-4 pt-6 border-t border-white/5">
                 <div v-for="(v, l) in player.stats" :key="l" class="flex-1 text-center">
                    <div class="text-[8px] text-white/20 mb-1 font-orbitron">{{ l }}</div>
                    <div class="text-sm font-bold font-orbitron text-white/80">{{ v.toFixed(0) }}</div>
                 </div>
              </div>
           </div>
        </div>
      </div>

      <!-- Market Intelligence Sidebar -->
      <div class="lg:col-span-1 space-y-6 text-right">
        <div class="glass-panel p-6 rounded-2xl border-l-4 transition-all duration-500" :class="aiMarketStatus === 'WARNING' ? 'border-red-500' : 'border-neon-gold'">
           <div class="flex items-center justify-between mb-6">
              <BrainCircuit class="w-5 h-5" :class="aiMarketStatus === 'WARNING' ? 'text-red-500' : 'text-neon-gold'" />
              <h3 class="font-almarai font-black text-sm text-white">ذكاء السوق (Market AI)</h3>
           </div>
           
           <div v-if="!hasSimulated" class="p-4 bg-white/5 rounded-xl border border-white/10 text-center">
              <p class="text-xs font-almarai text-white/40">لا توجد تحليلات حية حالياً. ابدأ البحث.</p>
           </div>
           <div v-else class="p-4 rounded-xl border transition-all duration-500" :class="aiMarketStatus === 'WARNING' ? 'bg-red-500/10 border-red-500/30' : 'bg-neon-gold/10 border-neon-gold/30'">
              <p class="text-xs font-almarai leading-relaxed" :class="aiMarketStatus === 'WARNING' ? 'text-red-100' : 'text-white'">
                 {{ aiFeedbackText }}
              </p>
           </div>
        </div>

        <section class="glass-panel p-6 rounded-2xl" :class="hasSimulated ? 'bg-gradient-to-br from-neon-gold/5 to-transparent' : 'bg-black/20'">
           <h4 class="text-[10px] font-orbitron text-white/30 tracking-[0.4em] uppercase mb-4 text-center">Transfer Matrix / العائد المالي</h4>
           <div class="space-y-4">
              <div v-if="!hasSimulated" class="text-center text-xs text-white/20 font-almarai">
                  قم بالبحث لمعرفة العوائد الاستثمارية (ROI).
              </div>
              <div v-else v-for="(matrix, i) in currentMatrix" :key="i" class="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
                 <div class="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" :class="matrix.roi > 10 ? 'bg-green-500/20 text-green-400' : 'bg-neon-gold/20 text-neon-gold'">
                     <LineChart class="w-4 h-4" />
                 </div>
                 <div class="flex-grow">
                    <div class="flex justify-between items-center mb-1">
                        <div class="text-[10px] font-almarai font-bold text-white">{{ matrix.title }}</div>
                        <div class="text-[10px] font-orbitron font-bold" :class="matrix.roi > 10 ? 'text-green-400' : 'text-neon-gold'">+{{ matrix.roi }}%</div>
                    </div>
                    <div class="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                        <div class="h-full bg-neon-gold transition-all duration-1000" :style="{ width: `${matrix.roi * 3}%` }"></div>
                    </div>
                 </div>
              </div>
           </div>
        </section>
      </div>
    </div>

    <!-- AI Scouting Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in text-right" dir="rtl">
      <div class="glass-panel w-full max-w-2xl rounded-2xl border border-neon-gold/40 overflow-hidden shadow-[0_0_50px_rgba(250,204,21,0.15)] flex flex-col">
        <div class="p-6 border-b border-white/10 flex justify-between items-center bg-white/5 relative overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-r from-neon-gold/10 to-transparent"></div>
          <div class="flex items-center gap-3 relative z-10">
            <div class="w-10 h-10 rounded-full bg-neon-gold/20 border border-neon-gold/50 flex items-center justify-center">
              <Search class="w-5 h-5 text-neon-gold" />
            </div>
            <div>
              <h3 class="text-xl font-almarai font-black text-white">إعداد الكشاف الذكي</h3>
              <p class="text-xs text-white/50 font-almarai mt-1">حدد متطلبات النادي بدقة ليقوم الـ AI بالبحث</p>
            </div>
          </div>
          <button @click="showModal = false" class="text-white/40 hover:text-white p-2 rounded-full hover:bg-white/10 transition-all relative z-10"><X class="w-5 h-5" /></button>
        </div>

        <div class="p-6 space-y-6 bg-black/40">
          <div class="space-y-3">
            <h4 class="font-almarai text-white/90 font-bold flex items-center gap-2 text-sm"><Target class="w-4 h-4 text-neon-gold/70" /> المركز المطلوب (Position)</h4>
            <div class="flex gap-2">
              <button v-for="pos in ['مهاجم (ST/RW)', 'وسط (CM/CAM)', 'مدافع (CB/RB)']" :key="pos"
                @click="simConfig.position = pos"
                class="flex-1 py-3 rounded-lg font-almarai font-bold text-xs transition-all border border-transparent"
                :class="simConfig.position === pos ? 'bg-neon-gold text-black border-white/50 shadow-[0_0_15px_rgba(250,204,21,0.3)]' : 'bg-white/5 text-white/50 hover:bg-white/10'">{{ pos }}</button>
            </div>
          </div>

          <div class="space-y-3">
            <h4 class="font-almarai text-white/90 font-bold flex items-center gap-2 text-sm"><Wallet class="w-4 h-4 text-neon-gold/70" /> الميزانية المتاحة للميركاتو</h4>
            <div class="flex gap-2">
              <button v-for="b in ['منخفضة (< $500k)', 'متوسطة ($1M - $3M)', 'عالية (> $5M)']" :key="b"
                @click="simConfig.budget = b"
                class="flex-1 py-3 rounded-lg font-almarai font-bold text-xs transition-all border border-transparent"
                :class="simConfig.budget === b ? 'bg-neon-gold text-black border-white/50 shadow-[0_0_15px_rgba(250,204,21,0.3)]' : 'bg-white/5 text-white/50 hover:bg-white/10'">{{ b }}</button>
            </div>
          </div>

          <div class="space-y-3">
            <h4 class="font-almarai text-white/90 font-bold flex items-center gap-2 text-sm"><Sparkles class="w-4 h-4 text-neon-gold/70" /> نوع الموهبة المستهدفة</h4>
            <div class="flex gap-2">
              <button v-for="t in ['موهبة للمستقبل (Future)', 'جاهز فوراً (Ready)', 'نجم صف أول (Star)']" :key="t"
                @click="simConfig.talent = t"
                class="flex-1 py-3 rounded-lg font-almarai font-bold text-xs transition-all border border-transparent"
                :class="simConfig.talent === t ? 'bg-neon-gold text-black border-white/50 shadow-[0_0_15px_rgba(250,204,21,0.3)]' : 'bg-white/5 text-white/50 hover:bg-white/10'">{{ t }}</button>
            </div>
          </div>
        </div>

        <div class="p-6 border-t border-white/10 bg-white/5 flex justify-end gap-3">
          <button @click="showModal = false" class="px-6 py-3 rounded-xl border border-white/10 text-white/70 font-almarai font-bold hover:bg-white/5 transition-all">إلغاء</button>
          <CyberButton @click="runScoutSimulation" variant="gold" :disabled="!isConfigComplete">
            <div class="flex items-center gap-2"><ScanEye class="w-5 h-5" /> مسح قاعدة البيانات</div>
          </CyberButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { User, Search, TrendingUp, RefreshCw, Fingerprint, BrainCircuit, X, Target, Wallet, Sparkles, LineChart, ScanEye } from 'lucide-vue-next'
import CyberButton from '../../shared/ui/CyberButton.vue'

// Base Database Simulation
const database = [
  { id: 1, name: 'ضياء', pos: 'مهاجم (ST/RW)', type: 'موهبة للمستقبل (Future)', value: 250000, matchScore: 94, growth: '+35% Growth', stats: { PHY: 0, SKL: 0, TAC: 0 }, targetStats: { PHY: 82, SKL: 88, TAC: 70 } },
  { id: 2, name: 'حمزة', pos: 'مهاجم (ST/RW)', type: 'نجم صف أول (Star)', value: 8500000, matchScore: 98, growth: '+5% Peak', stats: { PHY: 0, SKL: 0, TAC: 0 }, targetStats: { PHY: 92, SKL: 95, TAC: 88 } },
  { id: 3, name: 'سفيان', pos: 'مهاجم (ST/RW)', type: 'جاهز فوراً (Ready)', value: 1800000, matchScore: 85, growth: '+12% Steady', stats: { PHY: 0, SKL: 0, TAC: 0 }, targetStats: { PHY: 85, SKL: 82, TAC: 80 } },
  { id: 4, name: 'زكريا', pos: 'وسط (CM/CAM)', type: 'موهبة للمستقبل (Future)', value: 150000, matchScore: 91, growth: '+40% High ROI', stats: { PHY: 0, SKL: 0, TAC: 0 }, targetStats: { PHY: 75, SKL: 86, TAC: 78 } },
  { id: 5, name: 'وليد', pos: 'وسط (CM/CAM)', type: 'جاهز فوراً (Ready)', value: 2200000, matchScore: 88, growth: '+8% Steady', stats: { PHY: 0, SKL: 0, TAC: 0 }, targetStats: { PHY: 88, SKL: 84, TAC: 85 } },
  { id: 6, name: 'بلال', pos: 'مدافع (CB/RB)', type: 'جاهز فوراً (Ready)', value: 1200000, matchScore: 89, growth: '+10% Steady', stats: { PHY: 0, SKL: 0, TAC: 0 }, targetStats: { PHY: 90, SKL: 65, TAC: 88 } },
  { id: 7, name: 'أيمن', pos: 'مدافع (CB/RB)', type: 'نجم صف أول (Star)', value: 6500000, matchScore: 96, growth: '+2% Peak', stats: { PHY: 0, SKL: 0, TAC: 0 }, targetStats: { PHY: 96, SKL: 72, TAC: 94 } },
]

// State
const isSyncing = ref(false)
const hasSimulated = ref(false)
const showModal = ref(false)
const simConfig = ref({ position: null, budget: null, talent: null })
const isConfigComplete = computed(() => simConfig.value.position && simConfig.value.budget && simConfig.value.talent)

const displayedProspects = ref([])
const aiFeedbackText = ref('')
const aiMarketStatus = ref('OK') // 'OK' or 'WARNING'
const currentMatrix = ref([])

const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)
}

const runScoutSimulation = () => {
  showModal.value = false
  isSyncing.value = true
  
  const { position, budget, talent } = simConfig.value
  
  setTimeout(() => {
    // Logic: Filter database based on position and talent type primarily.
    let matches = JSON.parse(JSON.stringify(database)).filter(p => p.pos === position)
    
    let budgetLimit = budget === 'منخفضة (< $500k)' ? 500000 : budget === 'متوسطة ($1M - $3M)' ? 3000000 : 100000000;
    
    // AI Financial Conflict Check
    if (talent === 'نجم صف أول (Star)' && budget === 'منخفضة (< $500k)') {
        aiMarketStatus.value = 'WARNING'
        aiFeedbackText.value = `تحذير مالي: ميزانيتك (${budget}) لا تسمح بالتعاقد مع ${talent}. قمنا بتعديل البحث وعرض "مواهب للمستقبل" في مركز ${position} تتناسب مع ميزانيتك وتحمل عوائد استثمارية (ROI) ضخمة في المستقبل.`
        // Fallback to future talents
        matches = matches.filter(p => p.type === 'موهبة للمستقبل (Future)')
    } else {
        aiMarketStatus.value = 'OK'
        matches = matches.filter(p => p.type === talent)
        
        if (talent === 'موهبة للمستقبل (Future)') {
            aiFeedbackText.value = `تحليل الكشاف: قرار استثماري ممتاز. المواهب الشابة في مركز ${position} المتوفرة تمتلك هامش تطور يتجاوز 35%. هذه الصفقات لن تستنزف الميزانية وستضاعف قيمتها خلال موسمين.`
        } else if (talent === 'نجم صف أول (Star)') {
            aiFeedbackText.value = `تحليل الكشاف: لقد اخترت شراء الجاهزية. هؤلاء النجوم سيكلفون جزءاً كبيراً من ميزانيتك العالية، لكنهم يضمنون تأثيراً فورياً (Match Score > 95%) في المباريات الحاسمة القادمة.`
        } else {
            aiFeedbackText.value = `تحليل الكشاف: لاعبون جاهزون للمشاركة فوراً بقيمة سوقية متوازنة. خيار آمن جداً لسد العجز الحالي في التشكيلة دون مخاطرات مالية كبرى.`
        }
    }

    // Transfer Matrix Generation based on talent type
    if (matches.length > 0 && matches[0].type === 'موهبة للمستقبل (Future)') {
        currentMatrix.value = [
            { title: 'العائد المالي المتوقع (Season 1)', roi: 18 },
            { title: 'العائد المالي المتوقع (Season 2)', roi: 42 }
        ]
    } else if (matches.length > 0 && matches[0].type === 'نجم صف أول (Star)') {
         currentMatrix.value = [
            { title: 'العائد المالي المتوقع (قصير الأمد)', roi: 5 },
            { title: 'تأثير القيمة التجارية للنادي', roi: 25 }
        ]
    } else {
         currentMatrix.value = [
            { title: 'نمو القيمة السوقية', roi: 12 }
        ]
    }

    // Set and Animate Matches
    displayedProspects.value = matches.map(m => ({
        ...m,
        stats: { PHY: 0, SKL: 0, TAC: 0 } // Start at 0 for animation
    }))

    isSyncing.value = false
    hasSimulated.value = true

    // Animate the stats counting up
    setTimeout(() => {
        displayedProspects.value.forEach((player, pIndex) => {
            const steps = 40
            const interval = 1500 / steps
            let currentStep = 0
            
            const timer = setInterval(() => {
                currentStep++
                player.stats.PHY += player.targetStats.PHY / steps
                player.stats.SKL += player.targetStats.SKL / steps
                player.stats.TAC += player.targetStats.TAC / steps

                if (currentStep >= steps) {
                    player.stats = { ...player.targetStats }
                    clearInterval(timer)
                }
            }, interval)
        })
    }, 100)

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
