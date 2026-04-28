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
              <Compass class="w-5 h-5 text-neon-cyan" />
            </div>
            <h2 class="text-xl md:text-2xl font-almarai font-black tracking-tight">نظام قياس الجانب التكتيكي <span class="text-neon-cyan">(Football Tec)</span></h2>
          </div>
          <p class="text-white/80 font-almarai text-sm md:text-base leading-relaxed max-w-3xl mb-4">
            يتم تحليل الجانب التكتيكي عبر:
            <span class="inline-flex items-center gap-1 text-neon-cyan font-bold mx-1 bg-neon-cyan/10 px-2 py-0.5 rounded"><LocateFixed class="w-4 h-4"/> GPS (التموضع)</span> 
            + 
            <span class="inline-flex items-center gap-1 text-purple-400 font-bold mx-1 bg-purple-400/10 px-2 py-0.5 rounded"><Video class="w-4 h-4"/> تحليل الفيديو</span>
            +
            <span class="inline-flex items-center gap-1 text-blue-400 font-bold mx-1 bg-blue-400/10 px-2 py-0.5 rounded"><BrainCircuit class="w-4 h-4"/> AI لتحليل القرارات</span>.
          </p>
        </div>
        
        <!-- Action Button -->
        <div class="flex-shrink-0 pt-2">
          <CyberButton v-if="!hasData && !isSyncing" @click="showModal = true" variant="cyan" class="w-full md:w-auto shadow-[0_0_15px_rgba(0,255,255,0.2)]">
            <div class="flex items-center gap-2">
              <Map class="w-5 h-5 animate-pulse" />
              <span class="font-almarai font-bold">إعداد الخطة التكتيكية (Simulation)</span>
            </div>
          </CyberButton>
          <div v-else-if="isSyncing" class="px-6 py-3 bg-white/5 border border-white/10 rounded-lg flex items-center gap-3">
             <RefreshCw class="w-5 h-5 text-neon-cyan animate-spin" />
             <span class="font-almarai font-bold text-sm text-white/80">جاري بناء الخرائط الحرارية ومطابقة الخطة...</span>
          </div>
          <div v-else class="px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center gap-2 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.3)]">
            <CheckCircle2 class="w-5 h-5" />
            <span class="font-almarai font-bold text-sm">تم التزامن بنجاح (Live)</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State Before Sync -->
    <div v-if="!isSyncing && !hasData" class="flex flex-col items-center justify-center py-20 text-center glass-panel rounded-2xl border border-white/5 border-dashed">
       <Map class="w-16 h-16 text-white/10 mb-4" />
       <h3 class="text-xl font-almarai font-bold text-white/50 mb-2">النظام في وضع الاستعداد</h3>
       <p class="text-sm text-white/30 font-almarai max-w-md">قم بالضغط على "إعداد الخطة التكتيكية" لاختيار خطة اللعب والأسلوب ومطابقتها مع مسارات الـ GPS.</p>
    </div>

    <!-- Loading State -->
    <div v-if="isSyncing" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      <div v-for="i in 8" :key="'skeleton-'+i" class="glass-panel p-5 rounded-2xl border border-neon-cyan/20 relative overflow-hidden h-72">
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
    <div v-if="hasData" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 animate-fade-in">
      <div v-for="(metric, index) in activeMetrics" :key="index" class="glass-panel p-5 rounded-2xl border border-white/5 hover:border-neon-cyan/40 transition-all group flex flex-col h-full relative overflow-hidden">
        
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
          <h3 class="font-almarai font-bold text-base pr-4 leading-tight">{{ index + 1 }}. {{ metric.title }}</h3>
        </div>

        <!-- Main Value Display -->
        <div class="bg-black/30 rounded-xl p-4 mb-4 border border-white/5 flex flex-col relative overflow-hidden group-hover:bg-black/50 transition-colors">
          <div class="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:scale-110 group-hover:opacity-[0.05] transition-all duration-500">
            <component :is="metric.icon" class="w-32 h-32" />
          </div>
          
          <div class="text-[9px] text-neon-cyan/60 font-orbitron uppercase tracking-widest mb-1 flex items-center gap-1 z-10">
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
        <div class="mb-4 flex-grow space-y-2.5 relative z-10">
          <div v-for="(ind, i) in metric.indicators" :key="i" class="flex justify-between items-end border-b border-white/5 pb-2 hover:border-white/10 transition-colors">
             <div class="flex items-center gap-2">
                <BarChart2 class="w-3 h-3 text-neon-cyan/70" />
                <span class="text-[11px] font-almarai text-white/70">{{ ind.label }}</span>
             </div>
             <span class="text-[11px] font-orbitron text-white font-bold">{{ ind.value }}</span>
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

    <!-- Advanced Features Grid -->
    <div v-if="hasData" class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 animate-fade-in" style="animation-delay: 0.3s;">
        <!-- Tactical Dashboard -->
        <div class="glass-panel p-6 rounded-2xl border border-blue-500/30 relative overflow-hidden group">
            <div class="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
            <div class="flex flex-col md:flex-row items-start gap-4 relative z-10">
                <div class="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center shrink-0">
                    <LayoutDashboard class="w-6 h-6 text-blue-400" />
                </div>
                <div>
                    <h3 class="font-almarai font-black text-lg text-white mb-2 flex items-center gap-2">
                        Tactical Dashboard
                        <span class="px-2 py-0.5 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded text-[9px] font-orbitron">INTERACTIVE</span>
                    </h3>
                    <p class="text-xs text-white/70 font-almarai leading-relaxed mb-4">
                        لوحة تحكم تعرض الخريطة الحرارية (Heatmap)، خريطة التمركز (Position Map) مقارنة بخطة المدرب.
                    </p>
                    <div class="flex gap-2">
                        <button class="px-3 py-1.5 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 rounded-lg text-xs text-blue-300 font-almarai font-bold flex items-center gap-1.5 transition-all">
                            <Map class="w-3 h-3" /> عرض الخريطة الحرارية
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Tactical Video Analysis -->
        <div class="glass-panel p-6 rounded-2xl border border-purple-500/30 relative overflow-hidden group">
            <div class="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
            <div class="flex flex-col md:flex-row items-start gap-4 relative z-10">
                <div class="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center shrink-0">
                    <Video class="w-6 h-6 text-purple-400" />
                </div>
                <div>
                    <h3 class="font-almarai font-black text-lg text-white mb-2 flex items-center gap-2">
                        Tactical Video Analysis
                        <span class="px-2 py-0.5 bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded text-[9px] font-orbitron">AI POWERED</span>
                    </h3>
                    <p class="text-xs text-white/70 font-almarai leading-relaxed mb-4">
                        نظام يعرض لقطات الفيديو للأخطاء التكتيكية والتمركز الصحيح بناءً على تكتيك الفريق.
                    </p>
                    <div class="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg mb-3">
                       <p class="text-xs text-purple-200 font-almarai leading-relaxed flex items-start gap-2 font-bold">
                          <BrainCircuit class="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                          {{ dynamicTacticalFeedback }}
                       </p>
                    </div>
                    <div class="flex gap-2">
                        <button class="px-3 py-1.5 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/50 rounded-lg text-xs text-purple-300 font-almarai font-bold flex items-center gap-1.5 transition-all">
                            <Play class="w-3 h-3" /> مشاهدة التحليل التكتيكي
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Tactical AI Simulation Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in">
      <div class="glass-panel w-full max-w-2xl rounded-2xl border border-neon-cyan/40 overflow-hidden shadow-[0_0_50px_rgba(0,255,255,0.15)] flex flex-col">
        
        <div class="p-6 border-b border-white/10 flex justify-between items-center bg-white/5 relative overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-r from-neon-cyan/10 to-transparent opacity-50"></div>
          <div class="flex items-center gap-3 relative z-10">
            <div class="w-10 h-10 rounded-full bg-neon-cyan/20 flex items-center justify-center border border-neon-cyan/50">
                <Map class="w-5 h-5 text-neon-cyan" />
            </div>
            <div>
                <h3 class="text-xl font-almarai font-black text-white">إعداد خطة المباراة</h3>
                <p class="text-xs text-white/50 font-almarai mt-1">اختر التشكيلة والأسلوب لمطابقتها مع التمركز الفعلي</p>
            </div>
          </div>
          <button @click="showModal = false" class="text-white/40 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all relative z-10">
            <X class="w-5 h-5" />
          </button>
        </div>
        
        <div class="p-6 space-y-6 bg-black/40">
          
          <div class="space-y-3">
             <h4 class="font-almarai text-white/90 font-bold flex items-center gap-2 text-sm">
                <ClipboardList class="w-4 h-4 text-neon-cyan/70" />
                التشكيلة التكتيكية (Formation)
             </h4>
             <div class="flex gap-2">
                <button v-for="form in ['4-3-3 هجومي', '4-4-2 متوازن', '5-3-2 دفاعي']" :key="form"
                    @click="simConfig.formation = form"
                    class="flex-1 py-2.5 rounded-lg font-almarai font-bold text-sm transition-all border border-transparent"
                    :class="simConfig.formation === form ? 'bg-neon-cyan text-black border-white/50' : 'bg-white/5 text-white/50 hover:bg-white/10'">
                   {{ form }}
                </button>
             </div>
          </div>

          <div class="space-y-3">
             <h4 class="font-almarai text-white/90 font-bold flex items-center gap-2 text-sm">
                <Route class="w-4 h-4 text-neon-cyan/70" />
                أسلوب اللعب (Playstyle)
             </h4>
             <div class="flex gap-2">
                <button v-for="style in ['استحواذ (Tiki-Taka)', 'هجمات مرتدة', 'ضغط عالي (Gegenpressing)']" :key="style"
                    @click="simConfig.playstyle = style"
                    class="flex-1 py-2.5 rounded-lg font-almarai font-bold text-sm transition-all border border-transparent"
                    :class="simConfig.playstyle === style ? 'bg-neon-cyan text-black border-white/50' : 'bg-white/5 text-white/50 hover:bg-white/10'">
                   {{ style }}
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
           <CyberButton @click="simulateTactics" variant="cyan" :disabled="!isConfigComplete" class="shadow-[0_0_15px_rgba(0,255,255,0.2)]">
             <div class="flex items-center gap-2">
                 <LocateFixed class="w-5 h-5" />
                 مطابقة الخطة مع GPS والذكاء الاصطناعي
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
  Compass, LocateFixed, Route, Brain, ClipboardList, ArrowRightLeft, ShieldAlert, 
  Users, ScanEye, Crosshair, Activity, Eye, Map, Network, BrainCircuit,
  RefreshCw, CheckCircle2, BarChart2, Target, Video, LayoutDashboard, Play, X
} from 'lucide-vue-next'
import CyberButton from '../../../shared/ui/CyberButton.vue'

