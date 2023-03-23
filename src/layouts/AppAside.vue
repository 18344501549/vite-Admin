<script setup lang='ts'>
import { useTokenStore } from "@/stores/token";

const token = useTokenStore();

</script>

<template>
    <el-aside>
        <el-scrollbar>
            <el-menu router :collapse="token.isCollapse">
                <a href="/" class="logo">
                    <img src="@/assets/logo.webp">
                    <h1>鼬神</h1>
                </a>
                <el-sub-menu index="1">
                    <template #title>
                        <el-icon>
                            <IEpSetting />
                        </el-icon>
                        <span>权限管理</span>
                    </template>
                    <el-menu-item index="">
                        <el-icon>
                            <IEpSetting />
                        </el-icon>
                        <span>角色列表</span>
                    </el-menu-item>
                    <el-menu-item index="">
                        <el-icon>
                            <IEpSetting />
                        </el-icon>
                        <span>菜单列表</span>
                    </el-menu-item>
                    <el-menu-item index="">
                        <el-icon>
                            <IEpSetting />
                        </el-icon>
                        <span>资源列表</span>
                    </el-menu-item>
                </el-sub-menu>

                <el-menu-item index="2">
                    <el-icon>
                        <IEpSetting />
                    </el-icon>
                    <span>用户管理</span>
                </el-menu-item>

                <el-menu-item index="3">
                    <el-icon>
                        <IEpSetting />
                    </el-icon>
                    <span>课程管理</span>
                </el-menu-item>

                <el-sub-menu index="4">
                    <template #title>
                        <el-icon>
                            <IEpSetting />
                        </el-icon>
                        <span>广告管理</span>
                    </template>
                    <el-menu-item index="">
                        <el-icon>
                            <IEpSetting />
                        </el-icon>
                        <span>广告列表</span>
                    </el-menu-item>
                </el-sub-menu>

            </el-menu>
        </el-scrollbar>
    </el-aside>
</template>

<style scoped lang='scss'>
.el-aside {
    background-color: #eee;
    height: 100vh;
    width: auto;
}

.el-menu {
    background-color: #eee;
    width: 200px;
    border-right: none;

    & .el-menu--collapse {
        width: 60px;

        & h1 {
            display: none !important;
        }
    }


}

.logo {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    text-decoration: none;
    color: black;

    img {
        width: 40px;
        height: 40px;
        border-radius: 50%;

    }

    & h1 {
        margin-left: 20px;
    }

}
</style>

