<template>
  <div class="space-y-6 animate-fade-in pb-8">
    
    <!-- Intro Section & Controls -->
    <div class="glass-panel p-6 md:p-8 rounded-2xl border-t-2 border-neon-cyan relative overflow-hidden">
      <!-- Background Graphic -->
      <div class="absolute -left-20 -top-20 w-64 h-64 bg-neon-cyan/5 rounded-full blur-3xl pointer-events-none"></div>
      
      <div class="flex flex-col md:flex-row md:items-start justify-between gap-6 relative z-10">
        <div>
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 rounded-full bg-neon-cyan/20 border border-neon-cyan flex items-center justify-center">
              <Activity class="w-5 h-5 text-neon-cyan" />
            </div>
            <h2 class="text-xl md:text-2xl font-almarai font-black tracking-tight">نظام قياس العناصر البدنية <span class="text-neon-cyan">(Football Tec)</span></h2>
          </div>
          
          <p class="text-white/80 font-almarai text-sm md:text-base leading-relaxed mb-4 max-w-4xl">
            يعتمد هذا النظام على قياس العناصر البدنية للاعب كرة القدم باستخدام تقنيات بسيطة وقابلة للتطبيق مثل: 
            <span class="inline-flex items-center gap-1 text-neon-cyan font-bold mx-1 bg-neon-cyan/10 px-2 py-0.5 rounded"><Smartphone class="w-4 h-4"/> GPS الهاتف</span> 
            + 
            <span class="inline-flex items-center gap-1 text-purple-400 font-bold mx-1 bg-purple-400/10 px-2 py-0.5 rounded"><Video class="w-4 h-4"/> تحليل الفيديو بالذكاء الاصطناعي</span>.
          </p>
        </div>

        <!-- Action Button -->
        <div class="flex-shrink-0 pt-2">
          <CyberButton v-if="!hasData && !isSyncing" @click="showModal = true" variant="cyan" class="w-full md:w-auto shadow-[0_0_15px_rgba(0,255,255,0.2)]">
            <div class="flex items-center gap-2">
              <LocateFixed class="w-5 h-5 animate-pulse" />
              <span class="font-almarai font-bold">محاكاة واستخراج بيانات GPS</span>
            </div>
          </CyberButton>
          <div v-else-if="isSyncing" class="px-6 py-3 bg-white/5 border border-white/10 rounded-lg flex items-center gap-3">
             <RefreshCw class="w-5 h-5 text-neon-cyan animate-spin" />
             <span class="font-almarai font-bold text-sm text-white/80">جاري معالجة إشارات الـ GPS...</span>
          </div>
          <div v-else class="px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center gap-2 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.3)]">
            <CheckCircle2 class="w-5 h-5" />
            <span class="font-almarai font-bold text-sm">تم الاتصال بالمستشعرات (Live)</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State Before Sync -->
    <div v-if="!isSyncing && !hasData" class="flex flex-col items-center justify-center py-20 text-center glass-panel rounded-2xl border border-white/5 border-dashed">
       <Smartphone class="w-16 h-16 text-white/10 mb-4" />
       <h3 class="text-xl font-almarai font-bold text-white/50 mb-2">في انتظار إشارة الـ GPS</h3>
       <p class="text-sm text-white/30 font-almarai max-w-md">اضغط على زر "محاكاة بيانات GPS" لاختيار سيناريو المباراة وعرض الأداء البدني.</p>
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
        <div class="flex items-center justify-between mb-4 relative z-10">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-neon-cyan/10 group-hover:border-neon-cyan/30 transition-all">
              <component :is="metric.icon" class="w-5 h-5 text-white group-hover:text-neon-cyan transition-colors" />
            </div>
            <h3 class="font-almarai font-bold text-lg">{{ index + 1 }}. {{ metric.title }}</h3>
          </div>
        </div>

        <!-- Main Value Display -->
        <div class="bg-black/40 rounded-xl p-4 mb-4 border border-white/5 flex flex-col items-center justify-center relative overflow-hidden group-hover:bg-black/60 transition-colors">
          <div class="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-110 group-hover:opacity-10 transition-all duration-500">
            <component :is="metric.icon" class="w-24 h-24" />
          </div>
          <div class="text-[10px] text-neon-cyan/60 font-orbitron uppercase tracking-widest mb-1 flex items-center gap-1 z-10">
             <component :is="metric.methodIcon" class="w-3 h-3" />
             {{ metric.method }}
          </div>
          <div class="flex items-baseline gap-1 relative z-10">
            <span class="text-4xl md:text-5xl font-black font-orbitron text-transparent bg-clip-text bg-gradient-to-br from-white to-neon-cyan drop-shadow-[0_0_10px_rgba(0,255,255,0.2)]">
              {{ metric.displayValue.toFixed(metric.decimals || 0) }}
            </span>
            <span class="text-sm font-orbitron text-white/50">{{ metric.unit }}</span>
          </div>
          <!-- Progress Bar -->
          <div class="w-full h-1.5 bg-white/10 rounded-full mt-4 overflow-hidden z-10">
             <div class="h-full bg-neon-cyan transition-all duration-300 ease-out" :style="{ width: `${(metric.displayValue / metric.maxValue) * 100}%` }"></div>
          </div>
        </div>

        <!-- Sub Indicators -->
        <div class="mb-4 flex-grow space-y-3 relative z-10">
          <div v-for="(ind, i) in metric.indicators" :key="i" class="flex justify-between items-end border-b border-white/5 pb-2 hover:border-white/10 transition-colors">
             <div class="flex items-center gap-2">
                <BarChart2 class="w-3 h-3 text-white/40" />
                <span class="text-xs font-almarai text-white/70">{{ ind.label }}</span>
             </div>
             <span class="text-xs font-orbitron text-neon-cyan font-bold">{{ ind.value }}</span>
          </div>
        </div>

        <!-- Goal -->
        <div class="mt-auto pt-3 relative z-10">
          <div class="flex gap-2 bg-white/5 p-2.5 rounded-lg border border-white/5 group-hover:border-white/10 transition-colors">
            <Target class="w-4 h-4 text-neon-cyan/50 shrink-0" />
            <p class="text-[10px] text-white/60 font-almarai leading-relaxed">
              {{ metric.goal }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Smart Physical Feedback (Recovery) -->
    <div v-if="hasData" class="glass-panel p-6 rounded-2xl border border-red-500/30 relative overflow-hidden animate-fade-in mt-6">
        <div class="absolute inset-0 bg-gradient-to-r from-red-500/5 to-transparent opacity-50"></div>
        <div class="flex flex-col md:flex-row items-start gap-4 relative z-10">
            <div class="w-14 h-14 rounded-xl bg-red-500/20 border border-red-500/40 flex items-center justify-center shrink-0">
                <HeartPulse class="w-7 h-7 text-red-400" />
            </div>
            <div>
                <h3 class="font-almarai font-black text-xl text-white mb-2 flex items-center gap-2">
                    نظام الاستشفاء الذكي (Smart Recovery)
                    <span class="px-2 py-0.5 bg-red-500/20 text-red-400 border border-red-500/30 rounded text-[10px] font-orbitron">AI MEDICAL</span>
                </h3>
                <p class="text-sm text-white/70 font-almarai leading-relaxed mb-4 max-w-4xl">
                    يقوم النظام بتحليل الأحمال البدنية المستخرجة من ה-GPS وإعطاء توصيات طبية وبدنية دقيقة للوقاية من الإصابات.
                </p>
                <div class="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <p class="text-sm text-red-200 font-almarai leading-relaxed flex items-start gap-2 font-bold">
                        <Stethoscope class="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                        {{ dynamicRecoveryMessage }}
                    </p>
                </div>
            </div>
        </div>
    </div>

    <!-- GPS Simulation Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in">
      <div class="glass-panel w-full max-w-2xl rounded-2xl border border-neon-cyan/40 overflow-hidden shadow-[0_0_50px_rgba(0,255,255,0.15)] flex flex-col">
        
        <!-- Modal Header -->
        <div class="p-6 border-b border-white/10 flex justify-between items-center bg-white/5 relative overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-r from-neon-cyan/10 to-transparent opacity-50"></div>
          <div class="flex items-center gap-3 relative z-10">
            <div class="w-10 h-10 rounded-full bg-neon-cyan/20 flex items-center justify-center border border-neon-cyan/50">
                <LocateFixed class="w-5 h-5 text-neon-cyan" />
            </div>
            <div>
                <h3 class="text-xl font-almarai font-black text-white">محاكاة سيناريو المباراة (GPS)</h3>
                <p class="text-xs text-white/50 font-almarai mt-1">أدخل معطيات المحاكاة لبناء البيانات</p>
            </div>
          </div>
          <button @click="showModal = false" class="text-white/40 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all relative z-10">
            <X class="w-5 h-5" />
          </button>
        </div>
        
        <!-- Modal Body -->
        <div class="p-6 space-y-6 bg-black/40">
          
          <!-- Minutes Played -->
          <div class="space-y-3">
             <h4 class="font-almarai text-white/90 font-bold flex items-center gap-2 text-sm">
                <Timer class="w-4 h-4 text-neon-cyan/70" />
                مدة المشاركة في المباراة
             </h4>
             <div class="flex gap-2">
                <button v-for="min in [30, 45, 60, 90]" :key="min"
                    @click="simConfig.minutes = min"
                    class="flex-1 py-2.5 rounded-lg font-orbitron font-bold text-sm transition-all border border-transparent"
                    :class="simConfig.minutes === min ? 'bg-neon-cyan text-black border-white/50' : 'bg-white/5 text-white/50 hover:bg-white/10'">
                   {{ min }} Min
                </button>
             </div>
          </div>

          <!-- Match Intensity -->
          <div class="space-y-3">
             <h4 class="font-almarai text-white/90 font-bold flex items-center gap-2 text-sm">
                <Flame class="w-4 h-4 text-neon-cyan/70" />
                مستوى حدة المباراة (Intensity)
             </h4>
             <div class="flex gap-2">
                <button v-for="int in ['منخفض', 'متوسط', 'عالي', 'نهائي/ديربي']" :key="int"
                    @click="simConfig.intensity = int"
                    class="flex-1 py-2.5 rounded-lg font-almarai font-bold text-sm transition-all border border-transparent"
                    :class="simConfig.intensity === int ? 'bg-neon-cyan text-black border-white/50' : 'bg-white/5 text-white/50 hover:bg-white/10'">
                   {{ int }}
                </button>
             </div>
          </div>

          <!-- Position -->
          <div class="space-y-3">
             <h4 class="font-almarai text-white/90 font-bold flex items-center gap-2 text-sm">
                <Users class="w-4 h-4 text-neon-cyan/70" />
                مركز اللاعب (التموضع)
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

        <!-- Modal Footer -->
        <div class="p-6 border-t border-white/10 bg-white/5 flex justify-end gap-3">
           <button @click="showModal = false" class="px-6 py-3 rounded-xl border border-white/10 text-white/70 font-almarai font-bold hover:bg-white/5 transition-all">
               إلغاء
           </button>
           <CyberButton @click="simulateGPS" variant="cyan" :disabled="!isConfigComplete" class="shadow-[0_0_15px_rgba(0,255,255,0.2)]">
             <div class="flex items-center gap-2">
                 <LocateFixed class="w-5 h-5" />
                 استخراج وبناء البيانات
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
  Zap, Rocket, BatteryCharging, Dumbbell, Activity, Scale, Maximize, Timer, RefreshCw, 
  Smartphone, Video, Target, CheckCircle2, LocateFixed, Eye, BarChart2, Radio,
  X, Flame, Users, HeartPulse, Stethoscope
} from 'lucide-vue-next'
import CyberButton from '../../../shared/ui/CyberButton.vue'

