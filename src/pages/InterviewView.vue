<template>
  <div class="bg-gray-50 h-screen flex flex-col font-sans overflow-hidden">
    <header
      class="w-full h-16 bg-brandLight/40 flex items-center justify-between px-8 border-b border-brandLight/60 shrink-0"
    >
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-lg bg-brand flex items-center justify-center text-white font-bold">CV</div>
        <h1 class="text-lg font-bold text-gray-800">
          Career-View <span class="text-sm font-normal text-gray-500 ml-2">실시간 모의 면접 진행 중</span>
        </h1>
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
            <svg class="w-4 h-4 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            AI 안면 분석
          </h3>

          <div class="space-y-3 flex-1">
            <div
              :class="[
                'flex items-center justify-between p-3 rounded-xl border transition-all duration-200',
                currentEmotion === 'Stable'
                  ? 'bg-brandLight/30 border-brand/30 ring-1 ring-brand/20'
                  : 'bg-gray-50 border-gray-100 opacity-60',
              ]"
            >
              <span
                :class="[
                  'text-sm',
                  currentEmotion === 'Stable' ? 'font-bold text-brandHover' : 'font-medium text-gray-500',
                ]"
                >Stable (안정)</span
              >
              <span class="relative flex h-3 w-3">
                <span
                  v-if="currentEmotion === 'Stable'"
                  class="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"
                ></span>
                <span
                  :class="[
                    'relative inline-flex rounded-full h-3 w-3',
                    currentEmotion === 'Stable' ? 'bg-brand' : 'bg-gray-300',
                  ]"
                ></span>
              </span>
            </div>

            <div
              :class="[
                'flex items-center justify-between p-3 rounded-xl border transition-all duration-200',
                currentEmotion === 'Neutral'
                  ? 'bg-brandLight/30 border-brand/30 ring-1 ring-brand/20'
                  : 'bg-gray-50 border-gray-100 opacity-60',
              ]"
            >
              <span
                :class="[
                  'text-sm',
                  currentEmotion === 'Neutral' ? 'font-bold text-brandHover' : 'font-medium text-gray-500',
                ]"
                >Neutral (무표정)</span
              >
              <span class="relative flex h-3 w-3">
                <span
                  v-if="currentEmotion === 'Neutral'"
                  class="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"
                ></span>
                <span
                  :class="[
                    'relative inline-flex rounded-full h-3 w-3',
                    currentEmotion === 'Neutral' ? 'bg-brand' : 'bg-gray-300',
                  ]"
                ></span>
              </span>
            </div>

            <div
              :class="[
                'flex items-center justify-between p-3 rounded-xl border transition-all duration-200',
                currentEmotion === 'Nervous'
                  ? 'bg-red-50 border-red-200 ring-1 ring-red-100'
                  : 'bg-gray-50 border-gray-100 opacity-60',
              ]"
            >
              <span
                :class="[
                  'text-sm',
                  currentEmotion === 'Nervous' ? 'font-bold text-red-600' : 'font-medium text-gray-500',
                ]"
                >Nervous (긴장)</span
              >
              <span class="relative flex h-3 w-3">
                <span
                  v-if="currentEmotion === 'Nervous'"
                  class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"
                ></span>
                <span
                  :class="[
                    'relative inline-flex rounded-full h-3 w-3',
                    currentEmotion === 'Nervous' ? 'bg-red-500' : 'bg-gray-300',
                  ]"
                ></span>
              </span>
            </div>
          </div>

          <div
            v-if="showWarning"
            class="mt-4 p-3 bg-yellow-50 text-yellow-700 text-xs font-bold rounded-xl border border-yellow-200 animate-bounce"
          >
            {{ warningMessage }}
          </div>
        </div>
      </aside>

      <section
        class="w-[70%] bg-black rounded-3xl shadow-lg relative overflow-hidden flex flex-col items-center justify-center border-4 border-gray-800"
      >
        <video
          ref="videoRef"
          autoplay
          playsinline
          class="w-full h-full object-cover rounded-2xl transform -scale-x-100"
        ></video>

        <div
          v-if="!isCameraReady"
          class="absolute inset-0 bg-gray-950 text-white flex flex-col items-center justify-center px-8 text-center"
        >
          <div class="w-16 h-16 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center mb-5">
            <svg class="w-8 h-8 text-brandLight" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.8"
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              ></path>
            </svg>
          </div>
          <h2 class="text-xl font-bold mb-2">카메라 없이 진행 중</h2>
          <p class="text-sm text-gray-300 leading-relaxed break-keep">
            질문 답변은 계속 진행할 수 있으며, 실시간 표정 분석만 제외됩니다.
          </p>
        </div>

        <div
          v-if="currentEmotion === 'Nervous'"
          class="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-black/75 text-white px-6 py-3 rounded-full backdrop-blur-md text-sm font-medium border border-white/10 shadow-2xl flex items-center gap-3 animate-fade-in"
        >
          <span class="text-brandLight">💡</span> 심호흡을 하고 편안하게 답변해 보세요.
        </div>
      </section>

      <aside class="w-[15%] flex flex-col gap-4">
        <div class="bg-white p-5 rounded-2xl shadow-sm border border-gray-200 h-full flex flex-col">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-sm font-bold text-gray-700">현재 질문</h3>
            <span class="text-xs font-bold text-brand bg-brandLight/50 px-2 py-1 rounded-md"
              >Q {{ questionIndex }} / {{ totalQuestions }}</span
            >
          </div>

          <div
            class="text-base text-gray-800 font-semibold leading-relaxed flex-1 mt-2 p-4 bg-gray-50 rounded-xl border border-gray-100 break-keep overflow-y-auto"
          >
            {{ currentQuestion }}
          </div>

          <p class="text-xs text-gray-400 text-center mt-4 mb-2">답변을 마치면 아래 버튼을 눌러주세요.</p>

          <button
            @click="handleAnswerButtonClick"
            :disabled="isWaitingForQuestion"
            class="w-full py-4 bg-brand hover:bg-brandHover text-white rounded-xl font-bold transition-colors duration-200 shadow-md flex items-center justify-center gap-2"
            :class="isWaitingForQuestion ? 'opacity-50 cursor-not-allowed' : ''"
          >
            {{ answerButtonLabel }}
            <svg v-if="!isLastQuestion" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"></path>
            </svg>
            <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path>
            </svg>
          </button>
        </div>
      </aside>
    </main>

    <div
      v-if="isCameraPermissionModalOpen && !isModalOpen"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-40 px-4"
    >
      <div class="bg-white rounded-[24px] shadow-2xl w-full max-w-md overflow-hidden">
        <div class="bg-brandLight/40 px-6 py-5 border-b border-brandLight/60 flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-brand flex items-center justify-center text-white shadow-sm">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              ></path>
            </svg>
          </div>
          <div>
            <h2 class="text-lg font-bold text-gray-800">{{ cameraPermissionTitle }}</h2>
            <p class="text-xs text-gray-500 font-medium mt-0.5">실시간 표정 분석을 위한 선택 권한</p>
          </div>
        </div>

        <div class="p-6">
          <p class="text-sm text-gray-600 leading-relaxed break-keep">
            {{ cameraPermissionMessage }}
          </p>

          <div class="mt-5 p-4 rounded-2xl bg-gray-50 border border-gray-100">
            <p class="text-xs font-bold text-gray-700 mb-2">권한 팝업이 보이지 않는 경우</p>
            <p class="text-xs text-gray-500 leading-relaxed break-keep">
              주소창 왼쪽의 사이트 정보 또는 카메라 아이콘을 눌러 카메라 권한을 허용한 뒤 다시 시도해주세요.
            </p>
          </div>
        </div>

        <div class="bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t border-gray-100">
          <button
            @click="continueWithoutCamera"
            class="px-5 py-3 rounded-xl font-bold text-gray-500 bg-white border border-gray-200 hover:bg-gray-50 hover:text-gray-700 transition-colors text-sm"
          >
            카메라 없이 진행
          </button>
          <button
            @click="requestCameraPermission"
            :disabled="isCameraRequesting"
            class="px-5 py-3 rounded-xl font-bold text-white bg-brand hover:bg-brandHover disabled:bg-gray-300 disabled:cursor-not-allowed shadow-md shadow-brand/20 transition-colors text-sm flex items-center gap-2"
          >
            <svg v-if="isCameraRequesting" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
            {{ cameraActionLabel }}
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="isModalOpen"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 transition-opacity"
    >
      <div class="bg-white rounded-[24px] shadow-2xl w-11/12 max-w-2xl overflow-hidden flex flex-col">
        <div class="bg-brandLight/40 px-8 py-6 border-b border-brandLight/60 flex justify-between items-center">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-brand flex items-center justify-center text-white text-xl shadow-sm">
              🎉
            </div>
            <div>
              <h2 class="text-xl font-bold text-gray-800">모의 면접 완료!</h2>
              <p class="text-xs text-gray-500 font-medium mt-0.5">Career-View 분석 통계 스코어</p>
            </div>
          </div>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-600 transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div class="p-8 space-y-8 bg-white">
          <div>
            <h3 class="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
              <svg class="w-5 h-5 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              실시간 분석 집계 결과
            </h3>
            <div class="space-y-4">
              <div>
                <div class="flex justify-between text-sm mb-1.5">
                  <span class="font-bold text-gray-700"
                    >Stable <span class="text-gray-400 font-medium text-xs ml-1">(안정)</span></span
                  >
                  <span class="font-bold text-brand">{{ finalScores.stable }}%</span>
                </div>
                <div class="w-full bg-gray-100 rounded-full h-3">
                  <div
                    class="bg-brand h-3 rounded-full transition-all duration-1000"
                    :style="{ width: finalScores.stable + '%' }"
                  ></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between text-sm mb-1.5">
                  <span class="font-bold text-gray-700"
                    >Nervous <span class="text-gray-400 font-medium text-xs ml-1">(긴장)</span></span
                  >
                  <span class="font-bold text-red-400">{{ finalScores.nervous }}%</span>
                </div>
                <div class="w-full bg-gray-100 rounded-full h-3">
                  <div
                    class="bg-red-400 h-3 rounded-full transition-all duration-1000"
                    :style="{ width: finalScores.nervous + '%' }"
                  ></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between text-sm mb-1.5">
                  <span class="font-bold text-gray-700"
                    >Neutral <span class="text-gray-400 font-medium text-xs ml-1">(무표정)</span></span
                  >
                  <span class="font-bold text-gray-400">{{ finalScores.neutral }}%</span>
                </div>
                <div class="w-full bg-gray-100 rounded-full h-3">
                  <div
                    class="bg-gray-400 h-3 rounded-full transition-all duration-1000"
                    :style="{ width: finalScores.neutral + '%' }"
                  ></div>
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
          <button
            @click="goToHome"
            class="px-6 py-3 rounded-xl font-bold text-gray-500 bg-white border border-gray-200 hover:bg-gray-50 hover:text-gray-700 transition-colors text-sm"
          >
            홈으로 가기
          </button>
          <button
            @click="goToReport"
            class="px-6 py-3 rounded-xl font-bold text-white bg-brand hover:bg-brandHover shadow-md shadow-brand/20 transition-colors text-sm flex items-center gap-2"
          >
            상세 리포트 확인하기
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router"; // 라우터 기능 추가
import {
  FACE_LANDMARKER_MODEL_URL,
  MEDIAPIPE_WASM_URL,
  USE_SOCKJS_TRANSPORT,
  WS_INTERVIEW_PATH,
  webSocketUrl,
} from "../config/env";
import { getInterviewSetting, updateInterviewSessionStatus } from "../api/interview";