const isSyncing = ref(false)
const hasData = ref(false)
const showModal = ref(false)
const activeMetrics = ref([])
const dynamicTacticalFeedback = ref('')

const simConfig = ref({
    formation: null,
    playstyle: null,
    position: null
})

const isConfigComplete = computed(() => {
    return simConfig.value.formation && simConfig.value.playstyle && simConfig.value.position
})

const metricsDataTemplate = [
  {
    title: 'التمركز',
    icon: LocateFixed,
    method: 'GPS + فيديو',
    methodIcon: Crosshair,
    targetValue: 0,
    maxValue: 100,
    decimals: 0,
    unit: '%',
    indicators: [
      { label: 'دقة التمركز (Position Accuracy)', value: '' },
      { label: 'أخطاء التمركز', value: '' }
    ],
    goal: 'معرفة هل اللاعب يتمركز بشكل صحيح داخل الخطة المحددة.'
  },
  {
    title: 'التحرك بدون كرة',
    icon: Route,
    method: 'تتبع المسارات',
    methodIcon: Activity,
    targetValue: 0,
    maxValue: 60,
    decimals: 0,
    unit: 'run',
    indicators: [
      { label: 'التحركات الذكية', value: '' },
      { label: 'جودة التحركات', value: '' }
    ],
    goal: 'تقييم نشاط اللاعب ومساهمته الفعالة بدون امتلاك الكرة.'
  },
  {
    title: 'اتخاذ القرار',
    icon: Brain,
    method: 'تحليل القرار AI',
    methodIcon: Eye,
    targetValue: 0,
    maxValue: 100,
    decimals: 0,
    unit: '%',
    indicators: [
      { label: 'دقة القرار (Decision Accuracy)', value: '' },
      { label: 'زمن اتخاذ القرار', value: '' }
    ],
    goal: 'قياس ذكاء اللاعب ومقارنة قراراته مع أفضل خيار ممكن.'
  },
  {
    title: 'الخطة التكتيكية',
    icon: ClipboardList,
    method: 'GPS + الخطة',
    methodIcon: Crosshair,
    targetValue: 0,
    maxValue: 100,
    decimals: 0,
    unit: '%',
    indicators: [
      { label: 'الالتزام بالخطة (Discipline)', value: '' },
      { label: 'عدد الخروج عن التمركز', value: '' }
    ],
    goal: 'قياس مدى التزام اللاعب وانضباطه بتعليمات المدرب.'
  },
  {
    title: 'التحولات',
    icon: ArrowRightLeft,
    method: 'GPS',
    methodIcon: Activity,
    targetValue: 0,
    maxValue: 8,
    decimals: 1,
    unit: 's',
    indicators: [
      { label: 'سرعة بناء الهجمة', value: '' },
      { label: 'سرعة الرجوع للدفاع', value: '' }
    ],
    goal: 'تقييم سرعة استجابة وانتقال اللاعب في التحولات.'
  },
  {
    title: 'التغطية الدفاعية',
    icon: ShieldAlert,
    method: 'GPS',
    methodIcon: Map,
    targetValue: 0,
    maxValue: 100,
    decimals: 0,
    unit: '%',
    indicators: [
      { label: 'المساحات المغطاة', value: '' },
      { label: 'مناطق الاعتراض', value: '' }
    ],
    goal: 'قياس دور اللاعب الدفاعي وتمركزه السليم عند فقدان الكرة.'
  },
  {
    title: 'اللعب الجماعي',
    icon: Users,
    method: 'تحليل الفيديو',
    methodIcon: Network,
    targetValue: 0,
    maxValue: 10,
    decimals: 1,
    unit: '/ 10',
    indicators: [
      { label: 'التنسيق في التحركات', value: '' },
      { label: 'Team Interaction Score', value: '' }
    ],
    goal: 'قياس مستوى انسجام وتفاعل اللاعب مع المنظومة الجماعية.'
  },
  {
    title: 'قراءة اللعب',
    icon: ScanEye,
    method: 'تحليل ذكي',
    methodIcon: BrainCircuit,
    targetValue: 0,
    maxValue: 100,
    decimals: 0,
    unit: '%',
    indicators: [
      { label: 'Anticipation Score (التوقع)', value: '' },
      { label: 'عدد التدخلات الذكية', value: '' }
    ],
    goal: 'توقع تحركات الخصم واختيار التمركز الصحيح.'
  }
]

