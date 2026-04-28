<template>
  <div class="space-y-6 animate-fade-in pb-8">
    <div class="glass-panel p-6 md:p-8 rounded-2xl border-t-2 border-neon-cyan relative overflow-hidden">
      <div class="absolute -right-20 -top-20 w-64 h-64 bg-neon-cyan/5 rounded-full blur-3xl pointer-events-none"></div>
      <div class="flex flex-col md:flex-row md:items-start justify-between gap-6 relative z-10">
        <div>
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 rounded-full bg-neon-cyan/20 border border-neon-cyan flex items-center justify-center">
              <Apple class="w-5 h-5 text-neon-cyan" />
            </div>
            <h2 class="text-xl md:text-2xl font-almarai font-black tracking-tight">التغذية والكشف عن الإصابات <span class="text-neon-cyan">(Football Tec)</span></h2>
          </div>
          <p class="text-white/80 font-almarai text-sm leading-relaxed max-w-3xl mb-4">
            نظام متكامل لتحليل الحالة البدنية والوقاية من الإصابات باستخدام:
            <span class="inline-flex items-center gap-1 text-neon-cyan font-bold mx-1 bg-neon-cyan/10 px-2 py-0.5 rounded"><Activity class="w-4 h-4"/> مستشعرات حيوية</span>
            + <span class="inline-flex items-center gap-1 text-purple-400 font-bold mx-1 bg-purple-400/10 px-2 py-0.5 rounded"><BrainCircuit class="w-4 h-4"/> ذكاء اصطناعي طبي</span>
          </p>
        </div>
        <div class="flex-shrink-0 pt-2">
          <CyberButton v-if="!hasData && !isSyncing" @click="showModal = true" variant="cyan" class="w-full md:w-auto">
            <div class="flex items-center gap-2"><Stethoscope class="w-5 h-5 animate-pulse" /><span class="font-almarai font-bold">تشغيل الفحص الطبي والغذائي</span></div>
          </CyberButton>
          <div v-else-if="isSyncing" class="px-6 py-3 bg-white/5 border border-white/10 rounded-lg flex items-center gap-3">
            <RefreshCw class="w-5 h-5 text-neon-cyan animate-spin" />
            <span class="font-almarai font-bold text-sm text-white/80">جاري تحليل المؤشرات الحيوية...</span>
          </div>
          <div v-else class="px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center gap-2 text-green-400">
            <CheckCircle2 class="w-5 h-5" /><span class="font-almarai font-bold text-sm">اكتمل الفحص (Live)</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="!isSyncing && !hasData" class="flex flex-col items-center justify-center py-20 text-center glass-panel rounded-2xl border border-white/5 border-dashed">
      <HeartPulse class="w-16 h-16 text-white/10 mb-4" />
      <h3 class="text-xl font-almarai font-bold text-white/50 mb-2">النظام الطبي في وضع الاستعداد</h3>
      <p class="text-sm text-white/30 font-almarai max-w-md">قم بالضغط على "تشغيل الفحص" لإدخال بيانات التغذية والنوم لمعرفة جاهزية اللاعب.</p>
    </div>

    <!-- Loading Skeletons -->
    <div v-if="isSyncing" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <div v-for="i in 6" :key="i" class="glass-panel p-5 rounded-2xl border border-neon-cyan/20 relative overflow-hidden h-64">
        <div class="absolute inset-0 bg-gradient-to-r from-transparent via-neon-cyan/5 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]"></div>
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-10 rounded-xl bg-white/5 animate-pulse"></div>
          <div class="h-5 w-28 bg-white/5 rounded animate-pulse"></div>
        </div>
        <div class="h-16 bg-black/20 rounded-xl mb-4 animate-pulse"></div>
        <div class="space-y-3">
          <div class="flex justify-between"><div class="h-3 w-1/3 bg-white/5 rounded animate-pulse"></div><div class="h-3 w-1/4 bg-white/5 rounded animate-pulse"></div></div>
          <div class="flex justify-between"><div class="h-3 w-1/2 bg-white/5 rounded animate-pulse"></div><div class="h-3 w-1/5 bg-white/5 rounded animate-pulse"></div></div>
        </div>
      </div>
    </div>

    <!-- Data Grid -->
    <div v-if="hasData" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-fade-in">
      <div v-for="(metric, index) in activeMetrics" :key="index" class="glass-panel p-5 rounded-2xl border border-white/5 hover:border-neon-cyan/30 transition-all group flex flex-col relative overflow-hidden">
        <div class="absolute top-4 right-4 flex items-center gap-1.5 z-20">
          <span class="relative flex h-2 w-2"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span class="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span></span>
          <span class="text-[9px] text-green-400/80 font-orbitron uppercase">Live</span>
        </div>
        <div class="flex items-center gap-3 mb-4 z-10">
          <div class="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-neon-cyan/10 group-hover:border-neon-cyan/30 transition-all">
            <component :is="metric.icon" class="w-5 h-5 text-white group-hover:text-neon-cyan transition-colors" />
          </div>
          <h3 class="font-almarai font-bold text-base pr-4">{{ index + 1 }}. {{ metric.title }}</h3>
        </div>
        <div class="bg-black/30 rounded-xl p-4 mb-4 border border-white/5 flex flex-col relative overflow-hidden">
          <div class="text-[10px] text-neon-cyan/60 font-orbitron uppercase tracking-widest mb-1 flex items-center gap-1">
            <component :is="metric.methodIcon" class="w-3 h-3" /> {{ metric.method }}
          </div>
          <div class="flex items-baseline gap-1">
            <span class="text-4xl font-black font-orbitron text-transparent bg-clip-text bg-gradient-to-br" :class="metric.isReverseColor ? 'from-white to-red-400' : 'from-white to-neon-cyan'">{{ metric.displayValue.toFixed(metric.decimals || 0) }}</span>
            <span class="text-sm font-orbitron text-white/50">{{ metric.unit }}</span>
          </div>
          <div class="w-full h-1 bg-white/10 rounded-full mt-3 overflow-hidden">
            <div class="h-full transition-all duration-300" :class="metric.isReverseColor ? 'bg-gradient-to-r from-red-500/50 to-red-500' : 'bg-gradient-to-r from-neon-cyan/50 to-neon-cyan'" :style="{ width: `${(metric.displayValue / metric.maxValue) * 100}%` }"></div>
          </div>
        </div>
        <div class="space-y-2.5 flex-grow">
          <div v-for="(ind, i) in metric.indicators" :key="i" class="flex justify-between border-b border-white/5 pb-2">
            <div class="flex items-center gap-2"><BarChart2 class="w-3 h-3" :class="metric.isReverseColor ? 'text-red-400/70' : 'text-neon-cyan/70'" /><span class="text-xs font-almarai text-white/70">{{ ind.label }}</span></div>
            <span class="text-xs font-orbitron text-white font-bold">{{ ind.value }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- AI Feedback -->
    <div v-if="hasData" class="glass-panel p-6 rounded-2xl border border-red-500/30 animate-fade-in mt-6">
      <div class="flex items-start gap-4">
        <div class="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center shrink-0">
          <AlertCircle class="w-6 h-6 text-red-400" />
        </div>
        <div>
          <h3 class="font-almarai font-black text-lg text-white mb-2">توصيات طبية وغذائية (AI Medical)</h3>
          <p class="text-sm text-white/80 font-almarai">{{ dynamicMedicalFeedback }}</p>
        </div>
      </div>
    </div>

    <!-- Setup Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in">
      <div class="glass-panel w-full max-w-2xl rounded-2xl border border-neon-cyan/40 overflow-hidden shadow-[0_0_50px_rgba(0,255,255,0.15)] flex flex-col">
        <div class="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
          <div class="flex items-center gap-3">
            <Stethoscope class="w-6 h-6 text-neon-cyan" />
            <h3 class="text-xl font-almarai font-black">إدخال البيانات الحيوية</h3>
          </div>
          <button @click="showModal = false" class="text-white/40 hover:text-white"><X class="w-5 h-5" /></button>
        </div>
        <div class="p-6 space-y-6 bg-black/40">
          <div class="space-y-3">
            <h4 class="font-almarai text-white/90 text-sm font-bold">نوع الوجبة الأخيرة</h4>
            <div class="flex gap-2">
              <button v-for="m in ['وجبة ما قبل المباراة', 'وجبة استشفاء', 'وجبة سريعة (Fast Food)']" :key="m" @click="simConfig.meal = m" class="flex-1 py-2 rounded border border-transparent text-sm font-almarai" :class="simConfig.meal === m ? 'bg-neon-cyan text-black' : 'bg-white/5 text-white/50'">{{ m }}</button>
            </div>
          </div>
          <div class="space-y-3">
            <h4 class="font-almarai text-white/90 text-sm font-bold">ساعات النوم</h4>
            <div class="flex gap-2">
              <button v-for="h in ['أقل من 5 ساعات', '6-7 ساعات', '8+ ساعات']" :key="h" @click="simConfig.sleep = h" class="flex-1 py-2 rounded border border-transparent text-sm font-almarai" :class="simConfig.sleep === h ? 'bg-neon-cyan text-black' : 'bg-white/5 text-white/50'">{{ h }}</button>
            </div>
          </div>
          <div class="space-y-3">
            <h4 class="font-almarai text-white/90 text-sm font-bold">الإجهاد العضلي (Soreness)</h4>
            <div class="flex gap-2">
              <button v-for="s in ['لا يوجد ألم', 'ألم خفيف', 'إجهاد شديد']" :key="s" @click="simConfig.soreness = s" class="flex-1 py-2 rounded border border-transparent text-sm font-almarai" :class="simConfig.soreness === s ? 'bg-neon-cyan text-black' : 'bg-white/5 text-white/50'">{{ s }}</button>
            </div>
          </div>
        </div>
        <div class="p-6 border-t border-white/10 flex justify-end">
          <CyberButton @click="simulateHealth" variant="cyan" :disabled="!isConfigComplete"><Activity class="w-5 h-5 mr-2" /> تحليل البيانات</CyberButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Apple, Activity, HeartPulse, BrainCircuit, Stethoscope, RefreshCw, CheckCircle2, BarChart2, AlertCircle, X, ShieldAlert, Droplets, BatteryCharging, Moon } from 'lucide-vue-next'
