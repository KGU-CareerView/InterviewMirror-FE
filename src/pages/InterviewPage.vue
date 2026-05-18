<template>
  <div class="bg-gray-50 h-screen flex flex-col font-sans overflow-hidden">
    
    <header class="w-full h-16 bg-brandLight/40 flex items-center justify-between px-8 border-b border-brandLight/60 shrink-0">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-lg bg-brand flex items-center justify-center text-white font-bold">CV</div>
        <h1 class="text-lg font-bold text-gray-800">Career-View <span class="text-sm font-normal text-gray-500 ml-2">실시간 모의 면접 진행 중</span></h1>
      </div>
      
      <div class="flex items-center gap-6">
        <div class="flex items-center gap-2">
          <div class="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
          <span class="text-xl font-mono font-semibold text-gray-800">{{ formattedTime }}</span>
        </div>
        <button 
          @click="finishInterview" 
          class="px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg text-sm font-bold transition-colors duration-200"
        >
          면접 종료
        </button>
      </div>
    </header>

    <main class="flex-1 w-full flex p-6 gap-6 h-full relative">
      
      <aside class="w-[15%] flex flex-col gap-4">
        <div class="bg-white p-5 rounded-2xl shadow-sm border border-gray-200 h-full flex flex-col">
          <h3 class="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
            <svg class="w-4 h-4 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            AI 안면 분석
          </h3>
          
          <div class="space-y-3 flex-1">
            <div :class="['flex items-center justify-between p-3 rounded-xl border transition-all duration-200', currentEmotion === 'Stable' ? 'bg-brandLight/30 border-brand/30 ring-1 ring-brand/20' : 'bg-gray-50 border-gray-100 opacity-60']">
              <span :class="['text-sm', currentEmotion === 'Stable' ? 'font-bold text-brandHover' : 'font-medium text-gray-500']">Stable (안정)</span>
              <span class="relative flex h-3 w-3">
                <span v-if="currentEmotion === 'Stable'" class="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"></span>
                <span :class="['relative inline-flex rounded-full h-3 w-3', currentEmotion === 'Stable' ? 'bg-brand' : 'bg-gray-300']"></span>
              </span>
            </div>
            
            <div :class="['flex items-center justify-between p-3 rounded-xl border transition-all duration-200', currentEmotion === 'Neutral' ? 'bg-brandLight/30 border-brand/30 ring-1 ring-brand/20' : 'bg-gray-50 border-gray-100 opacity-60']">
              <span :class="['text-sm', currentEmotion === 'Neutral' ? 'font-bold text-brandHover' : 'font-medium text-gray-500']">Neutral (무표정)</span>
              <span class="relative flex h-3 w-3">
                <span v-if="currentEmotion === 'Neutral'" class="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"></span>
                <span :class="['relative inline-flex rounded-full h-3 w-3', currentEmotion === 'Neutral' ? 'bg-brand' : 'bg-gray-300']"></span>
              </span>
            </div>
            
            <div :class="['flex items-center justify-between p-3 rounded-xl border transition-all duration-200', currentEmotion === 'Nervous' ? 'bg-red-50 border-red-200 ring-1 ring-red-100' : 'bg-gray-50 border-gray-100 opacity-60']">
              <span :class="['text-sm', currentEmotion === 'Nervous' ? 'font-bold text-red-600' : 'font-medium text-gray-500']">Nervous (긴장)</span>
              <span class="relative flex h-3 w-3">
                <span v-if="currentEmotion === 'Nervous'" class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span :class="['relative inline-flex rounded-full h-3 w-3', currentEmotion === 'Nervous' ? 'bg-red-500' : 'bg-gray-300']"></span>
              </span>
            </div>
          </div>

          <div v-if="showWarning" class="mt-4 p-3 bg-yellow-50 text-yellow-700 text-xs font-bold rounded-xl border border-yellow-200 animate-bounce">
            {{ warningMessage }}
          </div>
        </div>
      </aside>

      <section class="w-[70%] bg-black rounded-3xl shadow-lg relative overflow-hidden flex flex-col items-center justify-center border-4 border-gray-800">
        <video 
          ref="videoRef" 
          autoplay 
          playsinline 
          class="w-full h-full object-cover rounded-2xl transform -scale-x-100"
        ></video>
        
        <div v-if="currentEmotion === 'Nervous'" class="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-black/75 text-white px-6 py-3 rounded-full backdrop-blur-md text-sm font-medium border border-white/10 shadow-2xl flex items-center gap-3 animate-fade-in">
          <span class="text-brandLight">💡</span> 심호흡을 하고 편안하게 답변해 보세요.
        </div>
      </section>

      <aside class="w-[15%] flex flex-col gap-4">
        <div class="bg-white p-5 rounded-2xl shadow-sm border border-gray-200 h-full flex flex-col">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-sm font-bold text-gray-700">현재 질문</h3>
            <span class="text-xs font-bold text-brand bg-brandLight/50 px-2 py-1 rounded-md">Q {{ questionIndex }} / {{ totalQuestions }}</span>
          </div>
          
          <div class="text-base text-gray-800 font-semibold leading-relaxed flex-1 mt-2 p-4 bg-gray-50 rounded-xl border border-gray-100 break-keep overflow-y-auto">
            {{ currentQuestion }}
          </div>
          
          <p class="text-xs text-gray-400 text-center mt-4 mb-2">답변을 마치면 아래 버튼을 눌러주세요.</p>

          <button 
            @click="requestNextQuestion" 
            class="w-full py-4 bg-brand hover:bg-brandHover text-white rounded-xl font-bold transition-colors duration-200 shadow-md flex items-center justify-center gap-2"
          >
            답변 완료 / 다음 
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"></path></svg>
          </button>
        </div>
      </aside>
    </main>

    <div v-if="isModalOpen" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 transition-opacity">
      <div class="bg-white rounded-[24px] shadow-2xl w-11/12 max-w-2xl overflow-hidden flex flex-col">
        <div class="bg-brandLight/40 px-8 py-6 border-b border-brandLight/60 flex justify-between items-center">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-brand flex items-center justify-center text-white text-xl shadow-sm">🎉</div>
            <div>
              <h2 class="text-xl font-bold text-gray-800">모의 면접 완료!</h2>
              <p class="text-xs text-gray-500 font-medium mt-0.5">Career-View 분석 통계 스코어</p>
            </div>
          </div>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-600 transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div class="p-8 space-y-8 bg-white">
          <div>
            <h3 class="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
              <svg class="w-5 h-5 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              실시간 분석 집계 결과
            </h3>
            <div class="space-y-4">
              <div>
                <div class="flex justify-between text-sm mb-1.5">
                  <span class="font-bold text-gray-700">Stable <span class="text-gray-400 font-medium text-xs ml-1">(안정)</span></span>
                  <span class="font-bold text-brand">{{ finalScores.stable }}%</span>
                </div>
                <div class="w-full bg-gray-100 rounded-full h-3">
                  <div class="bg-brand h-3 rounded-full transition-all duration-1000" :style="{ width: finalScores.stable + '%' }"></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between text-sm mb-1.5">
                  <span class="font-bold text-gray-700">Nervous <span class="text-gray-400 font-medium text-xs ml-1">(긴장)</span></span>
                  <span class="font-bold text-red-400">{{ finalScores.nervous }}%</span>
                </div>
                <div class="w-full bg-gray-100 rounded-full h-3">
                  <div class="bg-red-400 h-3 rounded-full transition-all duration-1000" :style="{ width: finalScores.nervous + '%' }"></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between text-sm mb-1.5">
                  <span class="font-bold text-gray-700">Neutral <span class="text-gray-400 font-medium text-xs ml-1">(무표정)</span></span>
                  <span class="font-bold text-gray-400">{{ finalScores.neutral }}%</span>
                </div>
                <div class="w-full bg-gray-100 rounded-full h-3">
                  <div class="bg-gray-400 h-3 rounded-full transition-all duration-1000" :style="{ width: finalScores.neutral + '%' }"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 p-5 rounded-2xl border border-gray-100">
            <h3 class="text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
              <span class="text-brand">💡</span> AI 종합 피드백
            </h3>
            <p class="text-sm text-gray-600 leading-relaxed break-keep">
              {{ aiFeedbackComment }}
            </p>
          </div>
        </div>

        <div class="bg-gray-50 px-8 py-5 flex justify-end gap-3 border-t border-gray-100">
          <button @click="goToHome" class="px-6 py-3 rounded-xl font-bold text-gray-500 bg-white border border-gray-200 hover:bg-gray-50 hover:text-gray-700 transition-colors text-sm">
            홈으로 가기
          </button>
          <button @click="goToReport" class="px-6 py-3 rounded-xl font-bold text-white bg-brand hover:bg-brandHover shadow-md shadow-brand/20 transition-colors text-sm flex items-center gap-2">
            상세 리포트 확인하기
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"></path></svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router' // 라우터 기능 추가

