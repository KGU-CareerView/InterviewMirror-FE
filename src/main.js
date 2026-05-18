import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import './style.css';
import HomePage from './pages/HomePage.vue';
import InterviewPage from './pages/InterviewPage.vue';
import InterviewSetupPage from './pages/InterviewSetupPage.vue';
import JobSelectPage from './pages/JobSelectPage.vue';
import LoginPage from './pages/LoginPage.vue';
import MyPage from './pages/MyPage.vue';
import OauthSuccessPage from './pages/OauthSuccessPage.vue';
import PopupPage from './pages/PopupPage.vue';
import ReportPage from './pages/ReportPage.vue';
import SignupPage from './pages/SignupPage.vue';

const routes = [
  {
    path: '/',
    redirect: '/login.html'
  },
  { path: '/login.html', name: 'login', component: LoginPage },
  { path: '/signup.html', name: 'signup', component: SignupPage },
  { path: '/oauth-success.html', name: 'oauth-success', component: OauthSuccessPage },
  { path: '/job-select.html', name: 'job-select', component: JobSelectPage },
  { path: '/interview-setup.html', name: 'interview-setup', component: InterviewSetupPage },
  { path: '/interview.html', name: 'interview', component: InterviewPage },
  { path: '/popup.html', name: 'popup', component: PopupPage },
  { path: '/home.html', name: 'home', component: HomePage },
  { path: '/mypage.html', name: 'mypage', component: MyPage },
  { path: '/report.html', name: 'report', component: ReportPage },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/login.html'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

createApp(App).use(router).mount('#app');