const router = useRouter();
const route = useRoute();

const STOMP_NULL = "\u0000";

// --- 인터페이스 리액티브 상태 정의 ---
const isModalOpen = ref(false);
const currentEmotion = ref("Stable");
const showWarning = ref(false);
const warningMessage = ref("");
const isCameraReady = ref(false);
const isCameraRequesting = ref(false);
const isCameraPermissionModalOpen = ref(false);
const cameraPermissionTitle = ref("카메라 권한을 허용할까요?");
const cameraPermissionMessage = ref(
  "실시간 표정 분석을 사용하려면 카메라 권한이 필요합니다. 카메라가 없거나 권한을 허용하지 않아도 질문 답변은 그대로 진행할 수 있습니다.",
);

// 백엔드 연동 전송 질문 필드 데이터 구조체
const currentQuestion = ref("AI 서버로부터 면접 질문을 구성하고 있습니다...");
const questionIndex = ref(1);
const totalQuestions = ref(5);
const isWaitingForQuestion = ref(true);

// 타이머 변수
const timerSeconds = ref(0);
let timerInterval = null;

// 누적 로그 분석용 카운터
const analyticsLog = { Stable: 0, Nervous: 0, Neutral: 0, totalTicks: 0 };
const finalScores = ref({ stable: 0, nervous: 0, neutral: 0 });
const aiFeedbackComment = ref("");