const router = useRouter()

// --- 인터페이스 리액티브 상태 정의 ---
const isModalOpen = ref(false)
const currentEmotion = ref('Stable') 
const showWarning = ref(false)
const warningMessage = ref('')

// 백엔드 연동 전송 질문 필드 데이터 구조체
const currentQuestion = ref('AI 서버로부터 면접 질문을 구성하고 있습니다...')
const questionIndex = ref(1)
const totalQuestions = ref(5)

// 타이머 변수
const timerSeconds = ref(0)
let timerInterval = null

// 누적 로그 분석용 카운터
const analyticsLog = { Stable: 0, Nervous: 0, Neutral: 0, totalTicks: 0 }
const finalScores = ref({ stable: 0, nervous: 0, neutral: 0 })
const aiFeedbackComment = ref('')

// 하드웨어 미디어 참조 변수
const videoRef = ref(null)
let localStream = null
let socket = null
let imageStreamingInterval = null

// --- 타이머 포맷 계산 필드 ---
const formattedTime = computed(() => {
  const mins = String(Math.floor(timerSeconds.value / 60)).padStart(2, '0')
  const secs = String(timerSeconds.value % 60).padStart(2, '0')
  return `${mins}:${secs}`
})

// --- 라우터 화면 이동 함수 ---
const goToHome = () => {
  isModalOpen.value = false
  router.push('/home')
}

