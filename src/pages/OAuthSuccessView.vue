<template>
  <div class="bg-slate-50 min-h-screen flex items-center justify-center p-4">
    <div class="bg-white shadow-2xl rounded-2xl flex flex-col max-w-sm sm:max-w-md w-full overflow-hidden h-[85vh] sm:h-[90vh] items-center justify-center p-8">

      <div class="relative w-28 h-28 mb-8 flex justify-center items-center">
        <div class="absolute inset-0 border-4 border-brand/20 rounded-2xl animate-[pulse_2s_ease-in-out_infinite]"></div>
        <div class="absolute inset-2 border-2 border-brand/40 rounded-xl border-dashed animate-[spin_4s_linear_infinite]"></div>
        <div class="w-4 h-4 bg-brand rounded-full animate-ping absolute"></div>
        <div class="w-3 h-3 bg-brand rounded-full absolute"></div>
      </div>

      <div class="text-center">
        <h2 :class="['text-xl font-bold mb-2', isError ? 'text-rose-500' : 'text-slate-800']">
          {{ statusTitle }}
        </h2>
        <p class="text-slate-400 text-sm leading-relaxed" v-html="statusDesc"></p>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { apiUrl } from '../config/env';

// route는 주소창 정보를 읽을 때, router는 화면을 이동할 때 사용합니다.
const route = useRoute();
const router = useRouter();

// 화면에 보여줄 텍스트 데이터 (반응형)
const statusTitle = ref('구글 로그인 완료 중');
const statusDesc = ref('안전한 접속을 위해 인증 토큰을<br>확인하고 있습니다. 잠시만 기다려주세요.');
const isError = ref(false);

// 에러 발생 시 텍스트와 색상을 바꿔주는 함수
const handleError = (message) => {
    isError.value = true;
    statusTitle.value = "로그인 오류";
    statusDesc.value = message;
};

// 화면이 켜지자마자 실행되는 로직 (onMounted)
onMounted(() => {
    // 1. 주소창(URL)에서 구글이 던져준 임시 영수증 'code'를 추출합니다.
    // Vue에서는 URLSearchParams 대신 route.query를 사용하면 훨씬 간단합니다!
    const authCode = route.query.code;

    if (authCode) {
        console.log("구글 인가 코드 획득 성공:", authCode);

        // 2. [실제 연동 시 적용할 fetch 코드]
        /*
        fetch(apiUrl('/api/v1/auth/oauth/token'), { ... })
        */

        // 3. [임시 테스트용 Mock 로직]
        // 1.5초 후 자동으로 넘어가는 처리
        setTimeout(() => {
            // 가짜 토큰 저장
            localStorage.setItem('accessToken', 'mock_google_access_token_abcde');
            localStorage.setItem('refreshToken', 'mock_google_refresh_token_fghij');

            // 최초 로그인이라 가정하고 직무 선택 화면으로 이동
            router.push('/job-select');
        }, 1500);

    } else {
        // URL에 code가 없는 잘못된 접근일 경우
        handleError("올바르지 않은 접근입니다. 로그인 창으로 돌아갑니다.");
        setTimeout(() => {
            router.push('/'); // 로그인 화면(기본)으로 돌아가기
        }, 2000);
    }
});
</script>
