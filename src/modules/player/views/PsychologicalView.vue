<template>
  <div class="space-y-6 animate-fade-in pb-8">
    
    <!-- Intro Section & Controls -->
    <div class="glass-panel p-6 md:p-8 rounded-2xl border-t-2 border-neon-cyan relative overflow-hidden">
      <!-- Background Graphic -->
      <div class="absolute -right-20 -top-20 w-64 h-64 bg-neon-cyan/5 rounded-full blur-3xl pointer-events-none"></div>
      
      <div class="flex flex-col md:flex-row md:items-start justify-between gap-6 relative z-10">
        <div>
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 rounded-full bg-neon-cyan/20 border border-neon-cyan flex items-center justify-center">
              <Brain class="w-5 h-5 text-neon-cyan" />
            </div>
            <h2 class="text-xl md:text-2xl font-almarai font-black tracking-tight">نظام قياس الجانب النفسي <span class="text-neon-cyan">(Football Tec)</span></h2>
          </div>
          <p class="text-white/80 font-almarai text-sm md:text-base leading-relaxed max-w-3xl mb-4">
            يهدف الجانب النفسي إلى قياس الحالة الذهنية للاعب وتأثيرها على الأداء داخل الملعب عبر تحويل العوامل النفسية إلى مؤشرات رقمية باستخدام:
            <span class="inline-flex items-center gap-1 text-neon-cyan font-bold mx-1 bg-neon-cyan/10 px-2 py-0.5 rounded"><ClipboardList class="w-4 h-4"/> استبيانات ذكية</span> 
            + 
            <span class="inline-flex items-center gap-1 text-purple-400 font-bold mx-1 bg-purple-400/10 px-2 py-0.5 rounded"><Video class="w-4 h-4"/> تحليل السلوك (فيديو)</span>
            +
            <span class="inline-flex items-center gap-1 text-blue-400 font-bold mx-1 bg-blue-400/10 px-2 py-0.5 rounded"><Link class="w-4 h-4"/> ربط الأداء بالجانب النفسي</span>.
          </p>
        </div>
        
        <!-- Action Button -->
        <div class="flex-shrink-0 pt-2">
          <CyberButton v-if="!hasData && !isSyncing" @click="showModal = true" variant="cyan" class="w-full md:w-auto shadow-[0_0_15px_rgba(0,255,255,0.2)]">
            <div class="flex items-center gap-2">
              <ClipboardList class="w-5 h-5 animate-pulse" />
              <span class="font-almarai font-bold">بدء التقييم النفسي (استبيان)</span>
            </div>
          </CyberButton>
          <div v-else-if="isSyncing" class="px-6 py-3 bg-white/5 border border-white/10 rounded-lg flex items-center gap-3">
             <RefreshCw class="w-5 h-5 text-neon-cyan animate-spin" />
             <span class="font-almarai font-bold text-sm text-white/80">جاري تحليل الإجابات...</span>
          </div>
          <div v-else class="px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center gap-2 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.3)]">
            <CheckCircle2 class="w-5 h-5" />
            <span class="font-almarai font-bold text-sm">تم التقييم بنجاح (Live)</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State Before Sync -->
    <div v-if="!isSyncing && !hasData" class="flex flex-col items-center justify-center py-20 text-center glass-panel rounded-2xl border border-white/5 border-dashed">
       <ClipboardList class="w-16 h-16 text-white/10 mb-4" />
       <h3 class="text-xl font-almarai font-bold text-white/50 mb-2">النظام في وضع الاستعداد</h3>
       <p class="text-sm text-white/30 font-almarai max-w-md">قم بالضغط على "بدء التقييم النفسي" لملء استبيان ما قبل المباراة وربطه بتحليلات الذكاء الاصطناعي.</p>
    </div>

    <!-- Loading State -->
    <div v-if="isSyncing" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <div v-for="i in 7" :key="'skeleton-'+i" class="glass-panel p-5 rounded-2xl border border-neon-cyan/20 relative overflow-hidden h-72">
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
            <span class="text-4xl font-black font-orbitron text-transparent bg-clip-text bg-gradient-to-br from-white to-neon-cyan drop-shadow-[0_0_10px_rgba(0,255,255,0.2)]" :class="metric.isReverseColor ? 'from-white to-red-400 drop-shadow-[0_0_10px_rgba(248,113,113,0.2)]' : ''">
              {{ metric.displayValue.toFixed(metric.decimals || 0) }}
            </span>
            <span class="text-sm font-orbitron text-white/50">{{ metric.unit }}</span>
          </div>
          
          <!-- Progress Bar -->
          <div class="w-full h-1 bg-white/10 rounded-full mt-4 overflow-hidden relative z-10">
             <div class="h-full transition-all duration-300 ease-out" 
                  :class="metric.isReverseColor ? 'bg-gradient-to-r from-red-500/50 to-red-500' : 'bg-gradient-to-r from-neon-cyan/50 to-neon-cyan'"
                  :style="{ width: `${(metric.displayValue / metric.maxValue) * 100}%` }"></div>
          </div>
        </div>

        <!-- Sub Indicators -->
        <div class="mb-4 flex-grow space-y-3 relative z-10">
          <div v-for="(ind, i) in metric.indicators" :key="i" class="flex justify-between items-end border-b border-white/5 pb-2 hover:border-white/10 transition-colors">
             <div class="flex items-center gap-2">
                <BarChart2 class="w-3.5 h-3.5" :class="metric.isReverseColor ? 'text-red-400/70' : 'text-neon-cyan/70'" />
                <span class="text-xs font-almarai text-white/70">{{ ind.label }}</span>
             </div>
             <span class="text-xs font-orbitron text-white font-bold">{{ ind.value }}</span>
          </div>
        </div>

        <!-- Goal -->
        <div class="mt-auto pt-3 relative z-10">
          <div class="flex gap-2 bg-white/5 p-3 rounded-lg border border-white/5 group-hover:border-white/10 transition-colors h-full">
            <Target class="w-4 h-4 shrink-0 mt-0.5" :class="metric.isReverseColor ? 'text-red-400/50' : 'text-neon-cyan/50'" />
            <p class="text-[11px] text-white/60 font-almarai leading-relaxed flex-grow">
              {{ metric.goal }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Advanced Features Grid -->
    <div v-if="hasData" class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 animate-fade-in" style="animation-delay: 0.3s;">
        <!-- Mental Dashboard -->
        <div class="glass-panel p-6 rounded-2xl border border-blue-500/30 relative overflow-hidden group">
            <div class="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
            <div class="flex flex-col md:flex-row items-start gap-4 relative z-10">
                <div class="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center shrink-0">
                    <LineChart class="w-6 h-6 text-blue-400" />
                </div>
                <div>
                    <h3 class="font-almarai font-black text-lg text-white mb-2 flex items-center gap-2">
                        Mental Dashboard
                        <span class="px-2 py-0.5 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded text-[9px] font-orbitron">ANALYTICS</span>
                    </h3>
                    <p class="text-xs text-white/70 font-almarai leading-relaxed mb-4">
                        لوحة تحكم توضح تطور الحالة النفسية (مستوى التركيز، الثقة، الضغط) على مدار الأسبوع ومقارنتها بالمباريات السابقة.
                    </p>
                    <div class="flex gap-2">
                        <button class="px-3 py-1.5 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 rounded-lg text-xs text-blue-300 font-almarai font-bold flex items-center gap-1.5 transition-all">
                            <BarChart2 class="w-3 h-3" /> عرض الإحصائيات الزمنية
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Smart Mental Feedback -->
        <div class="glass-panel p-6 rounded-2xl border border-purple-500/30 relative overflow-hidden group">
            <div class="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
            <div class="flex flex-col md:flex-row items-start gap-4 relative z-10">
                <div class="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center shrink-0">
                    <MessageSquarePlus class="w-6 h-6 text-purple-400" />
                </div>
                <div>
                    <h3 class="font-almarai font-black text-lg text-white mb-2 flex items-center gap-2">
                        Smart Mental Feedback
                        <span class="px-2 py-0.5 bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded text-[9px] font-orbitron">AI POWERED</span>
                    </h3>
                    <p class="text-xs text-white/70 font-almarai leading-relaxed mb-4">
                        نظام يعطي تغذية راجعة ذكية بناءً على إجاباتك وأدائك.
                    </p>
                    <div class="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                       <p class="text-xs text-purple-200 font-almarai leading-relaxed flex items-start gap-2">
                          <Sparkles class="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                          {{ dynamicFeedbackMessage }}
                       </p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Questionnaire Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in">
      <div class="glass-panel w-full max-w-2xl rounded-2xl border border-neon-cyan/40 overflow-hidden shadow-[0_0_50px_rgba(0,255,255,0.15)] flex flex-col max-h-[90vh]">
        
        <!-- Modal Header -->
        <div class="p-6 border-b border-white/10 flex justify-between items-center bg-white/5 relative overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-r from-neon-cyan/10 to-transparent opacity-50"></div>
          <div class="flex items-center gap-3 relative z-10">
            <div class="w-10 h-10 rounded-full bg-neon-cyan/20 flex items-center justify-center border border-neon-cyan/50">
                <ClipboardList class="w-5 h-5 text-neon-cyan" />
            </div>
            <div>
                <h3 class="text-xl font-almarai font-black text-white">التقييم النفسي للتدريب/المباراة</h3>
                <p class="text-xs text-white/50 font-almarai mt-1">Scale 1-5 (1 = الأقل, 5 = الأعلى)</p>
            </div>
          </div>
          <button @click="showModal = false" class="text-white/40 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all relative z-10">
            <X class="w-5 h-5" />
          </button>
        </div>
        
        <!-- Modal Body (Questions) -->
        <div class="p-6 overflow-y-auto custom-scrollbar flex-grow space-y-8 bg-black/40">
          <div v-for="(q, idx) in questions" :key="idx" class="space-y-4">
            <h4 class="font-almarai text-white/90 font-bold flex items-start gap-3">
               <component :is="q.icon" class="w-5 h-5 text-neon-cyan/70 shrink-0 mt-0.5" />
               <span class="leading-relaxed">{{ idx + 1 }}. {{ q.text }}</span>
            </h4>
            
            <div class="flex items-center gap-2 md:gap-4 justify-between bg-black/40 p-2 rounded-xl border border-white/5">
               <button v-for="val in 5" :key="val" 
                 @click="q.answer = val"
                 class="flex-1 py-3 rounded-lg font-orbitron font-bold text-lg transition-all border border-transparent"
                 :class="q.answer === val ? 'bg-neon-cyan text-black shadow-[0_0_15px_rgba(0,255,255,0.4)] scale-105 border-white/50' : 'bg-white/5 text-white/50 hover:bg-white/10'">
                  {{ val }}
               </button>
            </div>
            
            <div class="flex justify-between px-2 text-[11px] font-almarai text-white/40">
               <span>{{ q.lowLabel }}</span>
               <span>{{ q.highLabel }}</span>
            </div>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="p-6 border-t border-white/10 bg-white/5 flex justify-end gap-3">
           <button @click="showModal = false" class="px-6 py-3 rounded-xl border border-white/10 text-white/70 font-almarai font-bold hover:bg-white/5 transition-all">
               إلغاء
           </button>
           <CyberButton @click="submitQuestionnaire" variant="cyan" :disabled="!isAllAnswered" class="shadow-[0_0_15px_rgba(0,255,255,0.2)]">
             <div class="flex items-center gap-2">
                 <CheckCircle2 class="w-5 h-5" />
                 تقديم وتحليل الإجابات
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
  Brain, Target, Shield, Activity, Flame, Anchor, BrainCircuit, Lightbulb,
  ClipboardList, Video, Link, CheckCircle2, RefreshCw, BarChart2, LineChart, 
  MessageSquarePlus, Sparkles, Eye, X
} from 'lucide-vue-next'
import CyberButton from '../../../shared/ui/CyberButton.vue'

