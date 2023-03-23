
import { useMenuStoreHook } from '@/stores/token';
import router from './index';

export function permit() {
    router.beforeEach((to: any, from: any, next: Function) => {
        const store = useMenuStoreHook();
        if (store.token.access_token) {
            next();
        } else {
            if (to.path === '/login') {
                next();
            } else {
                next('/login');
            };
        }
    });
};