import CyberButton from '../../../shared/ui/CyberButton.vue'

const isSyncing = ref(false)
const hasData = ref(false)
const showModal = ref(false)
const activeMetrics = ref([])
const dynamicMedicalFeedback = ref('')

const simConfig = ref({ meal: null, sleep: null, soreness: null })
const isConfigComplete = computed(() => simConfig.value.meal && simConfig.value.sleep && simConfig.value.soreness)

const metricsTemplate = [
  { title: 'مستوى الطاقة (Energy)', icon: BatteryCharging, method: 'تحليل الغذاء', methodIcon: Apple, targetValue: 0, maxValue: 100, decimals: 0, unit: '%', indicators: [{ label: 'مخزون الجليكوجين', value: '' }, { label: 'كفاءة الحرق', value: '' }] },
  { title: 'جودة الاستشفاء (Recovery)', icon: HeartPulse, method: 'مؤشرات حيوية', methodIcon: Activity, targetValue: 0, maxValue: 100, decimals: 0, unit: '%', indicators: [{ label: 'معدل تعافي العضلات', value: '' }, { label: 'HRV Index', value: '' }] },
  { title: 'خطر الإصابة (Injury Risk)', icon: ShieldAlert, method: 'AI Prediction', methodIcon: BrainCircuit, targetValue: 0, maxValue: 100, decimals: 0, unit: '%', isReverseColor: true, indicators: [{ label: 'مستوى الخطر', value: '' }, { label: 'المنطقة المهددة', value: '' }] },
  { title: 'ترطيب الجسم (Hydration)', icon: Droplets, method: 'قياس السوائل', methodIcon: Activity, targetValue: 0, maxValue: 100, decimals: 0, unit: '%', indicators: [{ label: 'نسبة السوائل', value: '' }, { label: 'الحاجة للماء', value: '' }] },
  { title: 'مؤشر النوم (Sleep Index)', icon: Moon, method: 'تتبع ذكي', methodIcon: Activity, targetValue: 0, maxValue: 100, decimals: 0, unit: '%', indicators: [{ label: 'ساعات النوم العميق', value: '' }, { label: 'جودة النوم', value: '' }] },
  { title: 'جاهزية العضلات', icon: Activity, method: 'فحص ميكانيكي', methodIcon: Stethoscope, targetValue: 0, maxValue: 100, decimals: 0, unit: '%', indicators: [{ label: 'مرونة العضلات', value: '' }, { label: 'مستوى التيبس', value: '' }] }
]