const isSyncing = ref(false)
const hasData = ref(false)
const showModal = ref(false)
const activeMetrics = ref([])
const dynamicRecoveryMessage = ref('')

const simConfig = ref({
    minutes: null,
    intensity: null,
    position: null
})

const isConfigComplete = computed(() => {
    return simConfig.value.minutes && simConfig.value.intensity && simConfig.value.position
})

// The base target data template
const metricsDataTemplate = [
  {
    title: 'السرعة القصوى',
    icon: Zap,
    method: 'GPS',
    methodIcon: LocateFixed,
    targetValue: 0,
    maxValue: 40,
    decimals: 1,
    unit: 'km/h',
    indicators: [
      { label: 'السرعة المتوسطة', value: '' },
      { label: 'سرعة المراوغة', value: '' }
    ],
    goal: 'قياس قدرة اللاعب على الجري بأقصى سرعة.'
  },
  {
    title: 'المسافة المقطوعة',
    icon: Activity,
    method: 'GPS',
    methodIcon: LocateFixed,
    targetValue: 0,
    maxValue: 14,
    decimals: 1,
    unit: 'km',
    indicators: [
      { label: 'مسافة الجري السريع', value: '' },
      { label: 'معدل التغطية', value: '' }
    ],
    goal: 'قياس الحجم البدني وحركة اللاعب في الملعب.'
  },
  {
    title: 'التسارع',
    icon: Rocket,
    method: 'GPS',
    methodIcon: LocateFixed,
    targetValue: 0,
    maxValue: 6,
    decimals: 2,
    unit: 'm/s²',
    indicators: [
      { label: 'عدد الانطلاقات السريعة', value: '' },
      { label: 'متوسط التسارع', value: '' }
    ],
    goal: 'قياس قدرة اللاعب على الانطلاق السريع من السكون.'
  },
  {
    title: 'التحمل (Endurance)',
    icon: BatteryCharging,
    method: 'GPS + فيديو',
    methodIcon: Activity,
    targetValue: 0,
    maxValue: 100,
    decimals: 0,
    unit: '%',
    indicators: [
      { label: 'مؤشر اللياقة', value: '' },
      { label: 'انخفاض الأداء آخر ربع ساعة', value: '' }
    ],
    goal: 'قياس قدرة اللاعب على الاستمرار طوال المشاركة.'
  },
  {
    title: 'تكرار السرعات (RSA)',
    icon: RefreshCw,
    method: 'GPS الهاتف',
    methodIcon: LocateFixed,
    targetValue: 0,
    maxValue: 30,
    decimals: 0,
    unit: 'سبرنت',
    indicators: [
      { label: 'الانطلاقات > 25 km/h', value: '' },
      { label: 'وقت الراحة بين السبرنتات', value: '' }
    ],
    goal: 'قياس القدرة على تكرار السرعات القصوى.'
  },
  {
    title: 'القوة والالتحام',
    icon: Dumbbell,
    method: 'تحليل الفيديو',
    methodIcon: Eye,
    targetValue: 0,
    maxValue: 100,
    decimals: 0,
    unit: 'pts',
    indicators: [
      { label: 'Duel Strength Score', value: '' },
      { label: 'نسبة الفوز بالالتحامات', value: '' }
    ],
    goal: 'تحويل القوة البدنية الظاهرية إلى مقاييس رقمية.'
  },
  {
    title: 'الرشاقة وتغيير الاتجاه',
    icon: Scale,
    method: 'فيديو + GPS',
    methodIcon: Eye,
    targetValue: 0,
    maxValue: 10,
    decimals: 1,
    unit: '/ 10',
    indicators: [
      { label: 'عدد التغييرات החادة', value: '' },
      { label: 'سرعة الاستدارة', value: '' }
    ],
    goal: 'قياس قدرة اللاعب على تغيير مساره بسلاسة.'
  },
  {
    title: 'المرونة الحركية',
    icon: Maximize,
    method: 'AI Pose',
    methodIcon: Eye,
    targetValue: 0,
    maxValue: 100,
    decimals: 0,
    unit: '%',
    indicators: [
      { label: 'مدى الحركة (ROM)', value: '' },
      { label: 'مؤشر تيبس المفاصل', value: '' }
    ],
    goal: 'قياس زوايا المفاصل وتقييم جودة الحركة.'
  },
  {
    title: 'معدل نبضات القلب',
    icon: HeartPulse,
    method: 'ساعة ذكية / GPS',
    methodIcon: LocateFixed,
    targetValue: 0,
    maxValue: 200,
    decimals: 0,
    unit: 'bpm',
    indicators: [
      { label: 'متوسط النبض', value: '' },
      { label: 'النبض وقت الراحة', value: '' }
    ],
    goal: 'مراقبة الجهد القلبي الوعائي أثناء المباراة.'
  }
]

