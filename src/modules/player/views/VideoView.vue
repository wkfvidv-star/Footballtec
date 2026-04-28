<template>
  <div class="space-y-6 animate-fade-in pb-8">
    <!-- Intro -->
    <div class="glass-panel p-6 md:p-8 rounded-2xl border-t-2 border-neon-cyan relative overflow-hidden">
      <div class="absolute -right-20 -top-20 w-64 h-64 bg-neon-cyan/5 rounded-full blur-3xl pointer-events-none"></div>
      <div class="flex flex-col md:flex-row md:items-start justify-between gap-6 relative z-10">
        <div>
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 rounded-full bg-neon-cyan/20 border border-neon-cyan flex items-center justify-center">
              <Video class="w-5 h-5 text-neon-cyan" />
            </div>
            <h2 class="text-xl md:text-2xl font-almarai font-black tracking-tight">نظام تحليل الفيديو <span class="text-neon-cyan">(Football Tec)</span></h2>
          </div>
          <p class="text-white/80 font-almarai text-sm leading-relaxed max-w-3xl mb-4">
            يقوم النظام بتحليل الفيديو باستخدام تقنيات متطورة:
            <span class="inline-flex items-center gap-1 text-neon-cyan font-bold mx-1 bg-neon-cyan/10 px-2 py-0.5 rounded"><ScanEye class="w-4 h-4"/> Computer Vision</span>
            + <span class="inline-flex items-center gap-1 text-purple-400 font-bold mx-1 bg-purple-400/10 px-2 py-0.5 rounded"><BrainCircuit class="w-4 h-4"/> Deep Learning</span>
            + <span class="inline-flex items-center gap-1 text-blue-400 font-bold mx-1 bg-blue-400/10 px-2 py-0.5 rounded"><Camera class="w-4 h-4"/> تتبع الكرة واللاعبين</span>
          </p>
        </div>
        <div class="flex-shrink-0 pt-2">
          <CyberButton v-if="!hasData && !isSyncing" @click="showModal = true" variant="cyan" class="w-full md:w-auto">
            <div class="flex items-center gap-2">
              <Camera class="w-5 h-5 animate-pulse" />
              <span class="font-almarai font-bold">تشغيل نظام الكاميرات</span>
            </div>
          </CyberButton>
          <div v-else-if="isSyncing" class="px-6 py-3 bg-white/5 border border-white/10 rounded-lg flex items-center gap-3">
            <RefreshCw class="w-5 h-5 text-neon-cyan animate-spin" />
            <span class="font-almarai font-bold text-sm text-white/80">جاري معالجة الفيديو بالـ AI...</span>
          </div>
          <div v-else class="px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center gap-2 text-green-400">
            <CheckCircle2 class="w-5 h-5" />
            <span class="font-almarai font-bold text-sm">تم تحليل الفيديو (Live)</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="!isSyncing && !hasData" class="flex flex-col items-center justify-center py-20 text-center glass-panel rounded-2xl border border-white/5 border-dashed">
      <Camera class="w-16 h-16 text-white/10 mb-4" />
      <h3 class="text-xl font-almarai font-bold text-white/50 mb-2">الكاميرات في وضع الاستعداد</h3>
      <p class="text-sm text-white/30 font-almarai max-w-md">اضغط على "تشغيل نظام الكاميرات" لاختيار إعداد التصوير وبدء تحليل الفيديو.</p>
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
            <span class="text-4xl font-black font-orbitron text-transparent bg-clip-text bg-gradient-to-br from-white to-neon-cyan">{{ metric.displayValue.toFixed(metric.decimals || 0) }}</span>
            <span class="text-sm font-orbitron text-white/50">{{ metric.unit }}</span>
          </div>
          <div class="w-full h-1 bg-white/10 rounded-full mt-3 overflow-hidden">
            <div class="h-full bg-gradient-to-r from-neon-cyan/50 to-neon-cyan transition-all duration-300" :style="{ width: `${(metric.displayValue / metric.maxValue) * 100}%` }"></div>
          </div>
        </div>
        <div class="space-y-2.5 flex-grow">
          <div v-for="(ind, i) in metric.indicators" :key="i" class="flex justify-between border-b border-white/5 pb-2">
            <div class="flex items-center gap-2"><BarChart2 class="w-3 h-3 text-neon-cyan/70" /><span class="text-xs font-almarai text-white/70">{{ ind.label }}</span></div>
            <span class="text-xs font-orbitron text-white font-bold">{{ ind.value }}</span>
          </div>
        </div>
        <div class="mt-3 flex gap-2 bg-white/5 p-2 rounded-lg border border-white/5">
          <Target class="w-3 h-3 text-neon-cyan/50 shrink-0 mt-0.5" />
          <p class="text-[10px] text-white/60 font-almarai leading-relaxed">{{ metric.goal }}</p>
        </div>
      </div>
    </div>

    <!-- AI Highlight Reel Feature -->
    <div v-if="hasData" class="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
      <div class="glass-panel p-6 rounded-2xl border border-purple-500/30 relative overflow-hidden group">
        <div class="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
        <div class="flex items-start gap-4 relative z-10">
          <div class="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center shrink-0">
            <Clapperboard class="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <h3 class="font-almarai font-black text-lg mb-2 flex items-center gap-2">
              AI Highlight Reel <span class="px-2 py-0.5 bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded text-[9px] font-orbitron">AUTO-GENERATED</span>
            </h3>
            <p class="text-xs text-white/70 font-almarai leading-relaxed mb-4">يقوم الذكاء الاصطناعي باقتطاع أفضل اللقطات تلقائياً: الأهداف، المراوغات، الإنقاذات، ولقطات الضغط العالي.</p>
            <div class="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg mb-3">
              <p class="text-xs text-purple-200 font-almarai flex items-start gap-2 font-bold">
                <Sparkles class="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />{{ dynamicVideoFeedback }}
              </p>
            </div>
            <button class="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/50 rounded-lg text-xs text-purple-300 font-almarai font-bold flex items-center gap-2 transition-all">
              <Play class="w-3 h-3" /> مشاهدة الـ Highlights
            </button>
          </div>
        </div>
      </div>

      <div class="glass-panel p-6 rounded-2xl border border-blue-500/30 relative overflow-hidden group">
        <div class="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
        <div class="flex items-start gap-4 relative z-10">
          <div class="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center shrink-0">
            <LayoutDashboard class="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h3 class="font-almarai font-black text-lg mb-2 flex items-center gap-2">
              Video Analytics Dashboard <span class="px-2 py-0.5 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded text-[9px] font-orbitron">INTERACTIVE</span>
            </h3>
            <p class="text-xs text-white/70 font-almarai leading-relaxed mb-4">لوحة تحكم تعرض إحصائيات الفيديو التفصيلية: توزيع الأحداث، مناطق النشاط، نسبة تغطية اللاعب على الملعب.</p>
            <button class="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 rounded-lg text-xs text-blue-300 font-almarai font-bold flex items-center gap-2 transition-all">
              <BarChart2 class="w-3 h-3" /> عرض لوحة الإحصائيات
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Camera Setup Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in">
      <div class="glass-panel w-full max-w-2xl rounded-2xl border border-neon-cyan/40 overflow-hidden shadow-[0_0_50px_rgba(0,255,255,0.15)] flex flex-col">
        <div class="p-6 border-b border-white/10 flex justify-between items-center bg-white/5 relative overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-r from-neon-cyan/10 to-transparent"></div>
          <div class="flex items-center gap-3 relative z-10">
            <div class="w-10 h-10 rounded-full bg-neon-cyan/20 border border-neon-cyan/50 flex items-center justify-center">
              <Camera class="w-5 h-5 text-neon-cyan" />
            </div>
            <div>
              <h3 class="text-xl font-almarai font-black">إعداد نظام الكاميرات</h3>
              <p class="text-xs text-white/50 font-almarai">اختر إعداد التصوير لبدء التحليل</p>
            </div>
          </div>
          <button @click="showModal = false" class="text-white/40 hover:text-white p-2 rounded-full hover:bg-white/10 transition-all relative z-10"><X class="w-5 h-5" /></button>
        </div>

        <div class="p-6 space-y-6 bg-black/40">
          <div class="space-y-3">
            <h4 class="font-almarai text-white/90 font-bold flex items-center gap-2 text-sm"><Film class="w-4 h-4 text-neon-cyan/70" /> نوع التصوير</h4>
            <div class="flex gap-2">
              <button v-for="t in ['تدريب يومي', 'مباراة رسمية', 'مباراة ودية']" :key="t"
                @click="simConfig.matchType = t"
                class="flex-1 py-2.5 rounded-lg font-almarai font-bold text-sm transition-all border border-transparent"
                :class="simConfig.matchType === t ? 'bg-neon-cyan text-black' : 'bg-white/5 text-white/50 hover:bg-white/10'">{{ t }}</button>
            </div>
          </div>

          <div class="space-y-3">
            <h4 class="font-almarai text-white/90 font-bold flex items-center gap-2 text-sm"><Camera class="w-4 h-4 text-neon-cyan/70" /> عدد ونوع الكاميرات</h4>
            <div class="flex gap-2">
              <button v-for="cam in ['كاميرا واحدة', 'كاميرتان', 'كاميرات + درون']" :key="cam"
                @click="simConfig.cameras = cam"
                class="flex-1 py-2.5 rounded-lg font-almarai font-bold text-sm transition-all border border-transparent"
                :class="simConfig.cameras === cam ? 'bg-neon-cyan text-black' : 'bg-white/5 text-white/50 hover:bg-white/10'">{{ cam }}</button>
            </div>
          </div>

          <div class="space-y-3">
            <h4 class="font-almarai text-white/90 font-bold flex items-center gap-2 text-sm"><MonitorPlay class="w-4 h-4 text-neon-cyan/70" /> جودة الفيديو</h4>
            <div class="flex gap-2">
              <button v-for="q in ['HD 720p', 'Full HD 1080p', '4K Ultra']" :key="q"
                @click="simConfig.quality = q"
                class="flex-1 py-2.5 rounded-lg font-almarai font-bold text-sm transition-all border border-transparent"
                :class="simConfig.quality === q ? 'bg-neon-cyan text-black' : 'bg-white/5 text-white/50 hover:bg-white/10'">{{ q }}</button>
            </div>
          </div>
        </div>

        <div class="p-6 border-t border-white/10 bg-white/5 flex justify-end gap-3">
          <button @click="showModal = false" class="px-6 py-3 rounded-xl border border-white/10 text-white/70 font-almarai font-bold hover:bg-white/5 transition-all">إلغاء</button>
          <CyberButton @click="simulateVideo" variant="cyan" :disabled="!isConfigComplete">
            <div class="flex items-center gap-2"><Camera class="w-5 h-5" /> بدء التحليل بالذكاء الاصطناعي</div>
          </CyberButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Video, Camera, ScanEye, BrainCircuit, Film, MonitorPlay, Crosshair, Activity,
  Layers, Zap, Clock, Target, BarChart2, RefreshCw, CheckCircle2, X, Play,
  Clapperboard, Sparkles, LayoutDashboard } from 'lucide-vue-next'
