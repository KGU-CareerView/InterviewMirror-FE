<template>
  <div class="bg-slate-50 min-h-screen flex items-center justify-center p-4">
    <div class="bg-white shadow-2xl rounded-[2.5rem] flex flex-col max-w-sm w-full overflow-hidden h-[85vh] sm:h-[90vh] relative">

      <div class="w-full px-6 pt-8 pb-4 flex justify-between items-center bg-white sticky top-0 z-20">
        <button @click="goBack" class="p-2.5 bg-slate-50 rounded-full hover:bg-brandLight hover:text-brand text-slate-400 transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
        </button>
        <h1 class="text-base font-bold text-slate-800 tracking-tight">면접 #{{ sessionId }} 리포트</h1>
        <button @click="goToHome" class="p-2.5 bg-slate-50 rounded-full hover:bg-brandLight hover:text-brand text-slate-400 transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
        </button>
      </div>

      <div class="flex-grow overflow-y-auto hide-scrollbar">

        <div v-if="isLoading" class="flex flex-col items-center justify-center h-full gap-3">
          <div class="w-8 h-8 border-4 border-brand border-t-transparent rounded-full animate-spin"></div>
          <p class="text-sm font-medium text-slate-400">리포트를 불러오는 중...</p>
        </div>

        <div v-else-if="loadError" class="flex flex-col items-center justify-center h-full px-8 text-center gap-3">
          <div class="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center">
            <svg class="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <p class="text-sm font-bold text-slate-600">{{ loadError }}</p>
          <button @click="loadReport" class="mt-1 px-4 py-2 bg-brand text-white text-xs font-bold rounded-xl">다시 시도</button>
        </div>

        <template v-else-if="report">
          <div class="px-6 py-5 bg-gradient-to-br from-brand/10 to-brandLight/30 border-b border-brandLight/40">
            <p class="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-3">{{ formatDate(report.createTime) }}</p>
            <div class="flex items-end gap-3">
              <div>
                <p class="text-[10px] text-brand font-bold uppercase tracking-wider mb-1">종합 점수</p>
                <div class="flex items-baseline gap-1">
                  <span class="text-5xl font-black text-slate-800">{{ report.totalScore ?? '-' }}</span>
                  <span class="text-lg font-bold text-slate-400">점</span>
                </div>
              </div>
              <div class="flex-1 pb-1">
                <div class="w-full bg-slate-100 rounded-full h-2.5">
                  <div
                    class="bg-brand h-2.5 rounded-full transition-all duration-700"
                    :style="{ width: `${report.totalScore ?? 0}%` }"
                  ></div>
                </div>
                <p class="text-[10px] text-slate-400 font-medium mt-1 text-right">/ 100점</p>
              </div>
            </div>
            <div class="mt-3">
              <span class="inline-block px-3 py-1 text-xs font-bold rounded-xl" :class="gradeClass">{{ gradeLabel }}</span>
            </div>
          </div>

          <div class="px-6 py-5 space-y-4">

            <div v-if="report.feedback" class="bg-slate-50 rounded-3xl p-4 border border-slate-100">
              <div class="flex items-center gap-2 mb-3">
                <div class="w-6 h-6 bg-brand rounded-lg flex items-center justify-center">
                  <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
                </div>
                <p class="text-xs font-bold text-slate-700 uppercase tracking-wider">AI 종합 피드백</p>
              </div>
              <p class="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap break-keep">{{ report.feedback }}</p>
            </div>

            <div v-if="report.questions?.length" class="space-y-3">
              <p class="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">질문별 상세 분석</p>
              <div
                v-for="(q, idx) in report.questions"
                :key="idx"
                class="bg-white border-2 border-slate-100 rounded-3xl p-4"
              >
                <div class="flex justify-between items-start mb-2">
                  <span class="text-[10px] font-bold text-brand bg-brandLight/50 px-2 py-0.5 rounded-lg">Q{{ idx + 1 }}</span>
                  <span v-if="q.score != null" class="text-[10px] font-black text-slate-700">{{ q.score }}점</span>
                </div>
                <p class="text-xs font-semibold text-slate-700 mb-2 leading-snug break-keep">{{ q.question }}</p>
                <p v-if="q.feedback" class="text-[11px] text-slate-500 leading-relaxed break-keep">{{ q.feedback }}</p>
              </div>
            </div>

          </div>
        </template>

      </div>

      <div class="p-6 bg-white border-t border-slate-50 text-center">
        <p class="text-[10px] text-slate-300 font-medium tracking-widest uppercase">Career-View Analytics Platform</p>
      </div>

    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getInterviewReport } from '../api/interview';

const router = useRouter();
const route = useRoute();

const sessionId = computed(() => route.params.sessionId);
const report = ref(null);
const isLoading = ref(false);
const loadError = ref('');

const gradeLabel = computed(() => {
  const score = report.value?.totalScore;
  if (score == null) return '-';
  if (score >= 90) return '최우수';
  if (score >= 80) return '우수';
  if (score >= 70) return '양호';
  if (score >= 60) return '보통';
  return '노력 필요';
});

const gradeClass = computed(() => {
  const score = report.value?.totalScore;
  if (score == null) return 'bg-slate-100 text-slate-400';
  if (score >= 80) return 'bg-brand text-white';
  if (score >= 60) return 'bg-yellow-100 text-yellow-700';
  return 'bg-red-100 text-red-600';
});

const formatDate = (value) => {
  if (!value) return '-';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '-';
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }).replace(/\s/g, '');
};

const loadReport = async () => {
  if (!sessionId.value) {
    loadError.value = '유효하지 않은 리포트입니다.';
    return;
  }

  isLoading.value = true;
  loadError.value = '';

  try {
    report.value = await getInterviewReport(sessionId.value);
  } catch (error) {
    console.error('리포트 조회 실패:', error);
    if (error.code === 'REPORT_NOT_READY') {
      loadError.value = 'AI 리포트가 아직 생성 중입니다. 잠시 후 다시 확인해주세요.';
    } else {
      loadError.value = error.message || '리포트를 불러오지 못했습니다.';
    }
  } finally {
    isLoading.value = false;
  }
};

const goBack = () => router.back();
const goToHome = () => router.push('/home');

onMounted(loadReport);
</script>

<style scoped>
.hide-scrollbar::-webkit-scrollbar { display: none; }
.hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>
