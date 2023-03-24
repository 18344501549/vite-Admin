<script setup lang='ts'>
import { getAll } from '@/api/menu';
import type { MenuItem } from '@/api/menu';

// 获取一级菜单

const allMenu = ref<MenuItem[]>();


const getMenuAll = async () => {
    const { data } = await getAll();
    if (data.code === '000000') {
        allMenu.value = data.data;

    } else {
        ElMessage.error('获取菜单失败')
        throw new Error('获取菜单失败');
    };
    console.log(allMenu.value);
};

getMenuAll();


const topMenus = computed(() => {
    return allMenu.value?.filter((menu) => {
        console.log(menu);

    })
})
console.log(topMenus.value);



// 过滤出一级菜单

</script>

<template>
    <h1>创建或编辑</h1>
</template>

<style scoped lang='scss'></style>

