import { getAll, saveOrUpdate } from '@/api/menu';
import type { MenuItem, CreateOrEditMenu } from '@/api/menu';

export function useMenu() {
    // 获取一级菜单

    const allMenu = ref<MenuItem[]>();

    // 表单响应数据
    const form = ref<CreateOrEditMenu>({
        name: '',
        href: '',
        parentId: -1,
        description: '',
        icon: '',
        shown: true,
        orderNum: 0
    });


    // 表单提交事件
    const onSubmit = async () => {
        const res = await saveOrUpdate(form.value);
        console.log(res);

    };

    const getMenuAll = async () => {
        const { data } = await getAll();
        if (data.code === '000000') {
            allMenu.value = data.data;

        } else {
            ElMessage.error('获取菜单失败')
            throw new Error('获取菜单失败');
        };
    };
    return { allMenu, getMenuAll, onSubmit, form }
};