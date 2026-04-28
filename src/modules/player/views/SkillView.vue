<template>
  <div class="space-y-6 animate-fade-in pb-8">
    
    <!-- Intro Section & Controls -->
    <div class="glass-panel p-6 md:p-8 rounded-2xl border-t-2 border-neon-cyan relative overflow-hidden">
      <div class="absolute -left-20 -top-20 w-64 h-64 bg-neon-cyan/5 rounded-full blur-3xl pointer-events-none"></div>
      
      <div class="flex flex-col md:flex-row md:items-start justify-between gap-6 relative z-10">
        <div>
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 rounded-full bg-neon-cyan/20 border border-neon-cyan flex items-center justify-center">
              <Crosshair class="w-5 h-5 text-neon-cyan" />
            </div>
            <h2 class="text-xl md:text-2xl font-almarai font-black tracking-tight">نظام قياس الجانب المهاري <span class="text-neon-cyan">(Football Tec)</span></h2>
          </div>
          <p class="text-white/80 font-almarai text-sm md:text-base leading-relaxed max-w-3xl mb-4">
            يعتمد نظام الجانب المهاري على تحليل أداء اللاعب وتحويل المهارات الفردية إلى مؤشرات رقمية دقيقة باستخدام:
            <span class="inline-flex items-center gap-1 text-neon-cyan font-bold mx-1 bg-neon-cyan/10 px-2 py-0.5 rounded"><Video class="w-4 h-4"/> تحليل الفيديو</span> 
            + 
            <span class="inline-flex items-center gap-1 text-purple-400 font-bold mx-1 bg-purple-400/10 px-2 py-0.5 rounded"><ScanEye class="w-4 h-4"/> تتبع الكرة (Tracking)</span>.
          </p>
        </div>
        
        <!-- Action Button -->
        <div class="flex-shrink-0 pt-2">
          <CyberButton v-if="!hasData && !isSyncing" @click="showModal = true" variant="cyan" class="w-full md:w-auto shadow-[0_0_15px_rgba(0,255,255,0.2)]">
            <div class="flex items-center gap-2">
              <Video class="w-5 h-5 animate-pulse" />
              <span class="font-almarai font-bold">محاكاة كاميرات الذكاء الاصطناعي</span>
            </div>
          </CyberButton>
          <div v-else-if="isSyncing" class="px-6 py-3 bg-white/5 border border-white/10 rounded-lg flex items-center gap-3">
             <RefreshCw class="w-5 h-5 text-neon-cyan animate-spin" />
             <span class="font-almarai font-bold text-sm text-white/80">جاري معالجة لقطات الفيديو...</span>
          </div>
          <div v-else class="px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center gap-2 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.3)]">
            <CheckCircle2 class="w-5 h-5" />
            <span class="font-almarai font-bold text-sm">تم التتبع بنجاح (Live)</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State Before Sync -->
    <div v-if="!isSyncing && !hasData" class="flex flex-col items-center justify-center py-20 text-center glass-panel rounded-2xl border border-white/5 border-dashed">
       <ScanEye class="w-16 h-16 text-white/10 mb-4" />
       <h3 class="text-xl font-almarai font-bold text-white/50 mb-2">النظام في وضع الاستعداد</h3>
       <p class="text-sm text-white/30 font-almarai max-w-md">قم بالضغط على "محاكاة الكاميرات" لإدخال ظروف المباراة ورؤية كيف يقوم الـ AI بتحليل اللمسات.</p>
    </div>

    <!-- Loading State -->
    <div v-if="isSyncing" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <div v-for="i in 9" :key="'skeleton-'+i" class="glass-panel p-5 rounded-2xl border border-neon-cyan/20 relative overflow-hidden h-72">
        <div class="absolute inset-0 bg-gradient-to-r from-transparent via-neon-cyan/5 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]"></div>
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-3">
             <div class="w-10 h-10 rounded-xl bg-white/5 animate-pulse"></div>
             <div class="h-5 w-24 bg-white/5 rounded animate-pulse"></div>
          </div>
          <div class="w-16 h-4 bg-white/5 rounded-full animate-pulse"></div>
        </div>
        <div class="h-20 w-full bg-black/20 rounded-xl mb-4 flex items-center justify-center">
           <div class="h-10 w-20 bg-neon-cyan/10 rounded animate-pulse"></div>
        </div>
        <div class="space-y-3">
          <div class="flex justify-between">
             <div class="h-3 w-1/3 bg-white/5 rounded animate-pulse"></div>
             <div class="h-3 w-1/4 bg-white/5 rounded animate-pulse"></div>
          </div>
          <div class="flex justify-between">
             <div class="h-3 w-1/2 bg-white/5 rounded animate-pulse"></div>
             <div class="h-3 w-1/5 bg-white/5 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Data Grid -->
    <div v-if="hasData" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-fade-in">
      <div v-for="(metric, index) in activeMetrics" :key="index" class="glass-panel p-5 rounded-2xl border border-white/5 hover:border-neon-cyan/30 transition-all group flex flex-col h-full relative overflow-hidden">
        
        <!-- Live Dot -->
        <div class="absolute top-4 right-4 flex items-center gap-1.5 z-20">
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span class="text-[9px] text-green-400/80 font-orbitron tracking-wider uppercase drop-shadow-[0_0_2px_rgba(0,0,0,0.8)]">Live</span>
        </div>

        <!-- Header -->
        <div class="flex items-center gap-3 mb-4 relative z-10">
          <div class="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-neon-cyan/10 group-hover:border-neon-cyan/30 transition-all">
            <component :is="metric.icon" class="w-5 h-5 text-white group-hover:text-neon-cyan transition-colors" />
          </div>
          <h3 class="font-almarai font-bold text-lg pr-4">{{ index + 1 }}. {{ metric.title }}</h3>
        </div>

        <!-- Main Value Display -->
        <div class="bg-black/30 rounded-xl p-4 mb-4 border border-white/5 flex flex-col relative overflow-hidden group-hover:bg-black/50 transition-colors">
          <div class="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:scale-110 group-hover:opacity-[0.05] transition-all duration-500">
            <component :is="metric.icon" class="w-32 h-32" />
          </div>
          
          <div class="text-[10px] text-neon-cyan/60 font-orbitron uppercase tracking-widest mb-1 flex items-center gap-1 z-10">
             <component :is="metric.methodIcon" class="w-3 h-3" />
             {{ metric.method }}
          </div>
          
          <div class="flex items-baseline gap-1 relative z-10">
            <span class="text-4xl font-black font-orbitron text-transparent bg-clip-text bg-gradient-to-br from-white to-neon-cyan drop-shadow-[0_0_10px_rgba(0,255,255,0.2)]">
              {{ metric.displayValue.toFixed(metric.decimals || 0) }}
            </span>
            <span class="text-sm font-orbitron text-white/50">{{ metric.unit }}</span>
          </div>
          
          <!-- Progress Bar -->
          <div class="w-full h-1 bg-white/10 rounded-full mt-4 overflow-hidden relative z-10">
             <div class="h-full bg-gradient-to-r from-neon-cyan/50 to-neon-cyan transition-all duration-300 ease-out" :style="{ width: `${(metric.displayValue / metric.maxValue) * 100}%` }"></div>
          </div>
        </div>

        <!-- Sub Indicators -->
        <div class="mb-4 flex-grow space-y-3 relative z-10">
          <div v-for="(ind, i) in metric.indicators" :key="i" class="flex justify-between items-end border-b border-white/5 pb-2 hover:border-white/10 transition-colors">
             <div class="flex items-center gap-2">
                <BarChart2 class="w-3 h-3 text-neon-cyan/70" />
                <span class="text-xs font-almarai text-white/70">{{ ind.label }}</span>
             </div>
             <span class="text-xs font-orbitron text-white font-bold">{{ ind.value }}</span>
          </div>
        </div>

        <!-- Goal -->
        <div class="mt-auto pt-2 relative z-10">
          <div class="flex gap-2 bg-white/5 p-2 rounded-lg border border-white/5 group-hover:border-white/10 transition-colors h-full">
            <Target class="w-3 h-3 text-neon-cyan/50 shrink-0 mt-0.5" />
            <p class="text-[10px] text-white/60 font-almarai leading-relaxed flex-grow">
              {{ metric.goal }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Smart Video Feedback (AI FEATURE) -->
    <div v-if="hasData" class="glass-panel p-6 md:p-8 rounded-2xl border border-purple-500/30 relative overflow-hidden group animate-fade-in mt-6">
      <div class="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
      
      <div class="flex flex-col md:flex-row items-center gap-6 relative z-10">
        <div class="w-16 h-16 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(168,85,247,0.3)]">
           <BrainCircuit class="w-8 h-8 text-purple-400" />
        </div>
        
        <div class="flex-grow text-center md:text-right">
          <div class="flex items-center justify-center md:justify-start gap-2 mb-2">
             <h3 class="font-almarai font-black text-xl md:text-2xl text-white">Smart Video Feedback</h3>
             <span class="px-2 py-0.5 bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded text-[10px] font-orbitron">AI FEATURE</span>
          </div>
          <p class="text-sm text-white/70 font-almarai mb-4 leading-relaxed max-w-2xl">
            ميزة ذكية تقوم باقتطاع الفيديوهات أوتوماتيكياً لاستخراج اللقطات الإيجابية (Highlights) والأخطاء المتكررة لتقديم نصائح سريعة للاعب.
          </p>
          <div class="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg inline-block">
             <p class="text-sm text-purple-200 font-almarai leading-relaxed flex items-center gap-2 font-bold">
                 <Sparkles class="w-5 h-5 text-purple-400 shrink-0" />
                 {{ dynamicSkillFeedback }}
             </p>
          </div>
        </div>
        
        <div class="flex flex-col gap-3 w-full md:w-auto shrink-0">
          <button class="px-5 py-2.5 bg-purple-600/20 hover:bg-purple-600/40 border border-purple-500/50 rounded-xl text-sm font-almarai font-bold transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(168,85,247,0.2)] group-hover:shadow-[0_0_25px_rgba(168,85,247,0.4)]">
             <Play class="w-4 h-4" />
             ملخص الأداء (Highlights)
          </button>
          <button class="px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-almarai transition-all flex items-center justify-center gap-2">
             <AlertCircle class="w-4 h-4 text-red-400" />
             مراجعة الأخطاء المهارية
          </button>
        </div>
      </div>
    </div>

    <!-- Skill AI Simulation Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in">
      <div class="glass-panel w-full max-w-2xl rounded-2xl border border-neon-cyan/40 overflow-hidden shadow-[0_0_50px_rgba(0,255,255,0.15)] flex flex-col">
        
        <div class="p-6 border-b border-white/10 flex justify-between items-center bg-white/5 relative overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-r from-neon-cyan/10 to-transparent opacity-50"></div>
          <div class="flex items-center gap-3 relative z-10">
            <div class="w-10 h-10 rounded-full bg-neon-cyan/20 flex items-center justify-center border border-neon-cyan/50">
                <Video class="w-5 h-5 text-neon-cyan" />
            </div>
            <div>
                <h3 class="text-xl font-almarai font-black text-white">إعداد محرك التحليل المهاري</h3>
                <p class="text-xs text-white/50 font-almarai mt-1">كيف كانت ظروف المباراة؟</p>
            </div>
          </div>
          <button @click="showModal = false" class="text-white/40 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all relative z-10">
            <X class="w-5 h-5" />
          </button>
        </div>
        
        <div class="p-6 space-y-6 bg-black/40">
          
          <div class="space-y-3">
             <h4 class="font-almarai text-white/90 font-bold flex items-center gap-2 text-sm">
                <Swords class="w-4 h-4 text-neon-cyan/70" />
                مستوى صعوبة الخصم
             </h4>
             <div class="flex gap-2">
                <button v-for="dif in ['ضعيف', 'متوسط', 'قوي', 'شرس دفاعياً']" :key="dif"
                    @click="simConfig.difficulty = dif"
                    class="flex-1 py-2.5 rounded-lg font-almarai font-bold text-sm transition-all border border-transparent"
                    :class="simConfig.difficulty === dif ? 'bg-neon-cyan text-black border-white/50' : 'bg-white/5 text-white/50 hover:bg-white/10'">
                   {{ dif }}
                </button>
             </div>
          </div>

          <div class="space-y-3">
             <h4 class="font-almarai text-white/90 font-bold flex items-center gap-2 text-sm">
                <CloudRain class="w-4 h-4 text-neon-cyan/70" />
                حالة أرضية الملعب (Pitch Condition)
             </h4>
             <div class="flex gap-2">
                <button v-for="pitch in ['ممتاز', 'جاف وصعب', 'مبلل/زلق']" :key="pitch"
                    @click="simConfig.pitch = pitch"
                    class="flex-1 py-2.5 rounded-lg font-almarai font-bold text-sm transition-all border border-transparent"
                    :class="simConfig.pitch === pitch ? 'bg-neon-cyan text-black border-white/50' : 'bg-white/5 text-white/50 hover:bg-white/10'">
                   {{ pitch }}
                </button>
             </div>
          </div>

          <div class="space-y-3">
             <h4 class="font-almarai text-white/90 font-bold flex items-center gap-2 text-sm">
                <Users class="w-4 h-4 text-neon-cyan/70" />
                مركز اللاعب
             </h4>
             <div class="flex gap-2">
                <button v-for="pos in ['مدافع', 'وسط', 'جناح', 'مهاجم']" :key="pos"
                    @click="simConfig.position = pos"
                    class="flex-1 py-2.5 rounded-lg font-almarai font-bold text-sm transition-all border border-transparent"
                    :class="simConfig.position === pos ? 'bg-neon-cyan text-black border-white/50' : 'bg-white/5 text-white/50 hover:bg-white/10'">
                   {{ pos }}
                </button>
             </div>
          </div>

        </div>

        <div class="p-6 border-t border-white/10 bg-white/5 flex justify-end gap-3">
           <button @click="showModal = false" class="px-6 py-3 rounded-xl border border-white/10 text-white/70 font-almarai font-bold hover:bg-white/5 transition-all">
               إلغاء
           </button>
           <CyberButton @click="simulateSkills" variant="cyan" :disabled="!isConfigComplete" class="shadow-[0_0_15px_rgba(0,255,255,0.2)]">
             <div class="flex items-center gap-2">
                 <Video class="w-5 h-5" />
                 تحليل لقطات الفيديو
             </div>
           </CyberButton>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { 
  Crosshair, Video, Activity, MousePointerClick, TrendingUp, Navigation, 
  Wind, Shield, Lock, ScanEye, RefreshCw, CheckCircle2, BarChart2, Target,
  BrainCircuit, Play, AlertCircle, X, Swords, CloudRain, Users, Sparkles
} from 'lucide-vue-next'
import CyberButton from '../../../shared/ui/CyberButton.vue'

const isSyncing = ref(false)
const hasData = ref(false)
const showModal = ref(false)
const activeMetrics = ref([])
const dynamicSkillFeedback = ref('')

const simConfig = ref({
    difficulty: null,
    pitch: null,
    position: null
})

const isConfigComplete = computed(() => {
    return simConfig.value.difficulty && simConfig.value.pitch && simConfig.value.position
})

const metricsDataTemplate = [
  {
    title: 'التحكم بالكرة',
    icon: MousePointerClick,
    method: 'تحليل اللمسة',
    methodIcon: Video,
    targetValue: 0,
    maxValue: 100,
    decimals: 0,
    unit: '%',
    indicators: [
      { label: 'First Touch Quality', value: '' },
      { label: 'عدد فقدان الكرة', value: '' }
    ],
    goal: 'تقييم قدرة اللاعب على السيطرة على الكرة لحظة الاستلام.'
  },
  {
    title: 'دقة التمرير',
    icon: Crosshair,
    method: 'تتبع الكرة',
    methodIcon: Activity,
    targetValue: 0,
    maxValue: 100,
    decimals: 0,
    unit: '%',
    indicators: [
      { label: 'تمريرات قصيرة', value: '' },
      { label: 'تمريرات طويلة (Long balls)', value: '' }
    ],
    goal: 'قياس دقة التمرير وتوزيع الكرة للزملاء.'
  },
  {
    title: 'التسديد (Shooting)',
    icon: Target,
    method: 'تتبع المسار',
    methodIcon: ScanEye,
    targetValue: 0,
    maxValue: 100,
    decimals: 0,
    unit: '%',
    indicators: [
      { label: 'التسديد على المرمى (On Target)', value: '' },
      { label: 'قوة التسديدة', value: '' }
    ],
    goal: 'تقييم خطورة اللاعب وقدرته على إنهاء الهجمات.'
  },
  {
    title: 'المراوغة (Dribbling)',
    icon: TrendingUp,
    method: 'فيديو + AI',
    methodIcon: BrainCircuit,
    targetValue: 0,
    maxValue: 100,
    decimals: 0,
    unit: '%',
    indicators: [
      { label: 'مراوغات ناجحة', value: '' },
      { label: 'Dribbling Success Score', value: '' }
    ],
    goal: 'قياس المهارة في تخطي الخصوم في المواقف الفردية (1v1).'
  },
  {
    title: 'الجري بالكرة',
    icon: Navigation,
    method: 'تتبع السرعة',
    methodIcon: Activity,
    targetValue: 0,
    maxValue: 30,
    decimals: 1,
    unit: 'km/h',
    indicators: [
      { label: 'مسافة الجري بالكرة', value: '' },
      { label: 'فقدان الكرة أثناء الجري', value: '' }
    ],
    goal: 'قياس سرعة وسيطرة اللاعب أثناء التقدم بالكرة.'
  },
  {
    title: 'الاستلام والتصرف',
    icon: RefreshCw,
    method: 'تحليل القرار',
    methodIcon: Video,
    targetValue: 0,
    maxValue: 100,
    decimals: 0,
    unit: '%',
    indicators: [
      { label: 'زمن اتخاذ القرار', value: '' },
      { label: 'Action Success Rate', value: '' }
    ],
    goal: 'تقييم سرعة البديهة بعد استلام الكرة مباشرة.'
  },
  {
    title: 'اللعب الهوائي',
    icon: Wind,
    method: 'تتبع الارتقاء',
    methodIcon: ScanEye,
    targetValue: 0,
    maxValue: 100,
    decimals: 0,
    unit: '%',
    indicators: [
      { label: 'الفوز بالالتحامات الهوائية', value: '' },
      { label: 'دقة التوجيه بالرأس', value: '' }
    ],
    goal: 'قياس قدرة اللاعب في الكرات العرضية والطويلة.'
  },
  {
    title: 'افتكاك الكرة',
    icon: Shield,
    method: 'تحليل التوقيت',
    methodIcon: Video,
    targetValue: 0,
    maxValue: 100,
    decimals: 0,
    unit: '%',
    indicators: [
      { label: 'Tackling Success', value: '' },
      { label: 'عدد الأخطاء المرتكبة', value: '' }
    ],
    goal: 'تقييم القدرة الدفاعية في استرجاع الكرة.'
  },
  {
    title: 'حماية الكرة',
    icon: Lock,
    method: 'فيديو',
    methodIcon: ScanEye,
    targetValue: 0,
    maxValue: 100,
    decimals: 0,
    unit: '%',
    indicators: [
      { label: 'Shielding Score', value: '' },
      { label: 'الأخطاء المكتسبة', value: '' }
    ],
    goal: 'قياس القوة في الاحتفاظ بالكرة تحت الضغط.'
  }
]

const simulateSkills = () => {
  showModal.value = false;
  isSyncing.value = true;
  
  const { difficulty, pitch, position } = simConfig.value;
  let finalMetrics = metricsDataTemplate.map(m => ({ ...m, indicators: m.indicators.map(i => ({ ...i })) }));

  // Modifiers
  let difPenalty = difficulty === 'شرس دفاعياً' ? 0.75 : difficulty === 'قوي' ? 0.85 : difficulty === 'متوسط' ? 0.95 : 1.1;
  let pitchPenalty = pitch === 'مبلل/زلق' ? 0.8 : pitch === 'جاف وصعب' ? 0.9 : 1.05;

  // 1. Ball Control
  finalMetrics[0].targetValue = Math.min(98, 85 * pitchPenalty * (difPenalty > 1 ? 1 : 0.95));
  finalMetrics[0].indicators[0].value = `${finalMetrics[0].targetValue.toFixed(0)}%`;
  finalMetrics[0].indicators[1].value = pitch === 'مبلل/زلق' ? '7' : '2';

  // 2. Passing
  finalMetrics[1].targetValue = position === 'وسط' ? (92 * difPenalty) : (82 * difPenalty);
  finalMetrics[1].indicators[0].value = `${(finalMetrics[1].targetValue + 5).toFixed(0)}%`;
  finalMetrics[1].indicators[1].value = `${(finalMetrics[1].targetValue - 15).toFixed(0)}%`;

  // 3. Shooting
  finalMetrics[2].targetValue = position === 'مهاجم' ? (88 * difPenalty) : (65 * difPenalty);
  finalMetrics[2].indicators[0].value = `${(finalMetrics[2].targetValue - 10).toFixed(0)}%`;
  finalMetrics[2].indicators[1].value = `105 km/h`;

  // 4. Dribbling
  finalMetrics[3].targetValue = position === 'جناح' ? (90 * difPenalty * pitchPenalty) : 70;
  finalMetrics[3].indicators[0].value = `${Math.floor(finalMetrics[3].targetValue / 10)}`;
  finalMetrics[3].indicators[1].value = `${finalMetrics[3].targetValue.toFixed(0)}%`;

  // 5. Running with ball
  finalMetrics[4].targetValue = position === 'جناح' ? 28 : 22;
  finalMetrics[4].indicators[0].value = `${(finalMetrics[4].targetValue * 15).toFixed(0)} m`;
  finalMetrics[4].indicators[1].value = difPenalty < 0.8 ? 'مرتفع' : 'قليل';

  // 6. Action after receive
  finalMetrics[5].targetValue = 85 * difPenalty;
  finalMetrics[5].indicators[0].value = `${(1.5 / difPenalty).toFixed(1)}s`;
  finalMetrics[5].indicators[1].value = `${finalMetrics[5].targetValue.toFixed(0)}%`;

  // 7. Aerial
  finalMetrics[6].targetValue = position === 'مدافع' || position === 'مهاجم' ? 88 : 60;
  finalMetrics[6].indicators[0].value = `${(finalMetrics[6].targetValue / 10).toFixed(0)}/10`;
  finalMetrics[6].indicators[1].value = `${(finalMetrics[6].targetValue - 5).toFixed(0)}%`;

  // 8. Tackling
  finalMetrics[7].targetValue = position === 'مدافع' || position === 'وسط' ? (85 * pitchPenalty) : 50;
  finalMetrics[7].indicators[0].value = `${finalMetrics[7].targetValue.toFixed(0)}%`;
  finalMetrics[7].indicators[1].value = pitch === 'مبلل/زلق' ? '4 أخطاء' : 'خطأ واحد';

  // 9. Shielding
  finalMetrics[8].targetValue = position === 'مهاجم' || position === 'وسط' ? 80 : 70;
  finalMetrics[8].indicators[0].value = `${finalMetrics[8].targetValue.toFixed(0)}%`;
  finalMetrics[8].indicators[1].value = '3';

  // Smart Feedback Message logic
  if (pitch === 'مبلل/زلق') {
      dynamicSkillFeedback.value = `حالة الملعب المبللة أثرت بشكل مباشر على جودة الاستلام (First Touch) ومعدل دقة التمرير. ننصح باستخدام أحذية بمسامير أطول (Longer Studs) في المباريات المشابهة.`;
  } else if (difficulty === 'شرس دفاعياً' && position === 'مهاجم') {
      dynamicSkillFeedback.value = `دفاع الخصم الشرس قلل من دقة التسديد والمراوغات. كاميرات الـ AI توصي بتقليل الاحتفاظ بالكرة واللعب من لمسة واحدة في المساحات الضيقة.`;
  } else if (position === 'وسط') {
      dynamicSkillFeedback.value = `أداء ممتاز في توزيع الكرات (دقة تمرير ${finalMetrics[1].targetValue.toFixed(0)}%). كاميرات التتبع تظهر أنك كنت المحور الأساسي لربط الخطوط في مباراة اليوم.`;
  } else {
      dynamicSkillFeedback.value = `تم تحليل جميع المهارات الفردية بنجاح. أظهرت اللقطات تحكماً عالياً بالكرة، اضغط على زر مراجعة الأخطاء لتصحيح الهفوات البسيطة.`;
  }

  activeMetrics.value = finalMetrics.map(m => ({ ...m, displayValue: 0 }));

  setTimeout(() => {
    isSyncing.value = false
    hasData.value = true
    animateValues()
  }, 2500)
}

const animateValues = () => {
  const duration = 2000
  const steps = 60
  const interval = duration / steps
  
  activeMetrics.value.forEach((metric) => {
    let currentStep = 0
    const stepValue = metric.targetValue / steps
    
    const timer = setInterval(() => {
      currentStep++
      metric.displayValue += stepValue
      
      if (currentStep >= steps) {
        metric.displayValue = metric.targetValue
        clearInterval(timer)
      }
    }, interval)
  })
}
</script>

<style scoped>
.glass-panel {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}
.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}
</style>
