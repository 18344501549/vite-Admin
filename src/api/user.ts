import { useMenuStoreHook } from "@/stores/token";
import request from "@/utils/request";

const store = useMenuStoreHook();

type LoginInfo = {
    phone: string;
    code?: string;
    password: string;
};


export type Content = {
    isUpdatePassword: boolean;
    portrait: string;
    userName: string
};


type userInfo<T> = {
    success: boolean;
    state: number;
    message: string;
    content: T
};


type LoginResult = {
    success: boolean;
    state: number;
    message: string;
    content: string
};

// 登陆
export const login = (loginFrom: LoginInfo) => {
    return request<LoginResult>({
        method: 'POST',
        url: '/user/login',
        data: `phone=${loginFrom.phone}&password=${loginFrom.password}`
    });
};


// 获取用户信息
export const getInfo = () => {
    return request<userInfo<Content>>({
        method: 'GET',
        url: '/user/getInfo',
    });
};

// 退出登陆
export const logout = () => {
    return request({
        method: 'POST',
        url: '/user/logout',
    });
};

let promiseRT: Promise<any>;

let isRefreshing: boolean = false;

// 刷新token
export const refreshToken = () => {
    if (isRefreshing) {
        return promiseRT;
    };
    isRefreshing = true;
    promiseRT = request<LoginResult>({
        method: 'POST',
        url: '/user/refresh_token',
        params: {
            refreshToken: store.token.refresh_token
        }
    }).finally(() => {
        isRefreshing = false;
    });
    return promiseRT;
};