const isSyncing = ref(false)
const hasData = ref(false)
const showModal = ref(false)
const activeMetrics = ref([])
const dynamicFeedbackMessage = ref('')

// Questionnaire State
const questions = ref([
  { id: 'focus', icon: Target, text: 'هل كنت مركزًا طوال التدريب/المباراة الأخيرة؟', answer: null, lowLabel: 'غير مركز تماماً', highLabel: 'تركيز مثالي' },
  { id: 'confidence', icon: Shield, text: 'هل كنت واثقًا في قراراتك ولا تتردد قبل التمرير أو التسديد؟', answer: null, lowLabel: 'متردد جداً', highLabel: 'واثق جداً' },
  { id: 'stress', icon: Activity, text: 'هل شعرت بالتوتر والضغط النفسي قبل أو أثناء المباراة؟', answer: null, lowLabel: 'هادئ تماماً', highLabel: 'متوتر جداً' },
  { id: 'motivation', icon: Flame, text: 'هل أنت متحفز للعب وتشعر بأنك قدمت أقصى ما لديك؟', answer: null, lowLabel: 'غير متحفز', highLabel: 'متحفز جداً' },
  { id: 'emotions', icon: Anchor, text: 'هل تحكمت في أعصابك عند التعرض لظلم تحكيمي أو ضغط الخصم؟', answer: null, lowLabel: 'فقدت أعصابي', highLabel: 'تحكمت تماماً' }
])