// 하드웨어 미디어 참조 변수
const videoRef = ref(null);
let localStream = null;
let socket = null;
let imageStreamingInterval = null;
let stompSubscriptionSeq = 0;
let stompConnected = false;
let sockJsOpen = false;
let faceLandmarker = null;
let isFaceLandmarkerLoading = false;
let isFrameProcessing = false;
const activeSessionId = ref(String(route.query.sessionId || localStorage.getItem("sessionId") || ""));
const activeUserId = ref(String(localStorage.getItem("userId") || "1"));

// --- 타이머 포맷 계산 필드 ---
const formattedTime = computed(() => {
  const mins = String(Math.floor(timerSeconds.value / 60)).padStart(2, "0");
  const secs = String(timerSeconds.value % 60).padStart(2, "0");
  return `${mins}:${secs}`;
});

const cameraActionLabel = computed(() => {
  if (isCameraRequesting.value) return "권한 요청 중...";
  return isCameraReady.value ? "카메라 연결됨" : "카메라 권한 허용";
});

const isLastQuestion = computed(() => questionIndex.value >= totalQuestions.value);
const answerButtonLabel = computed(() => {
  if (isWaitingForQuestion.value) return "질문 준비 중...";
  return isLastQuestion.value ? "답변 완료 / 결과 보기" : "답변 완료 / 다음";
});

