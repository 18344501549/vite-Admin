<script setup lang='ts'>
import { useRouter } from 'vue-router';
import { useMenu } from '@/composables/useMenu';

const router = useRouter();

const { allMenu, getMenuAll } = useMenu();
getMenuAll();




</script>

<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <el-button class="btn" text @click="router.push({ name: 'menu-create' })">添加菜单</el-button>
            </div>
        </template>
        <el-table :data="allMenu" border style="width: 100%" class="text item">
            <el-table-column type="index" label="编号" width="80" align="center" />
            <el-table-column prop="name" label="菜单名称" align="center" />
            <el-table-column prop="level" label="菜单层级" align="center" />
            <el-table-column prop="icon" label="菜单图标" align="center" />
            <el-table-column prop="orderNum" label="排序" align="center" />
            <el-table-column label="操作" align="center">
                <el-button class="btn" link type="primary" size="small">编辑</el-button>
                <el-button class="btn" link type="primary" size="small">删除</el-button>
            </el-table-column>
        </el-table>
    </el-card>
</template>

<style scoped lang='scss'>
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.text {
    font-style: 14px;
}

.item {
    margin-bottom: 18px;
}

.box-card {
    width: 100%;
}
</style>