import CyberButton from '../../../shared/ui/CyberButton.vue'

const isSyncing = ref(false)
const hasData = ref(false)
const showModal = ref(false)
const activeMetrics = ref([])
const dynamicVideoFeedback = ref('')

const simConfig = ref({ matchType: null, cameras: null, quality: null })
const isConfigComplete = computed(() => simConfig.value.matchType && simConfig.value.cameras && simConfig.value.quality)

const metricsTemplate = [
  { title: 'تتبع اللاعب (Player Tracking)', icon: ScanEye, method: 'Computer Vision', methodIcon: Camera, targetValue: 0, maxValue: 100, decimals: 0, unit: '%', indicators: [{ label: 'دقة التتبع (Tracking Accuracy)', value: '' }, { label: 'فقدان التتبع (Lost Frames)', value: '' }], goal: 'رصد مسار اللاعب وحركته بدقة خلال كامل مدة الفيديو.' },
  { title: 'تتبع الكرة (Ball Tracking)', icon: Target, method: 'Deep Learning', methodIcon: BrainCircuit, targetValue: 0, maxValue: 100, decimals: 0, unit: '%', indicators: [{ label: 'دقة تتبع الكرة', value: '' }, { label: 'الإطارات المفقودة', value: '' }], goal: 'رصد مسار الكرة وسرعتها في كل لحظة من المباراة.' },
  { title: 'اكتشاف الأحداث (Events)', icon: Zap, method: 'AI Detection', methodIcon: BrainCircuit, targetValue: 0, maxValue: 60, decimals: 0, unit: 'حدث', indicators: [{ label: 'تمريرات مكتشفة', value: '' }, { label: 'تسديدات مكتشفة', value: '' }], goal: 'التعرف التلقائي على جميع أحداث المباراة (تمرير، تسديد، تدخل).' },
  { title: 'تحليل التشكيلة', icon: Layers, method: 'Formation AI', methodIcon: ScanEye, targetValue: 0, maxValue: 100, decimals: 0, unit: '%', indicators: [{ label: 'دقة التعرف على التشكيلة', value: '' }, { label: 'تغييرات التشكيلة', value: '' }], goal: 'التعرف التلقائي على خطة الفريقين من خلال الفيديو.' },
  { title: 'سرعة المعالجة (FPS)', icon: Activity, method: 'GPU Processing', methodIcon: Zap, targetValue: 0, maxValue: 60, decimals: 0, unit: 'fps', indicators: [{ label: 'متوسط سرعة المعالجة', value: '' }, { label: 'زمن كل إطار', value: '' }], goal: 'سرعة معالجة الفيديو فائقة الدقة في الوقت الحقيقي.' },
  { title: 'الخريطة الحرارية (Heatmap)', icon: Crosshair, method: 'Position Tracking', methodIcon: Camera, targetValue: 0, maxValue: 100, decimals: 0, unit: '%', indicators: [{ label: 'تغطية الملعب', value: '' }, { label: 'المناطق الأكثر نشاطاً', value: '' }], goal: 'توليد خريطة حرارية توضح مناطق نشاط اللاعب على الملعب.' },
]