const goToReport = () => {
  isModalOpen.value = false
  router.push('/report')
}

const closeModal = () => {
  isModalOpen.value = false
}

// --- 핵심 비즈니스 메서드 아키텍처 ---

// 1. 하드웨어 카메라 스트림 활성화 연동
const initCameraStream = async () => {
  try {
    localStream = await navigator.mediaDevices.getUserMedia({
      video: { width: 1280, height: 720, frameRate: { ideal: 30 } }
    })
    if (videoRef.value) {
      videoRef.value.srcObject = localStream
    }
  } catch (err) {
    console.error('웹캠 엑세스 거부 또는 장치 에러:', err)
    currentQuestion.value = '웹캠 장치를 로드할 수 없습니다. 권한 승인을 체크해주세요.'
  }
}

// 2. 백엔드 Spring Boot 웹소켓 및 데이터 파이프라인 연동
const initWebSocketPipeline = () => {
  socket = new WebSocket('ws://localhost:8080/ws/interview')

  socket.onopen = () => {
    console.log('Spring Boot 실시간 스트리밍 채널 오픈')
    socket.send(JSON.stringify({ event: 'START_SESSION' }))
    startFrameTransmission()
  }

  socket.onmessage = (messageEvent) => {
    const serverPayload = JSON.parse(messageEvent.data)
    
    if (serverPayload.event === 'EMOTION_FRAME_ANALYSIS') {
      currentEmotion.value = serverPayload.emotion
      
      if (analyticsLog[serverPayload.emotion] !== undefined) {
        analyticsLog[serverPayload.emotion]++
        analyticsLog.totalTicks++
      }

      if (serverPayload.triggerWarning) {
        showWarning.value = true
        warningMessage.value = serverPayload.warningContext
      } else {
        showWarning.value = false
      }
    }

    if (serverPayload.event === 'QUESTION_TRIGGER') {
      currentQuestion.value = serverPayload.text
      questionIndex.value = serverPayload.index
      totalQuestions.value = serverPayload.total
    }
  }

  socket.onerror = (error) => console.error('소켓 파이프라인 오류:', error)
}