const simulateTactics = () => {
  showModal.value = false;
  isSyncing.value = true;
  
  const { formation, playstyle, position } = simConfig.value;
  let finalMetrics = metricsDataTemplate.map(m => ({ ...m, indicators: m.indicators.map(i => ({ ...i })) }));

  // 1. Positioning
  finalMetrics[0].targetValue = formation === '5-3-2 دفاعي' && position === 'مدافع' ? 95 : 82;
  finalMetrics[0].indicators[0].value = `${finalMetrics[0].targetValue}%`;
  finalMetrics[0].indicators[1].value = finalMetrics[0].targetValue > 90 ? '1 مرة' : '4 مرات';

  // 2. Off-ball Movement
  finalMetrics[1].targetValue = playstyle === 'ضغط عالي (Gegenpressing)' ? 55 : playstyle === 'هجمات مرتدة' ? 45 : 35;
  finalMetrics[1].indicators[0].value = `${finalMetrics[1].targetValue - 5} حركة`;
  finalMetrics[1].indicators[1].value = playstyle === 'ضغط عالي (Gegenpressing)' ? 'ممتازة' : 'جيدة';

  // 3. Decision Making
  finalMetrics[2].targetValue = playstyle === 'استحواذ (Tiki-Taka)' ? 88 : 78;
  finalMetrics[2].indicators[0].value = `${finalMetrics[2].targetValue}%`;
  finalMetrics[2].indicators[1].value = playstyle === 'هجمات مرتدة' ? '0.8s' : '1.5s';

  // 4. Tactical Discipline
  finalMetrics[3].targetValue = formation === '4-3-3 هجومي' && position === 'مدافع' ? 70 : 90;
  finalMetrics[3].indicators[0].value = `${finalMetrics[3].targetValue}%`;
  finalMetrics[3].indicators[1].value = finalMetrics[3].targetValue < 80 ? 'مرتفع' : 'قليل';

  // 5. Transitions
  finalMetrics[4].targetValue = playstyle === 'هجمات مرتدة' ? 3.5 : 6.0;
  finalMetrics[4].indicators[0].value = `${finalMetrics[4].targetValue}s`;
  finalMetrics[4].indicators[1].value = playstyle === 'ضغط عالي (Gegenpressing)' ? '4.0s' : '5.5s';

  // 6. Defensive Coverage
  finalMetrics[5].targetValue = playstyle === 'ضغط عالي (Gegenpressing)' && position !== 'مدافع' ? 85 : position === 'مدافع' ? 90 : 60;
  finalMetrics[5].indicators[0].value = finalMetrics[5].targetValue > 80 ? 'واسعة جداً' : 'متوسطة';
  finalMetrics[5].indicators[1].value = finalMetrics[5].targetValue > 80 ? 'دقيقة' : 'عادية';

  // 7. Team Play
  finalMetrics[6].targetValue = playstyle === 'استحواذ (Tiki-Taka)' ? 9.5 : 7.5;
  finalMetrics[6].indicators[0].value = finalMetrics[6].targetValue > 8 ? 'عالي جداً' : 'مقبول';
  finalMetrics[6].indicators[1].value = `${finalMetrics[6].targetValue}`;

  // 8. Game Reading
  finalMetrics[7].targetValue = position === 'وسط' ? 88 : 75;
  finalMetrics[7].indicators[0].value = `${finalMetrics[7].targetValue}%`;
  finalMetrics[7].indicators[1].value = position === 'وسط' ? '8' : '4';

  // Smart Feedback Message logic
  if (playstyle === 'ضغط عالي (Gegenpressing)') {
      dynamicTacticalFeedback.value = `أسلوب الضغط العالي (Gegenpressing) يتطلب تغطية دفاعية وتحرك بدون كرة مستمر. أرقامك تظهر معدل تحرك ممتاز (${finalMetrics[1].targetValue} run) وسرعة ارتداد ممتازة.`;
  } else if (formation === '5-3-2 دفاعي' && position === 'مدافع') {
      dynamicTacticalFeedback.value = `لعبت كـ ${position} في تشكيلة ${formation}. دقة التمركز كانت ممتازة جداً (${finalMetrics[0].targetValue}%) مع التزام كامل بالخط الخلفي وعدم الخروج عن التمركز.`;
  } else if (playstyle === 'استحواذ (Tiki-Taka)') {
      dynamicTacticalFeedback.value = `اللعب بأسلوب الاستحواذ يتطلب انسجاماً عالياً. مؤشر اللعب الجماعي وصل إلى ${finalMetrics[6].targetValue}/10، ودقة القرارات أثناء امتلاك الكرة كانت عالية جداً.`;
  } else {
      dynamicTacticalFeedback.value = `تمركز جيد مقارنة بالخطة الموضوعة (${formation}). سرعة التحولات الهجومية والدفاعية مطابقة لتعليمات المدرب.`;
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
