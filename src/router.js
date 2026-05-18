import { createRouter, createWebHistory } from 'vue-router';

// pages 폴더 안의 컴포넌트들 로드
import LoginPage from './pages/LoginPage.vue';
import SignupPage from './pages/SignupPage.vue';
import OauthSuccessPage from './pages/OauthSuccessPage.vue';
import JobSelectPage from './pages/JobSelectPage.vue';
import InterviewSetupPage from './pages/InterviewSetupPage.vue';
import InterviewPage from './pages/InterviewPage.vue';
import PopupPage from './pages/PopupPage.vue';
import HomePage from './pages/HomePage.vue';
import MyPage from './pages/MyPage.vue';
import ReportPage from './pages/ReportPage.vue';

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  { path: '/login', name: 'login', component: LoginPage },
  { path: '/signup', name: 'signup', component: SignupPage },
  { path: '/oauth-success', name: 'oauth-success', component: OauthSuccessPage },
  { path: '/job-select', name: 'job-select', component: JobSelectPage },
  { path: '/interview-setup', name: 'interview-setup', component: InterviewSetupPage },
  { path: '/interview', name: 'interview', component: InterviewPage },
  { path: '/popup', name: 'popup', component: PopupPage },
  { path: '/home', name: 'home', component: HomePage },
  { path: '/mypage', name: 'mypage', component: MyPage },
  { path: '/report', name: 'report', component: ReportPage },
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