const isAllAnswered = computed(() => {
  return questions.value.every(q => q.answer !== null)
})

// The base target data template
const metricsDataTemplate = [
  {
    title: 'التركيز (Concentration)',
    icon: Target,
    method: 'استبيان + فيديو',
    methodIcon: ClipboardList,
    targetValue: 0,
    maxValue: 100,
    decimals: 0,
    unit: '%',
    indicators: [
      { label: 'Score', value: '' },
      { label: 'أخطاء التشتت', value: '1 خطأ' }
    ],
    goal: 'قياس قدرة اللاعب على الحفاظ على انتباهه.'
  },
  {
    title: 'الثقة بالنفس (Confidence)',
    icon: Shield,
    method: 'استبيان + قرارات',
    methodIcon: ClipboardList,
    targetValue: 0,
    maxValue: 100,
    decimals: 0,
    unit: '%',
    indicators: [
      { label: 'مستوى الثقة', value: '' },
      { label: 'المحاولات الجريئة', value: '14 محاولة' }
    ],
    goal: 'تحليل ثقة اللاعب وعدم التردد.'
  },
  {
    title: 'الضغط النفسي (Stress)',
    icon: Activity,
    method: 'استبيان + لحظات حاسمة',
    methodIcon: ClipboardList,
    targetValue: 0, 
    maxValue: 100,
    decimals: 0,
    unit: '%',
    isReverseColor: true, 
    indicators: [
      { label: 'Stress Score', value: '' },
      { label: 'الأداء تحت الضغط', value: '' }
    ],
    goal: 'قياس التوتر وتأثير اللحظات الحاسمة.'
  },
  {
    title: 'الدافعية (Motivation)',
    icon: Flame,
    method: 'استبيان + نشاط',
    methodIcon: ClipboardList,
    targetValue: 0,
    maxValue: 100,
    decimals: 0,
    unit: '%',
    indicators: [
      { label: 'Motivation Score', value: '' },
      { label: 'مستوى النشاط', value: '' }
    ],
    goal: 'تقييم مدى تحفيز اللاعب وإعطائه أقصى ما لديه.'
  },
  {
    title: 'التحكم في الانفعالات',
    icon: Anchor,
    method: 'استبيان + سلوك',
    methodIcon: Video,
    targetValue: 0,
    maxValue: 100,
    decimals: 0,
    unit: '%',
    indicators: [
      { label: 'الاستقرار العاطفي', value: '' },
      { label: 'ردود سلبية', value: '0' }
    ],
    goal: 'تحليل ردود الفعل وتأثير الحكام والخصوم.'
  },
  {
    title: 'القرار تحت الضغط',
    icon: BrainCircuit,
    method: 'فيديو + استبيان',
    methodIcon: Eye,
    targetValue: 0,
    maxValue: 100,
    decimals: 0,
    unit: '%',
    indicators: [
      { label: 'Decision Quality', value: '' },
      { label: 'تأخير القرار', value: '0.5s' }
    ],
    goal: 'مقارنة قرارات اللاعب في المواقف الصعبة.'
  },
  {
    title: 'الذكاء الذهني',
    icon: Lightbulb,
    method: 'AI Index',
    methodIcon: Link,
    targetValue: 0,
    maxValue: 100,
    decimals: 0,
    unit: 'pts',
    indicators: [
      { label: 'Mental Index', value: '' },
      { label: 'المرونة الذهنية', value: '' }
    ],
    goal: 'تقييم شامل لجميع المؤشرات النفسية.'
  }
]