// --- 라우터 화면 이동 함수 ---
const goToHome = () => {
  isModalOpen.value = false;
  router.push("/home");
};

const goToReport = () => {
  isModalOpen.value = false;
  router.push({
    path: "/report",
    query: { sessionId: activeSessionId.value },
  });
};

const closeModal = () => {
  isModalOpen.value = false;
};

const continueWithoutCamera = () => {
  isCameraPermissionModalOpen.value = false;
  isCameraReady.value = false;
  currentQuestion.value = currentQuestion.value || "AI 서버로부터 면접 질문을 구성하고 있습니다...";
};

// --- 핵심 비즈니스 메서드 아키텍처 ---

const getAccessToken = () => localStorage.getItem("accessToken") || "";

const createWebSocketUrl = () => {
  const token = getAccessToken();
  const sockJsServerId = "000";
  const sockJsSessionId = `${Date.now()}${Math.random().toString(36).slice(2)}`;
  const endpointPath = USE_SOCKJS_TRANSPORT
    ? `${WS_INTERVIEW_PATH}/${sockJsServerId}/${sockJsSessionId}/websocket`
    : WS_INTERVIEW_PATH;
  const url = new URL(webSocketUrl(endpointPath));

  // 브라우저 WebSocket은 핸드셰이크에 Authorization 헤더를 직접 실을 수 없습니다.
  // 백엔드가 query token을 허용하지 않더라도 STOMP CONNECT 헤더에도 같은 토큰을 보냅니다.
  if (token) {
    url.searchParams.set("access_token", token);
  }

  return url.toString();
};

const sendStompFrame = (command, headers = {}, body = "") => {
  if (!socket || socket.readyState !== WebSocket.OPEN) return false;

  const headerLines = Object.entries(headers)
    .filter(([, value]) => value !== undefined && value !== null && value !== "")
    .map(([key, value]) => `${key}:${value}`);

  const headerText = headerLines.join("\n");
  const frame = `${command}\n${headerText}\n\n${body}${STOMP_NULL}`;

  socket.send(USE_SOCKJS_TRANSPORT ? JSON.stringify([frame]) : frame);
  return true;
};

const connectStomp = () => {
  const accessToken = getAccessToken();

  sendStompFrame("CONNECT", {
    "accept-version": "1.2",
    "heart-beat": "10000,10000",
    Authorization: accessToken ? `Bearer ${accessToken}` : "",
  });
};

const sendStompJson = (destination, payload) => {
  return sendStompFrame(
    "SEND",
    {
      destination,
      "content-type": "application/json",
    },
    JSON.stringify(payload),
  );
};