// 3. 논문 스펙에 명시된 6 FPS 주기 백엔드 이미지 전송 파이프라인
const startFrameTransmission = () => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  imageStreamingInterval = setInterval(() => {
    if (!videoRef.value || !socket || socket.readyState !== WebSocket.OPEN) return

    if (canvas.width !== videoRef.value.videoWidth) {
      canvas.width = videoRef.value.videoWidth / 2 
      canvas.height = videoRef.value.videoHeight / 2
    }

    ctx.drawImage(videoRef.value, 0, 0, canvas.width, canvas.height)
    const compressedBase64Frame = canvas.toDataURL('image/jpeg', 0.5) 

    socket.send(JSON.stringify({
      event: 'INCOMING_FRAME',
      binaryFrame: compressedBase64Frame
    }))
  }, 1000 / 6) 
}

// 4. 다음 질문 넘어가기 컨트롤 인터랙션 (프론트 단독 작동 로직 추가)
const requestNextQuestion = () => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify({ event: 'REQUEST_NEXT_QUESTION' }))
  } else {
    // 백엔드 연결 없이 테스트할 때 작동하는 로직
    if (questionIndex.value < totalQuestions.value) {
      questionIndex.value++
      currentQuestion.value = `(${questionIndex.value}번째 질문) 백엔드 연동 전 임시 질문입니다. 답변을 계속해주세요.`
    } else {
      alert('모든 질문이 끝났습니다. 우측 상단의 [면접 종료] 버튼을 눌러주세요!')
    }
  }
}

// 5. 모의 면접 세션 종료 처리 및 통계 가공 알고리즘 (안전 보정 추가)
const finishInterview = () => {
  isModalOpen.value = true // 강제로 무조건 팝업 오픈

  try {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ event: 'END_SESSION' }))
    }

    if (analyticsLog.totalTicks > 0) {
      finalScores.value.stable = Math.round((analyticsLog.Stable / analyticsLog.totalTicks) * 100)
      finalScores.value.nervous = Math.round((analyticsLog.Nervous / analyticsLog.totalTicks) * 100)
      finalScores.value.neutral = Math.round((analyticsLog.Neutral / analyticsLog.totalTicks) * 100)
    } else {
      // 데이터 없을 때 더미 점수
      finalScores.value = { stable: 75, nervous: 15, neutral: 10 }
    }

    if (finalScores.value.stable >= 70) {
      aiFeedbackComment.value = '전반적으로 시선 고정이 매우 안정적(Stable)이고 감정 변동 폭이 낮아 면접관에게 신뢰감을 주는 모범적인 태도를 보여주었습니다. 실전에서도 이 페이스를 유지하세요!'
    } else if (finalScores.value.nervous >= finalScores.value.stable) {
      aiFeedbackComment.value = '질문 답변 구간별 긴장(Nervous) 감지 패턴이 지배적입니다. 모니터 시선 이탈률이 다소 빈번하니, 답변 중 어깨의 긴장도를 낮추고 카메라 정면 응시율을 높이는 보완 연습을 추천합니다.'
    } else {
      aiFeedbackComment.value = '안정적인 밸런스를 유지했으나 표정에 감정 변화가 거의 없는 무표정(Neutral) 빈도가 높습니다. 첫인상 브리핑과 마지막 발언 시에는 엷은 미소를 곁들이면 훨씬 더 긍정적인 인상을 심어줄 수 있습니다.'
    }
  } catch (error) {
    console.error("통계 연산 중 오류 발생:", error)
    finalScores.value = { stable: 82, nervous: 12, neutral: 6 }
    aiFeedbackComment.value = '데이터 처리 중 오류가 발생하여 기본 리포트를 출력합니다.'
  }
}

// --- 라이프사이클 훅 리소스 제어 처리 ---
onMounted(async () => {
  timerInterval = setInterval(() => timerSeconds.value++, 1000)
  await initCameraStream()
  initWebSocketPipeline()
})

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval)
  if (imageStreamingInterval) clearInterval(imageStreamingInterval)
  if (localStream) localStream.getTracks().forEach(track => track.stop())
  if (socket) socket.close()
})
</script>