// Submit Logic & Data Binding
const submitQuestionnaire = () => {
  showModal.value = false;
  isSyncing.value = true;
  
  // Extract answers
  const focusAns = questions.value.find(q => q.id === 'focus').answer;
  const confAns = questions.value.find(q => q.id === 'confidence').answer;
  const stressAns = questions.value.find(q => q.id === 'stress').answer; // 5 = bad, 1 = good
  const motAns = questions.value.find(q => q.id === 'motivation').answer;
  const emoAns = questions.value.find(q => q.id === 'emotions').answer;

  const multiplier = 20; // 5 * 20 = 100%
  
  // Clone template
  let finalMetrics = metricsDataTemplate.map(m => ({ ...m, indicators: m.indicators.map(i => ({ ...i })) }));

  // 1. Focus
  finalMetrics[0].targetValue = focusAns * multiplier - Math.floor(Math.random() * 5);
  finalMetrics[0].indicators[0].value = `${focusAns}/5 (${focusAns >= 4 ? 'ممتاز' : focusAns <= 2 ? 'ضعيف' : 'متوسط'})`;
  
  // 2. Confidence
  finalMetrics[1].targetValue = confAns * multiplier - Math.floor(Math.random() * 5);
  finalMetrics[1].indicators[0].value = `${confAns}/5 (${confAns >= 4 ? 'عالي' : confAns <= 2 ? 'منخفض' : 'متوسط'})`;
  
  // 3. Stress (Raw value, higher is worse)
  finalMetrics[2].targetValue = stressAns * multiplier;
  finalMetrics[2].indicators[0].value = `${finalMetrics[2].targetValue}/100 (${stressAns >= 4 ? 'مرتفع' : stressAns <= 2 ? 'منخفض' : 'متوسط'})`;
  finalMetrics[2].indicators[1].value = stressAns >= 4 ? 'متأثر جداً' : stressAns <= 2 ? 'ممتاز جداً' : 'جيد';

  // 4. Motivation
  finalMetrics[3].targetValue = motAns * multiplier - Math.floor(Math.random() * 5);
  finalMetrics[3].indicators[0].value = `${motAns}/5`;
  finalMetrics[3].indicators[1].value = motAns >= 4 ? 'استثنائي' : motAns <= 2 ? 'خامل' : 'طبيعي';

  // 5. Emotions
  finalMetrics[4].targetValue = emoAns * multiplier - Math.floor(Math.random() * 5);
  finalMetrics[4].indicators[0].value = emoAns >= 4 ? 'مستقر' : emoAns <= 2 ? 'سريع الغضب' : 'متذبذب';

  // 6. Decision Under Pressure (avg of focus + confidence + inverted stress)
  const invertedStress = 6 - stressAns; 
  finalMetrics[5].targetValue = ((focusAns + confAns + invertedStress) / 3) * multiplier;
  finalMetrics[5].indicators[0].value = `${finalMetrics[5].targetValue.toFixed(0)}%`;

  // 7. Mental Intelligence (avg of all)
  finalMetrics[6].targetValue = ((focusAns + confAns + invertedStress + motAns + emoAns) / 5) * multiplier;
  finalMetrics[6].indicators[0].value = `${finalMetrics[6].targetValue.toFixed(0)} pts`;
  finalMetrics[6].indicators[1].value = finalMetrics[6].targetValue >= 80 ? 'ممتازة' : finalMetrics[6].targetValue <= 50 ? 'بحاجة لتطوير' : 'جيدة';

  // Set Smart Feedback Message based on stress and confidence
  if (stressAns >= 4 && confAns <= 2) {
      dynamicFeedbackMessage.value = "يلاحظ الذكاء الاصطناعي ارتفاع مستوى التوتر وانخفاض ثقتك في قراراتك مؤخراً، ننصح بجلسة استرخاء ذهني وتجاهل الأخطاء داخل الملعب.";
  } else if (confAns >= 4 && stressAns <= 2) {
      dynamicFeedbackMessage.value = "مستوى ثقتك وهدوئك ممتاز جداً! أداؤك الذهني في أعلى مستوياته، استمر في هذا النسق.";
  } else {
      dynamicFeedbackMessage.value = "الحالة الذهنية متوازنة. ركز على تحسين استجابتك السريعة للحد من الأخطاء الصغيرة تحت الضغط.";
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
/* Custom Scrollbar for Modal */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.02);
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(0, 255, 255, 0.2);
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 255, 255, 0.4);
}
</style>
