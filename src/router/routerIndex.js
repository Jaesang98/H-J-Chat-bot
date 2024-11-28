// import { createWebHashHistory, createRouter } from "vue-router";
import { createWebHistory, createRouter } from "vue-router";

//라우터들 임포트
import mainRoutes from "./routes/mainRouter";

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: [
        // Default Path 설정
        {
            path: '/',
            redirect: '/hjBot',
        },

        ...mainRoutes,


        // 404 Path 처리
        {
            path: '/:pathMatch(.*)*',
            redirect: '/hjBot', // 선언되지 않은 Path릂 지정된 경로로 리다이렉트
        },
    ]
});
/* eslint-disable */
const isValidRandomCode = (randomCode) => {
    // 여기에 랜덤 코드의 유효성 검사 로직을 추가
    // 예를 들어:
    // 1. 특정 길이 체크
    // 2. 특정 패턴 매칭
    // 3. 허용된 문자 집합 체크 등
    
    // UUID 형식 체크 예시
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(randomCode);
};

// 네비게이션 가드 추가
router.beforeEach((to, from, next) => {
    if (to.name === 'hjBot') {
        const randomCode = to.params.randomCode;

        // 랜덤 코드가 없으면 main0001으로 리다이렉트
        if (!randomCode) {
            next('/hjBot');
            return;
        }

        // 유효한 randomCode가 아니면 main0001으로 리다이렉트
        if (randomCode && !isValidRandomCode(randomCode)) {
            next('/hjBot');
            return;
        }
    }

    next();
});


export default router;