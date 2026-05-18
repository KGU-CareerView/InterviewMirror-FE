<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const statusTitle = ref('구글 로그인 완료 중');
const statusDesc = ref('안전한 접속을 위해 인증 토큰을 확인하고 있습니다. 잠시만 기다려주세요.');
const hasError = ref(false);

onMounted(() => {
  const authCode = new URLSearchParams(window.location.search).get('code');

  if (!authCode) {
    statusTitle.value = '로그인 오류';
    statusDesc.value = '올바르지 않은 접근입니다. 로그인 창으로 돌아갑니다.';
    hasError.value = true;
    window.setTimeout(() => router.push('/login'), 2000);
    return;
  }

  window.setTimeout(() => {
    localStorage.setItem('accessToken', 'mock_google_access_token_abcde');
    localStorage.setItem('refreshToken', 'mock_google_refresh_token_fghij');
    router.push('/job-select');
  }, 1500);
});
</script>

<template>
  <main class="bg-slate-50 min-h-screen flex items-center justify-center p-4">
    <div class="bg-white shadow-2xl rounded-2xl flex flex-col max-w-sm sm:max-w-md w-full overflow-hidden h-[85vh] sm:h-[90vh] items-center justify-center p-8">
    
        <div class="relative w-28 h-28 mb-8 flex justify-center items-center">
            <div class="absolute inset-0 border-4 border-brand/20 rounded-2xl animate-[pulse_2s_ease-in-out_infinite]"></div>
            <div class="absolute inset-2 border-2 border-brand/40 rounded-xl border-dashed animate-[spin_4s_linear_infinite]"></div>
            <div class="w-4 h-4 bg-brand rounded-full animate-ping absolute"></div>
            <div class="w-3 h-3 bg-brand rounded-full absolute"></div>
        </div>
    
        <div class="text-center">
            <h2 id="statusTitle" class="text-xl font-bold mb-2" :class="hasError ? 'text-rose-500' : 'text-slate-800'">{{ statusTitle }}</h2>
            <p id="statusDesc" class="text-slate-400 text-sm leading-relaxed">
                {{ statusDesc }}
            </p>
        </div>
    
    </div>
  </main>
</template>
