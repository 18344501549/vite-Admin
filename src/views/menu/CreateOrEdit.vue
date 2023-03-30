<script setup lang='ts'>
import { useMenu } from '@/composables/useMenu';


const { allMenu, getMenuAll, onSubmit, form } = useMenu();
getMenuAll();


const topMenus = computed(() => {
    return allMenu.value?.filter((menu) => menu.level === 0);
});

</script>

<template>
    <el-card>
        <el-form :model="form" label-width="120px">
            <el-form-item label="菜单名称" size="large">
                <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="菜单路径">
                <el-input v-model="form.href" />
            </el-form-item>
            <el-form-item label="上级菜单">
                <el-select v-model="form.parentId" placeholder="please select your zone">
                    <el-option label="顶层菜单" :value="-1" />
                    <el-option v-for="menu in topMenus" :key="menu.id" :label="menu.name" :value="menu.id" />
                </el-select>
            </el-form-item>
            <el-form-item label="描述">
                <el-input v-model="form.description" />
            </el-form-item>
            <el-form-item label="图标名称">
                <el-input v-model="form.icon" />
            </el-form-item>
            <el-form-item label="是否显示">
                <el-radio-group v-model="form.shown">
                    <el-radio :label="true">是</el-radio>
                    <el-radio :label="false">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="排序">
                <el-input v-model="form.orderNum" />
            </el-form-item>
            <el-form-item>

                <el-button type="primary" @click="onSubmit">创建</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<style scoped lang='scss'>
.el-form {
    // background-color: #fff;
    padding: 70px;
}
</style>

