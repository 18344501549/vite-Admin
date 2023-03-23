<script setup lang='ts'>
import { useMenuStoreHook } from "@/stores/token";
import { getInfo, logout } from '@/api/user';
import { useRouter } from "vue-router";
const router = useRouter();
const token = useMenuStoreHook();
// import { Content } from '@/api/user';
const userInfo = ref({ portrait: '', userName: '' });

getInfo().then(res => {
    userInfo.value = res.data.content;
});



const handleLogout = async () => {
    // 询问
    await ElMessageBox.confirm('确认退出吗?', '退出询问', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
    }).catch(() => {
        ElMessage.info('取消退出操作');
        return new Promise(() => { })
    });

    await logout().catch(() => { })
    ElMessage.success('用户成功退出');
    // 清空token 
    token.saveToken('');
    localStorage.removeItem('tokenInfo');
    router.push({ name: 'loginIndex' });
};

</script>

<template>
    <el-header class="header">
        <div class="icon-bcrumb">
            <!-- 图标 -->
            <el-icon @click="token.isCol()" class="i-ep-ef">
                <IEpExpand v-if="token.isCollapse" />
                <IEpFold v-else />
            </el-icon>
            <!-- 面包屑 -->
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item><a></a></el-breadcrumb-item>

            </el-breadcrumb>
        </div>
        <!-- 下拉菜单 -->

        <el-dropdown>
            <span class="el-dropdown-link">
                <el-avatar :size="32" :src="userInfo.portrait" />
                <el-icon class="el-icon--right">
                    <IEpArrowDown />
                </el-icon>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item divided>{{ userInfo.userName }}</el-dropdown-item>
                    <el-dropdown-item @click="handleLogout" divided>退出</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>

    </el-header>
</template>

<style scoped lang='scss'>
.el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.i-ep-ef {
    font-size: 30px;
    cursor: pointer;
}

.icon-bcrumb {
    display: flex;
    align-items: center;
}

.el-breadcrumb {
    margin-left: 20px;
}

.el-dropdown-link {
    display: flex;
    align-items: center;
}

.example-showcase .el-dropdown-link {
    cursor: pointer;
    color: var(--el-color-primary);
    display: flex;
    align-items: center;
}
</style>

