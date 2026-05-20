import { createRouter, createWebHistory } from 'vue-router';

// pages 폴더 안의 컴포넌트들 로드
import SignupView from './pages/SignupView.vue';
import InterviewView from './pages/InterviewView.vue';
import PopupView from './pages/PopupView.vue';
import ReportView from './pages/ReportView.vue';
import HomeView from './pages/HomeView.vue';
import InterviewSetupView from './pages/InterviewSetupView.vue';
import JobSelectView from './pages/JobSelectView.vue';
import MyPageView from './pages/MyPageView.vue';
import OAuthSuccessView from './pages/OAuthSuccessView.vue';
import LoginView from './pages/LoginView.vue';

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  
  { path: '/login', name: 'login', component: LoginView },
  { path: '/oauth-success', name: 'oauth-success', component: OAuthSuccessView },
  { path: '/job-select', name: 'job-select', component: JobSelectView },
  { path: '/interview-setup', name: 'interview-setup', component: InterviewSetupView },
  { path: '/home', name: 'home', component: HomeView },
  { path: '/mypage', name: 'mypage', component: MyPageView },
  { path: '/interview', name: 'interview', component: InterviewView },
  { path: '/popup', name: 'popup', component: PopupView },
  { path: '/signup', name: 'signup', component: SignupView },
  { path: '/report', name: 'report', component: ReportView },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/login'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;