const subscribeStompTopic = (destination) => {
  stompSubscriptionSeq += 1;
  sendStompFrame("SUBSCRIBE", {
    id: `sub-${stompSubscriptionSeq}`,
    destination,
  });
};

const parseStompFrame = (rawFrame) => {
  const [headerBlock, ...bodyParts] = rawFrame.split("\n\n");
  const headerLines = headerBlock.split("\n");
  const command = headerLines.shift();
  const headers = {};

  headerLines.forEach((line) => {
    const separatorIndex = line.indexOf(":");
    if (separatorIndex <= 0) return;
    headers[line.slice(0, separatorIndex)] = line.slice(separatorIndex + 1);
  });

  return {
    command,
    headers,
    body: bodyParts.join("\n\n"),
  };
};

const parseJsonSafely = (body) => {
  try {
    return JSON.parse(body);
  } catch (error) {
    console.error("STOMP 메시지 JSON 파싱 실패:", error, body);
    return null;
  }
};

const parseSockJsMessages = (rawMessage) => {
  if (!USE_SOCKJS_TRANSPORT) return [rawMessage];
  if (rawMessage === "o") {
    sockJsOpen = true;
    connectStomp();
    return [];
  }
  if (rawMessage === "h") return [];
  if (rawMessage.startsWith("c")) {
    console.warn("SockJS 연결 종료 프레임:", rawMessage);
    return [];
  }
  if (!rawMessage.startsWith("a")) return [];

  try {
    return JSON.parse(rawMessage.slice(1));
  } catch (error) {
    console.error("SockJS 메시지 파싱 실패:", error, rawMessage);
    return [];
  }
};

const subscribeInterviewTopics = () => {
  const sessionId = activeSessionId.value;

  subscribeStompTopic(`/topic/session/${sessionId}/question`);
  subscribeStompTopic(`/topic/session/${sessionId}/error`);
  subscribeStompTopic(`/topic/realtime/${sessionId}`);
  subscribeStompTopic(`/topic/realtime/${sessionId}/errors`);
  subscribeStompTopic(`/topic/realtime/${sessionId}/completed`);
};

const normalizeEmotionLabel = (label) => {
  const normalizedLabel = String(label || "").toUpperCase();

  if (normalizedLabel === "NERVOUS") return "Nervous";
  if (normalizedLabel === "STABLE") return "Stable";
  return "Neutral";
};

const applyEmotionResult = (label, feedback = "") => {
  const emotion = normalizeEmotionLabel(label);
  currentEmotion.value = emotion;

  if (analyticsLog[emotion] !== undefined) {
    analyticsLog[emotion]++;
    analyticsLog.totalTicks++;
  }

  showWarning.value = Boolean(feedback && emotion === "Nervous");
  warningMessage.value = feedback;
};

const handleQuestionEvent = (payload) => {
  if (payload.type === "INITIAL_QUESTIONS_READY") {
    currentQuestion.value = payload.firstQuestion || payload.questions?.[0]?.question || "첫 질문을 불러왔습니다.";
    questionIndex.value = 1;
    totalQuestions.value = payload.questions?.length || totalQuestions.value;
    isWaitingForQuestion.value = false;
    return;
  }

  if (payload.type === "NEXT_QUESTION") {
    if (questionIndex.value < totalQuestions.value) {
      questionIndex.value += 1;
    }
    currentQuestion.value = payload.question || "다음 질문을 불러왔습니다.";
    isWaitingForQuestion.value = false;
  }
};

const handleErrorEvent = (payload) => {
  showWarning.value = true;
  warningMessage.value = payload.message || "면접 처리 중 오류가 발생했습니다.";
  isWaitingForQuestion.value = false;
};

const handleRealtimeEvent = (payload) => {
  const result = payload.data || payload;
  applyEmotionResult(result.label, result.feedback);
};