// Submit Logic & Simulation Math
const simulateGPS = () => {
  showModal.value = false;
  isSyncing.value = true;
  
  const { minutes, intensity, position } = simConfig.value;
  let finalMetrics = metricsDataTemplate.map(m => ({ ...m, indicators: m.indicators.map(i => ({ ...i })) }));

  // Intensity Multiplier
  let intMult = 1;
  if(intensity === 'متوسط') intMult = 1.2;
  if(intensity === 'عالي') intMult = 1.4;
  if(intensity === 'نهائي/ديربي') intMult = 1.6;

  // Position Modifiers
  let speedMod = position === 'جناح' || position === 'مهاجم' ? 1.2 : 0.9;
  let distMod = position === 'وسط' ? 1.3 : position === 'مدافع' ? 0.9 : 1.1;
  let sprintMod = position === 'جناح' ? 1.4 : position === 'وسط' ? 1.1 : 0.8;

  // 1. Max Speed
  const baseSpeed = 28;
  finalMetrics[0].targetValue = Math.min(36, baseSpeed * speedMod + (intMult * 1.5) + (Math.random()*2));
  finalMetrics[0].indicators[0].value = `${(finalMetrics[0].targetValue * 0.6).toFixed(1)} km/h`;
  finalMetrics[0].indicators[1].value = `${(finalMetrics[0].targetValue * 0.85).toFixed(1)} km/h`;

  // 2. Distance
  const baseDistPerMin = 0.11; // 11km per 90m
  finalMetrics[1].targetValue = (minutes * baseDistPerMin * distMod * (intMult * 0.8)).toFixed(1) * 1;
  finalMetrics[1].indicators[0].value = `${(finalMetrics[1].targetValue * 0.2).toFixed(1)} km`;
  finalMetrics[1].indicators[1].value = `${(finalMetrics[1].targetValue / minutes * 1000).toFixed(0)} m/min`;

  // 3. Acceleration
  finalMetrics[2].targetValue = 3.5 * speedMod + (Math.random());
  finalMetrics[2].indicators[0].value = `${Math.floor((minutes / 10) * sprintMod * intMult * 2)}`;
  finalMetrics[2].indicators[1].value = `${(finalMetrics[2].targetValue * 0.7).toFixed(1)} m/s²`;

  // 4. Endurance
  // Endurance drops if intensity is high and minutes are high
  const fatigue = (minutes / 90) * (intMult / 1.6); // 0 to 1
  finalMetrics[3].targetValue = 100 - (fatigue * 30); 
  finalMetrics[3].indicators[0].value = finalMetrics[3].targetValue > 85 ? 'ممتاز' : 'متوسط';
  finalMetrics[3].indicators[1].value = `-${(fatigue * 15).toFixed(0)}%`;

  // 5. RSA (Sprints)
  finalMetrics[4].targetValue = Math.floor(minutes / 5 * sprintMod * intMult);
  finalMetrics[4].indicators[0].value = `${finalMetrics[4].targetValue}`;
  finalMetrics[4].indicators[1].value = `${Math.floor(45 / intMult)} ثانية`;

  // 6. Strength
  finalMetrics[5].targetValue = position === 'مدافع' ? 92 : position === 'مهاجم' ? 85 : 75;
  finalMetrics[5].indicators[0].value = `${finalMetrics[5].targetValue} pts`;
  finalMetrics[5].indicators[1].value = `${finalMetrics[5].targetValue - 5}%`;

  // 7. Agility
  finalMetrics[6].targetValue = position === 'جناح' ? 9.2 : 8.0;
  finalMetrics[6].indicators[0].value = `${Math.floor(minutes * intMult)}`;
  finalMetrics[6].indicators[1].value = `0.3s`;

  // 8. Flexibility
  finalMetrics[7].targetValue = 88;
  finalMetrics[7].indicators[0].value = `طبيعي`;
  finalMetrics[7].indicators[1].value = fatigue > 0.8 ? 'مرتفع' : 'منخفض';

  // 9. Heart Rate
  finalMetrics[8].targetValue = 140 + (intMult * 20);
  finalMetrics[8].indicators[0].value = `${(130 + intMult*15).toFixed(0)} bpm`;
  finalMetrics[8].indicators[1].value = `65 bpm`;

  // Smart Recovery AI Feedback Logic
  let effortIndex = minutes * intMult; // max 144 (90 * 1.6)
  if (effortIndex > 110) {
      dynamicRecoveryMessage.value = `تحذير طبي: الحمل البدني عالي جداً (${finalMetrics[1].targetValue} كم بحدة ${intensity}). يرجى الخضوع لجلسة استشفاء كاملة بالثلج (Ice Bath) وتجنب التدريب البدني القاسي غداً لتفادي الإرهاق العضلي.`;
  } else if (effortIndex > 60) {
      dynamicRecoveryMessage.value = `الحمل البدني معتدل. يُنصح بعمل إطالات (Stretching) لمدة 15 دقيقة مع تناول وجبة غنية بالبروتين خلال ساعة لتعويض السوائل والطاقة المفقودة.`;
  } else {
      dynamicRecoveryMessage.value = `مدة المشاركة (${minutes} دقيقة) لم تصل للحد الأقصى للجهد البدني. يُنصح ببرنامج لياقة مكمل (Top-up training) غداً للحفاظ على الجاهزية التنافسية للـ ${position}.`;
  }

  // Bind to active metrics for animation
  activeMetrics.value = finalMetrics.map(m => ({ ...m, displayValue: 0 }));

  // Fake scanning/fetching delay
  setTimeout(() => {
    isSyncing.value = false
    hasData.value = true
    animateValues()
  }, 2500)
}

const animateValues = () => {
  const duration = 2000 // 2 seconds
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
