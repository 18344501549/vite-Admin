import { defineStore } from 'pinia';
import pinia from '@/utils/permission';

type Token = {
    access_token: string;
    token_type: string;
    refresh_token: string;
    expires_in: string;
    user_id: string;
};


// type tokenInfo = {
//     access_token: string;
//     expires_in: number;
//     jti: string;
//     organization: string;
//     refresh_token: string;
//     scope: string
//     token_type: string
//     user_id: string
// };


export const useTokenStore = defineStore('myToken', () => {
    const tokenJson = ref<string>('');

    const isCollapse = ref(false);

    const token = computed<Token>(() => {
        try {
            return JSON.parse(tokenJson.value || localStorage.getItem('tokenInfo') || "{}");

        } catch (err) {
            ElMessage.error('JSON格式错误');
            localStorage.setItem('tokenInfo', '');
            throw err;
        };
    });
    // function 相当于axios
    const saveToken = (data: string) => {
        tokenJson.value = data;
        localStorage.setItem('tokenInfo', data);
    };

    function isCol() {
        return isCollapse.value = !isCollapse.value;
    };

    return { token, saveToken, tokenJson, isCol, isCollapse };
});


// setup 外使用 需要传入store
export function useMenuStoreHook() {
    return useTokenStore(pinia);
};