const simulateVideo = () => {
  showModal.value = false
  isSyncing.value = true
  const { cameras, quality } = simConfig.value

  let finalMetrics = metricsTemplate.map(m => ({ ...m, indicators: m.indicators.map(i => ({ ...i })) }))

  const camMult = cameras === 'كاميرات + درون' ? 1.3 : cameras === 'كاميرتان' ? 1.1 : 0.85
  const qualMult = quality === '4K Ultra' ? 1.2 : quality === 'Full HD 1080p' ? 1.0 : 0.8

  finalMetrics[0].targetValue = Math.min(99, 88 * camMult * qualMult)
  finalMetrics[0].indicators[0].value = `${finalMetrics[0].targetValue.toFixed(0)}%`
  finalMetrics[0].indicators[1].value = finalMetrics[0].targetValue > 95 ? '< 0.5%' : '2-3%'

  finalMetrics[1].targetValue = Math.min(98, 85 * qualMult * camMult)
  finalMetrics[1].indicators[0].value = `${finalMetrics[1].targetValue.toFixed(0)}%`
  finalMetrics[1].indicators[1].value = quality === 'HD 720p' ? '5%' : '1%'

  const eventsBase = cameras === 'كاميرات + درون' ? 55 : cameras === 'كاميرتان' ? 45 : 32
  finalMetrics[2].targetValue = eventsBase
  finalMetrics[2].indicators[0].value = `${Math.floor(eventsBase * 0.7)}`
  finalMetrics[2].indicators[1].value = `${Math.floor(eventsBase * 0.3)}`

  finalMetrics[3].targetValue = Math.min(97, 80 * camMult)
  finalMetrics[3].indicators[0].value = `${finalMetrics[3].targetValue.toFixed(0)}%`
  finalMetrics[3].indicators[1].value = '3-4'

  const fpsBase = quality === '4K Ultra' ? 30 : quality === 'Full HD 1080p' ? 50 : 60
  finalMetrics[4].targetValue = fpsBase
  finalMetrics[4].indicators[0].value = `${fpsBase} fps`
  finalMetrics[4].indicators[1].value = `${(1000 / fpsBase).toFixed(1)} ms`

  finalMetrics[5].targetValue = Math.min(99, 75 * camMult * qualMult)
  finalMetrics[5].indicators[0].value = `${finalMetrics[5].targetValue.toFixed(0)}%`
  finalMetrics[5].indicators[1].value = cameras === 'كاميرات + درون' ? 'الوسط والجناحان' : 'المنطقة المركزية'

  if (cameras === 'كاميرات + درون') {
    dynamicVideoFeedback.value = `تم اكتشاف ${eventsBase} حدثاً بدقة استثنائية بفضل الدرون. تم توليد 12 لقطة هايلايت تلقائياً بجودة عالية جاهزة للمشاركة.`
  } else if (quality === '4K Ultra') {
    dynamicVideoFeedback.value = `جودة 4K تتيح تتبع أدق للكرة واللاعبين مع رؤية واضحة لكل تفاصيل اللمسات. تم رصد ${eventsBase} حدثاً رياضياً.`
  } else {
    dynamicVideoFeedback.value = `اكتمل التحليل بنجاح. يُنصح بترقية الكاميرات إلى إعداد أعلى للحصول على دقة تتبع أفضل في مباريات الدوري.`
  }

  activeMetrics.value = finalMetrics.map(m => ({ ...m, displayValue: 0 }))
  setTimeout(() => { isSyncing.value = false; hasData.value = true; animateValues() }, 2500)
}

const animateValues = () => {
  const steps = 60; const interval = 2000 / steps
  activeMetrics.value.forEach(metric => {
    let currentStep = 0
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
