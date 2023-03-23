<script setup lang='ts'>
import AppAside from './AppAside.vue';
import AppHeader from './AppHeader.vue';

</script>

<template>
    <div class="common-layout">
        <el-container>
            <AppAside />
            <el-container class="header-admin">
                <AppHeader />
                <el-main>
                    <el-scrollbar>
                        <RouterView />
                    </el-scrollbar>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<style scoped lang='scss'>
.header-admin {
    height: 100vh;
    flex-direction: column;
}
</style>