const simulateHealth = () => {
  showModal.value = false; isSyncing.value = true;
  const { meal, sleep, soreness } = simConfig.value
  let finalMetrics = metricsTemplate.map(m => ({ ...m, indicators: m.indicators.map(i => ({ ...i })) }))

  let sleepScore = sleep === '8+ ساعات' ? 95 : sleep === '6-7 ساعات' ? 70 : 40
  let mealScore = meal === 'وجبة ما قبل المباراة' ? 90 : meal === 'وجبة استشفاء' ? 85 : 30
  let sorenessScore = soreness === 'لا يوجد ألم' ? 95 : soreness === 'ألم خفيف' ? 60 : 20
  
  finalMetrics[0].targetValue = (mealScore + sleepScore) / 2
  finalMetrics[0].indicators[0].value = finalMetrics[0].targetValue > 70 ? 'مرتفع' : 'منخفض'
  finalMetrics[0].indicators[1].value = `${finalMetrics[0].targetValue.toFixed(0)}%`

  finalMetrics[1].targetValue = (sleepScore + sorenessScore) / 2
  finalMetrics[1].indicators[0].value = finalMetrics[1].targetValue > 70 ? 'سريع' : 'بطيء'
  finalMetrics[1].indicators[1].value = `${finalMetrics[1].targetValue.toFixed(0)}`

  // Injury Risk: High if soreness is high (score is low) and sleep is low
  finalMetrics[2].targetValue = 100 - ((sleepScore + sorenessScore) / 2)
  finalMetrics[2].indicators[0].value = finalMetrics[2].targetValue > 60 ? 'خطر عالي' : 'آمن'
  finalMetrics[2].indicators[1].value = soreness === 'إجهاد شديد' ? 'أوتار الركبة' : 'لا يوجد'

  finalMetrics[3].targetValue = meal === 'وجبة سريعة (Fast Food)' ? 40 : 85
  finalMetrics[3].indicators[0].value = `${finalMetrics[3].targetValue.toFixed(0)}%`
  finalMetrics[3].indicators[1].value = finalMetrics[3].targetValue < 50 ? 'عالية جداً' : 'طبيعية'

  finalMetrics[4].targetValue = sleepScore
  finalMetrics[4].indicators[0].value = sleep === '8+ ساعات' ? '3 ساعات' : 'ساعة واحدة'
  finalMetrics[4].indicators[1].value = `${sleepScore}%`

  finalMetrics[5].targetValue = sorenessScore
  finalMetrics[5].indicators[0].value = sorenessScore > 70 ? 'ممتازة' : 'ضعيفة'
  finalMetrics[5].indicators[1].value = sorenessScore < 50 ? 'مرتفع' : 'طبيعي'

  if (finalMetrics[2].targetValue > 60) {
    dynamicMedicalFeedback.value = `تحذير: خطر الإصابة مرتفع جداً (${finalMetrics[2].targetValue.toFixed(0)}%). الإجهاد الشديد وقلة النوم يضعان ضغطاً كبيراً على العضلات. يُنصح بعدم المشاركة في التدريب الجماعي اليوم والاكتفاء بجلسة استشفاء.`
  } else if (meal === 'وجبة سريعة (Fast Food)') {
    dynamicMedicalFeedback.value = `الطعام غير الصحي أثر سلباً على مستويات الطاقة ومعدل الترطيب. ننصح بشرب 1.5 لتر من الماء فوراً وتناول وجبة غنية بالكربوهيدرات المعقدة.`
  } else {
    dynamicMedicalFeedback.value = `الحالة البدنية ممتازة وجاهزية العضلات تسمح بالمشاركة في المباراة كاملة. استمر على هذا النظام الغذائي الممتاز.`
  }

  activeMetrics.value = finalMetrics.map(m => ({ ...m, displayValue: 0 }))
  setTimeout(() => { isSyncing.value = false; hasData.value = true; animateValues() }, 2000)
}

const animateValues = () => {
  activeMetrics.value.forEach(metric => {
    let currentStep = 0; const steps = 40; const interval = 1500 / steps
    const stepValue = metric.targetValue / steps
    const timer = setInterval(() => {
      currentStep++; metric.displayValue += stepValue
      if (currentStep >= steps) { metric.displayValue = metric.targetValue; clearInterval(timer) }
    }, interval)
  })
}
</script>

<style scoped>
.glass-panel { background: rgba(255,255,255,0.03); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.08); }
.animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
@keyframes shimmer { 100% { transform: translateX(100%); } }
</style>