const handleStompFrame = (frame) => {
  if (frame.command === "CONNECTED") {
    stompConnected = true;
    console.log("STOMP 면접 채널 연결 완료");
    subscribeInterviewTopics();
    startFrameTransmission();
    return;
  }

  if (frame.command === "ERROR") {
    console.error("STOMP 연결 오류:", frame.body);
    currentQuestion.value = "면접 서버 연결 중 오류가 발생했습니다.";
    return;
  }

  if (frame.command !== "MESSAGE") return;

  const payload = parseJsonSafely(frame.body);
  if (!payload) return;

  const destination = frame.headers.destination || "";

  if (destination.includes("/question")) {
    handleQuestionEvent(payload);
  } else if (destination.includes("/error") || destination.includes("/errors")) {
    handleErrorEvent(payload);
  } else if (destination.includes("/realtime/") && destination.includes("/completed")) {
    console.log("실시간 분석 종료 완료:", payload);
  } else if (destination.includes("/realtime/")) {
    handleRealtimeEvent(payload);
  }
};

const initFaceLandmarker = async () => {
  if (faceLandmarker || isFaceLandmarkerLoading) return faceLandmarker;

  isFaceLandmarkerLoading = true;

  try {
    const vision = await FilesetResolver.forVisionTasks(MEDIAPIPE_WASM_URL);

    const landmarkerOptions = {
      baseOptions: {
        modelAssetPath: FACE_LANDMARKER_MODEL_URL,
        delegate: "GPU",
      },
      runningMode: "VIDEO",
      numFaces: 1,
      outputFaceBlendshapes: true,
    };

    try {
      faceLandmarker = await FaceLandmarker.createFromOptions(vision, landmarkerOptions);
    } catch (gpuError) {
      console.warn("MediaPipe GPU 초기화 실패, CPU로 재시도합니다:", gpuError);
      faceLandmarker = await FaceLandmarker.createFromOptions(vision, {
        ...landmarkerOptions,
        baseOptions: {
          ...landmarkerOptions.baseOptions,
          delegate: "CPU",
        },
      });
    }

    return faceLandmarker;
  } catch (error) {
    console.error("MediaPipe Face Landmarker 초기화 실패:", error);
    showWarning.value = true;
    warningMessage.value = "얼굴 특징점 분석 모델을 불러오지 못했습니다. 면접은 계속 진행됩니다.";
    return null;
  } finally {
    isFaceLandmarkerLoading = false;
  }
};

const flattenFaceLandmarks = (landmarks) => {
  return landmarks.flatMap((point) => [
    Number(point.x.toFixed(6)),
    Number(point.y.toFixed(6)),
    Number(point.z.toFixed(6)),
  ]);
};

const flattenBlendshapes = (blendshapes = []) => {
  return blendshapes.map((category) => Number(category.score.toFixed(6)));
};

const createFaceBoundingBox = (landmarks) => {
  const xs = landmarks.map((point) => point.x);
  const ys = landmarks.map((point) => point.y);
  const videoWidth = videoRef.value?.videoWidth || 1;
  const videoHeight = videoRef.value?.videoHeight || 1;

  return {
    x1: Math.round(Math.min(...xs) * videoWidth),
    y1: Math.round(Math.min(...ys) * videoHeight),
    x2: Math.round(Math.max(...xs) * videoWidth),
    y2: Math.round(Math.max(...ys) * videoHeight),
  };
};

const createFaceFeaturePayload = () => {
  if (!faceLandmarker || !videoRef.value || !videoRef.value.videoWidth || !videoRef.value.videoHeight) {
    return null;
  }

  const result = faceLandmarker.detectForVideo(videoRef.value, performance.now());
  const landmarks = result.faceLandmarks?.[0];

  if (!landmarks?.length) {
    return {
      tensorShape: [1, 1],
      features: [0],
      faceDetected: false,
    };
  }

  const blendshapes = result.faceBlendshapes?.[0]?.categories || [];
  const landmarkFeatures = flattenFaceLandmarks(landmarks);
  const blendshapeFeatures = flattenBlendshapes(blendshapes);
  const features = [...landmarkFeatures, ...blendshapeFeatures];

  return {
    tensorShape: [1, features.length],
    features,
    faceDetected: true,
    bbox: createFaceBoundingBox(landmarks),
  };
};

