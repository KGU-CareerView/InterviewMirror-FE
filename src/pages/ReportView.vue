<template>
  <div class="bg-slate-50 min-h-screen flex items-center justify-center p-4">
    <div class="bg-white shadow-2xl rounded-[2.5rem] flex flex-col max-w-sm w-full overflow-hidden h-[85vh] sm:h-[90vh] relative">

      <div class="w-full px-6 pt-8 pb-4 flex justify-between items-center bg-white sticky top-0 z-20">
        <div class="flex items-center gap-2">
          <div class="w-7 h-7 bg-brand rounded-lg flex items-center justify-center text-white">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
          </div>
          <h1 class="text-xl font-bold text-slate-800 tracking-tight">면접 리포트</h1>
        </div>

        <button @click="goToHome" class="p-2.5 bg-slate-50 rounded-full hover:bg-brandLight hover:text-brand text-slate-400 transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
        </button>
      </div>

      <div class="px-6 py-4 bg-brandBg/50 border-b border-brandLight/30">
        <div class="flex items-center gap-4">
          <div class="flex-1">
            <p class="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">전체 면접 횟수</p>
            <p class="text-2xl font-black text-slate-800">12회</p>
          </div>
          <div class="flex-1">
            <p class="text-[10px] text-brand font-bold uppercase tracking-wider mb-1">평균 안정도</p>
            <p class="text-2xl font-black text-brand">82점</p>
          </div>
        </div>
      </div>

      <div class="flex-grow overflow-y-auto px-6 py-4 space-y-4 hide-scrollbar bg-slate-50/30">

        <div @click="viewDetail(1)" class="bg-white border-2 border-slate-100 p-4 rounded-3xl shadow-sm hover:border-brand/40 transition-all cursor-pointer group active:scale-95 transform">
          <div class="flex justify-between items-start mb-3">
            <div>
              <span class="text-[10px] font-bold text-slate-400 block mb-1">2026.05.14</span>
              <h3 class="text-sm font-bold text-slate-800 tracking-tight group-hover:text-brand transition-colors">종합 면접 리포트</h3>
            </div>
            <span class="px-2.5 py-1 bg-brand text-white text-[10px] font-bold rounded-lg shadow-sm">안정도 92점</span>
          </div>
          <div class="flex items-center gap-4 border-t border-slate-50 pt-3">
            <div class="flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <span class="text-[11px] text-slate-500 font-medium">15분 20초</span>
            </div>
            <div class="flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              <span class="text-[11px] text-slate-500 font-medium">소프트웨어 개발</span>
            </div>
          </div>
        </div>

        <div @click="viewDetail(2)" class="bg-white border-2 border-slate-100 p-4 rounded-3xl shadow-sm hover:border-brand/40 transition-all cursor-pointer group active:scale-95 transform">
          <div class="flex justify-between items-start mb-3">
            <div>
              <span class="text-[10px] font-bold text-slate-400 block mb-1">2026.05.12</span>
              <h3 class="text-sm font-bold text-slate-800 tracking-tight group-hover:text-brand transition-colors">인성 면접 리포트</h3>
            </div>
            <span class="px-2.5 py-1 bg-slate-100 text-slate-400 text-[10px] font-bold rounded-lg">안정도 74점</span>
          </div>
          <div class="flex items-center gap-4 border-t border-slate-50 pt-3">
            <div class="flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <span class="text-[11px] text-slate-500 font-medium">08분 45초</span>
            </div>
            <div class="flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              <span class="text-[11px] text-slate-500 font-medium">소프트웨어 개발</span>
            </div>
          </div>
        </div>

        <div @click="viewDetail(3)" class="bg-white border-2 border-slate-100 p-4 rounded-3xl shadow-sm hover:border-brand/40 transition-all cursor-pointer group active:scale-95 transform">
          <div class="flex justify-between items-start mb-3">
            <div>
              <span class="text-[10px] font-bold text-slate-400 block mb-1">2026.05.08</span>
              <h3 class="text-sm font-bold text-slate-800 tracking-tight group-hover:text-brand transition-colors">직무 면접 리포트</h3>
            </div>
            <span class="px-2.5 py-1 bg-brand text-white text-[10px] font-bold rounded-lg shadow-sm">안정도 88점</span>
          </div>
          <div class="flex items-center gap-4 border-t border-slate-50 pt-3">
            <div class="flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <span class="text-[11px] text-slate-500 font-medium">12분 10초</span>
            </div>
            <div class="flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              <span class="text-[11px] text-slate-500 font-medium">소프트웨어 개발</span>
            </div>
          </div>
        </div>

      </div>

      <div class="p-6 bg-white border-t border-slate-50 text-center">
        <p class="text-[10px] text-slate-300 font-medium tracking-widest uppercase">Career-View Analytics Platform</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

// 상단 뒤로가기 화살표 클릭 시 홈 화면으로 이동
const goToHome = () => {
    router.push('/home');
};

// 특정 리포트 카드 클릭 시 상세 페이지로 이동 (임시)
const viewDetail = (id) => {
    alert(`리포트 #${id}의 상세 분석 페이지로 이동합니다. (상세 페이지 이사 대기 중!)`);
    // 나중에 상세 페이지를 만들면 주석을 풉니다.
    // router.push(`/report-detail/${id}`);
};
</script>

<style scoped>
/* 모바일 화면에서 스크롤바를 깔끔하게 숨겨주는 CSS 설정입니다 */
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>s