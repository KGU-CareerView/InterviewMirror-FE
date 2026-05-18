<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

function selectType(event) {
  document.querySelectorAll('.type-card').forEach((card) => {
    card.classList.remove('border-brand', 'bg-brandLight/10');
    card.classList.add('border-slate-100', 'bg-white');
    const iconBox = card.querySelector('.icon-box');
    iconBox?.classList.remove('bg-brand', 'text-white', 'shadow-lg', 'shadow-brand/20');
    iconBox?.classList.add('bg-slate-50', 'text-slate-400');
    const subText = card.querySelectorAll('p')[1];
    subText?.classList.remove('text-brand', 'font-semibold');
    subText?.classList.add('text-slate-400');
  });

  const el = event.currentTarget;
  el.classList.add('border-brand', 'bg-brandLight/10');
  el.classList.remove('border-slate-100', 'bg-white');
  const activeIconBox = el.querySelector('.icon-box');
  activeIconBox?.classList.remove('bg-slate-50', 'text-slate-400');
  activeIconBox?.classList.add('bg-brand', 'text-white', 'shadow-lg', 'shadow-brand/20');
  const activeSubText = el.querySelectorAll('p')[1];
  activeSubText?.classList.add('text-brand', 'font-semibold');
}

function selectLevel(event) {
  document.querySelectorAll('.lvl-card').forEach((card) => {
    card.classList.remove('border-brand', 'bg-brandLight/10', 'text-brand');
    card.classList.add('border-slate-100', 'bg-white', 'text-slate-500');
  });
  event.currentTarget.classList.add('border-brand', 'bg-brandLight/10', 'text-brand');
  event.currentTarget.classList.remove('border-slate-100', 'bg-white', 'text-slate-500');
}

function selectNum(event) {
  document.querySelectorAll('.num-card').forEach((card) => {
    card.classList.remove('border-brand', 'bg-brand', 'text-white');
    card.classList.add('border-slate-100', 'bg-white', 'text-slate-500');
  });
  event.currentTarget.classList.add('border-brand', 'bg-brand', 'text-white');
  event.currentTarget.classList.remove('border-slate-100', 'bg-white', 'text-slate-500');
}

function startInterview() {
  alert('설정 완료! 실시간 면접 화면으로 이동합니다.');
  router.push('/interview.html');
}
</script>

<template>
  <main class="bg-slate-50 min-h-screen flex items-center justify-center p-4">
    <div class="bg-white shadow-2xl rounded-[2.5rem] flex flex-col max-w-sm w-full overflow-hidden h-[85vh] sm:h-[90vh]">
    
        <div class="px-6 pt-10 pb-4 text-center">
            <div class="flex justify-center mb-6">
                <div class="w-2 h-1.5 rounded-full bg-slate-200 mx-1"></div>
                <div class="w-8 h-1.5 rounded-full bg-brand mx-1"></div>
            </div>
            <h1 class="text-2xl font-bold text-slate-800 tracking-tight leading-tight">면접 방식을<br>설정해주세요</h1>
        </div>
    
        <div class="flex-grow overflow-y-auto px-6 hide-scrollbar">
    
            <div class="mb-6">
                <h3 class="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                    <span class="w-1 h-4 bg-brand rounded-full"></span>면접 유형
                </h3>
                <div class="flex flex-col gap-2.5">
    
                    <button class="type-card border-2 border-slate-100 p-3.5 rounded-2xl flex items-center gap-4 text-left transition-all bg-white hover:border-brand/30" @click="selectType($event, 'personality')">
                        <div class="icon-box w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 transition-colors">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                        </div>
                        <div>
                            <p class="font-bold text-[13px] text-slate-700">인성 면접</p>
                            <p class="text-[10px] text-slate-400">태도, 가치관, 경험 기반</p>
                        </div>
                    </button>
    
                    <button class="type-card border-2 border-slate-100 p-3.5 rounded-2xl flex items-center gap-4 text-left transition-all bg-white hover:border-brand/30" @click="selectType($event, 'job')">
                        <div class="icon-box w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 transition-colors">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                        </div>
                        <div>
                            <p class="font-bold text-[13px] text-slate-700">직무 면접</p>
                            <p class="text-[10px] text-slate-400">전공 지식 및 실무 역량</p>
                        </div>
                    </button>
    
                    <button class="type-card border-2 border-brand bg-brandLight/10 p-3.5 rounded-2xl flex items-center gap-4 text-left transition-all" @click="selectType($event, 'total')">
                        <div class="icon-box w-10 h-10 bg-brand text-white rounded-xl flex items-center justify-center shadow-lg shadow-brand/20">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        </div>
                        <div>
                            <p class="font-bold text-[13px] text-slate-800">종합 면접</p>
                            <p class="text-[10px] text-brand font-semibold">인성 + 직무 통합</p>
                        </div>
                    </button>
                </div>
            </div>
    
            <div class="mb-6">
                <h3 class="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                    <span class="w-1 h-4 bg-brand rounded-full"></span>난이도
                </h3>
                <div class="grid grid-cols-3 gap-2">
                    <button class="lvl-card p-3 border-2 border-slate-100 rounded-xl text-xs font-bold text-slate-500 bg-white" @click="selectLevel($event)">초급</button>
                    <button class="lvl-card p-3 border-2 border-brand bg-brandLight/10 rounded-xl text-xs font-bold text-brand" @click="selectLevel($event)">중급</button>
                    <button class="lvl-card p-3 border-2 border-slate-100 rounded-xl text-xs font-bold text-slate-500 bg-white" @click="selectLevel($event)">고급</button>
                </div>
            </div>
    
            <div class="mb-8">
                <h3 class="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                    <span class="w-1 h-4 bg-brand rounded-full"></span>질문 수
                </h3>
                <div class="flex gap-2">
                    <button class="num-card w-10 h-10 rounded-full border-2 border-slate-100 text-xs font-bold flex items-center justify-center text-slate-500" @click="selectNum($event)">3</button>
                    <button class="num-card w-10 h-10 rounded-full border-2 border-brand bg-brand text-white text-xs font-bold flex items-center justify-center" @click="selectNum($event)">5</button>
                    <button class="num-card w-10 h-10 rounded-full border-2 border-slate-100 text-xs font-bold flex items-center justify-center text-slate-500" @click="selectNum($event)">10</button>
                </div>
            </div>
        </div>
    
        <div class="p-6 bg-white border-t border-slate-50">
            <button @click="startInterview" class="w-full py-4 bg-brand text-white font-bold rounded-2xl shadow-lg shadow-brand/20 transition-all hover:bg-brandHover transform active:scale-95">
                면접 시작하기
            </button>
        </div>
    </div>
  </main>
</template>