// 1. 하드웨어 카메라 스트림 활성화 연동
const initCameraStream = async () => {
  if (!navigator.mediaDevices?.getUserMedia) {
    cameraPermissionTitle.value = "카메라를 사용할 수 없습니다";
    cameraPermissionMessage.value =
      "현재 브라우저 또는 접속 환경에서 카메라 권한 요청을 지원하지 않습니다. 실시간 표정 분석만 제외하고 면접은 계속 진행할 수 있습니다.";
    isCameraPermissionModalOpen.value = true;
    return false;
  }

  isCameraRequesting.value = true;

  try {
    localStream = await navigator.mediaDevices.getUserMedia({
      video: { width: 1280, height: 720, frameRate: { ideal: 30 } },
    });
    if (videoRef.value) {
      videoRef.value.srcObject = localStream;
    }
    isCameraReady.value = true;
    isCameraPermissionModalOpen.value = false;
    await initFaceLandmarker();
    return true;
  } catch (err) {
    console.error("웹캠 엑세스 거부 또는 장치 에러:", err);
    isCameraReady.value = false;
    isCameraPermissionModalOpen.value = true;
    cameraPermissionTitle.value =
      err.name === "NotAllowedError" ? "카메라 권한이 차단되었습니다" : "카메라 연결을 확인해주세요";
    cameraPermissionMessage.value =
      err.name === "NotAllowedError"
        ? "브라우저에서 카메라 접근이 거부되었습니다. 카메라 없이 진행하거나, 사이트 설정에서 카메라 권한을 허용한 뒤 다시 시도해주세요."
        : "카메라 장치를 찾을 수 없거나 다른 앱에서 사용 중입니다. 카메라 없이 진행해도 질문 답변은 계속 사용할 수 있습니다.";
    return false;
  } finally {
    isCameraRequesting.value = false;
  }
};

const requestCameraPermission = async () => {
  await initCameraStream();
};

// 2. 백엔드 Spring Boot 웹소켓 및 데이터 파이프라인 연동
const initWebSocketPipeline = () => {
  socket = new WebSocket(createWebSocketUrl());

  socket.onopen = () => {
    if (!USE_SOCKJS_TRANSPORT) {
      connectStomp();
    }
  };

  socket.onmessage = (messageEvent) => {
    if (messageEvent.data === "\n") return;

    parseSockJsMessages(String(messageEvent.data)).forEach((message) => {
      String(message)
        .split(STOMP_NULL)
        .filter((rawFrame) => rawFrame.trim())
        .map(parseStompFrame)
        .forEach(handleStompFrame);
    });
  };

  socket.onerror = (error) => console.error("소켓 파이프라인 오류:", error);
  socket.onclose = (event) => {
    const hadSockJsOpenFrame = sockJsOpen;
    stompConnected = false;
    sockJsOpen = false;
    console.log("면접 WebSocket 연결 종료:", {
      code: event.code,
      reason: event.reason,
      wasClean: event.wasClean,
      hadSockJsOpenFrame,
    });
  };
};

// 3. 논문 스펙에 명시된 6 FPS 주기 백엔드 이미지 전송 파이프라인
const startFrameTransmission = () => {
  if (imageStreamingInterval) clearInterval(imageStreamingInterval);

  imageStreamingInterval = setInterval(async () => {
    if (!videoRef.value || !stompConnected) return;
    if (!isCameraReady.value || !videoRef.value.videoWidth || !videoRef.value.videoHeight) return;
    if (isFrameProcessing) return;

    isFrameProcessing = true;

    try {
      if (!faceLandmarker) {
        await initFaceLandmarker();
      }

      const facePayload = createFaceFeaturePayload();
      if (!facePayload) return;

      sendStompJson("/app/realtime.frames", {
        sessionId: activeSessionId.value,
        userId: activeUserId.value,
        tensorShape: facePayload.tensorShape,
        features: facePayload.features,
        timestamp: Date.now(),
        faceDetected: facePayload.faceDetected,
        bbox: facePayload.bbox,
      });
    } finally {
      isFrameProcessing = false;
    }
  }, 1000 / 6);
};

const submitCurrentAnswer = () => {
  if (stompConnected) {
    isWaitingForQuestion.value = true;
    return sendStompJson("/app/session.answer", {
      sessionId: Number(activeSessionId.value),
      answer: "사용자가 답변을 완료했습니다.",
      emotionResult: String(currentEmotion.value).toUpperCase(),
      responseTimeSeconds: timerSeconds.value,
    });
  }

  return false;
};

// 4. 다음 질문 넘어가기 컨트롤 인터랙션
const requestNextQuestion = () => {
  if (stompConnected) {
    submitCurrentAnswer();
    return;
  }

  showWarning.value = true;
  warningMessage.value = "면접 서버와 연결된 뒤 답변을 제출할 수 있습니다.";
};

