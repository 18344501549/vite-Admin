import { refreshToken } from './../api/user';
import axios, { type AxiosRequestHeaders } from 'axios';
import { useMenuStoreHook } from '@/stores/token';
import router from '@/router/index';
const store = useMenuStoreHook();




const baseURL = import.meta.env.VITE_API_BASEURL;

const request = axios.create({
    baseURL,
    timeout: 1000,
    // headers: { 'X-Custom-Header': 'foobar' }
});




// 添加请求拦截器
request.interceptors.request.use((config) => {
    // 在发送请求之前做些什么
    if (!config.headers) {
        config.headers = {} as AxiosRequestHeaders
    };
    config.headers = { Authorization: store.token.access_token } as AxiosRequestHeaders;
    return config;
}, (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
request.interceptors.response.use((response) => {
    // 对响应数据做点什么
    return response;
}, async (error) => {
    if (error.response.status === 401) {
        const { data } = await refreshToken();
        if (data.success) {
            // 保存新token
            store.saveToken(data.content);
            // 重新请求之前接口,并且把结果返回
            return request(error.config);
        } else {
            // 跳转到login
            ElMessage.error('刷新token失败,需要重新登录!');
            store.saveToken('');
            router.push({ name: 'loginIndex' });
            return;
        };
    };
    // 对响应错误做点什么
    return Promise.reject(error);
});



export default request;