const completeInterview = () => {
  submitCurrentAnswer();
  finishInterview({ redirectToReport: true });
};

const handleAnswerButtonClick = () => {
  if (isLastQuestion.value) {
    completeInterview();
    return;
  }

  requestNextQuestion();
};

// 5. 모의 면접 세션 종료 처리 및 통계 가공 알고리즘 (안전 보정 추가)
const finishInterview = ({ redirectToReport = false } = {}) => {
  if (!redirectToReport) {
    isModalOpen.value = true; // 강제로 무조건 팝업 오픈
  }

  try {
    if (stompConnected) {
      sendStompJson("/app/realtime.end", {
        sessionId: activeSessionId.value,
      });
    }

    if (activeSessionId.value) {
      updateInterviewSessionStatus(activeSessionId.value, "ENDED").catch((error) => {
        console.error("면접 종료 상태 변경 실패:", error);
      });
    }

    if (analyticsLog.totalTicks > 0) {
      finalScores.value.stable = Math.round((analyticsLog.Stable / analyticsLog.totalTicks) * 100);
      finalScores.value.nervous = Math.round((analyticsLog.Nervous / analyticsLog.totalTicks) * 100);
      finalScores.value.neutral = Math.round((analyticsLog.Neutral / analyticsLog.totalTicks) * 100);
    } else {
      finalScores.value = { stable: 0, nervous: 0, neutral: 0 };
    }

    if (analyticsLog.totalTicks === 0) {
      aiFeedbackComment.value =
        "실시간 표정 분석 데이터가 아직 충분하지 않습니다. 상세 리포트가 준비되면 서버 분석 결과를 확인해주세요.";
    } else if (finalScores.value.stable >= 70) {
      aiFeedbackComment.value =
        "전반적으로 시선 고정이 매우 안정적(Stable)이고 감정 변동 폭이 낮아 면접관에게 신뢰감을 주는 모범적인 태도를 보여주었습니다. 실전에서도 이 페이스를 유지하세요!";
    } else if (finalScores.value.nervous >= finalScores.value.stable) {
      aiFeedbackComment.value =
        "질문 답변 구간별 긴장(Nervous) 감지 패턴이 지배적입니다. 모니터 시선 이탈률이 다소 빈번하니, 답변 중 어깨의 긴장도를 낮추고 카메라 정면 응시율을 높이는 보완 연습을 추천합니다.";
    } else {
      aiFeedbackComment.value =
        "안정적인 밸런스를 유지했으나 표정에 감정 변화가 거의 없는 무표정(Neutral) 빈도가 높습니다. 첫인상 브리핑과 마지막 발언 시에는 엷은 미소를 곁들이면 훨씬 더 긍정적인 인상을 심어줄 수 있습니다.";
    }
  } catch (error) {
    console.error("통계 연산 중 오류 발생:", error);
    finalScores.value = { stable: 82, nervous: 12, neutral: 6 };
    aiFeedbackComment.value = "데이터 처리 중 오류가 발생하여 기본 리포트를 출력합니다.";
  }

  if (redirectToReport) {
    goToReport();
  }
};

const hydrateInterviewSetting = async () => {
  if (!activeSessionId.value) return;

  try {
    const setting = await getInterviewSetting(activeSessionId.value);
    if (setting?.questionCount) {
      totalQuestions.value = setting.questionCount;
    }
  } catch (error) {
    console.warn("면접 설정 조회 실패:", error);
  }
};

// --- 라이프사이클 훅 리소스 제어 처리 ---
onMounted(async () => {
  if (!activeSessionId.value) {
    currentQuestion.value = "면접 세션 정보가 없습니다. 설정 화면에서 다시 시작해주세요.";
    isWaitingForQuestion.value = true;
    return;
  }

  await hydrateInterviewSetting();
  timerInterval = setInterval(() => timerSeconds.value++, 1000);
  isCameraPermissionModalOpen.value = true;
  initWebSocketPipeline();
});

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval);
  if (imageStreamingInterval) clearInterval(imageStreamingInterval);
  if (localStream) localStream.getTracks().forEach((track) => track.stop());
  if (faceLandmarker) faceLandmarker.close();
  if (socket) socket.close();
});
</script>
