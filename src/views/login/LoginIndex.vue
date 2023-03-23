<script setup lang='ts'>
import type { FormInstance, FormRules } from 'element-plus';
import { login } from '@/api/user';
import { useMenuStoreHook } from '@/stores/token';
import { useRouter } from 'vue-router';

const store = useMenuStoreHook();

const router = useRouter();

const ruleForm = reactive({
    phone: '18201288771',
    password: '111111',
});

const ruleFormRef = ref<FormInstance>();

// const validatePhone = (rule: any, value: string, callback: Function) => {
//     if (value === '') {
//         callback(new Error('手机号码不能为空'));
//     } else {
//         // if (ruleForm.phone !== '') {
//         //     if (!ruleFormRef.value) return
//         //     ruleFormRef.value.validateField('phone', () => null)
//         // }
//         callback();
//     };
// };
// const validatePassword = (rule: any, value: string, callback: Function) => {
//     if (value === '') {
//         callback(new Error('密码不能为空'));
//     } else if (ruleForm.password.length < 3 && ruleForm.password.length > 18) {

//         callback(new Error("密码必须是大于3位数小于18位数的"))
//     } else {
//         callback();
//     };
// };


const isLoading = ref<boolean>(false);

const rules = reactive<FormRules>({
    phone: [{ required: true, message: '电话号码不能为空', trigger: 'blur' }, { pattern: /^1\d{10}$/, message: '手机号码必须是11位数', trigger: 'blur' }],
    password: [{ required: true, message: '密码不能为空', trigger: 'blur' }, { min: 3, max: 18, message: '密码长度需要为6-18位', trigger: 'blur' }],
});

const submitForm = async () => {
    isLoading.value = true;
    await ruleFormRef.value?.validate().catch((err) => {
        ElMessage.error('表单校验失败')
        throw err;
    });


    const data = await login(ruleForm).then(res => {
        if (!res.data.success) {
            ElMessage.error('登陆信息有误');
            isLoading.value = false;
            throw new Error('登陆信息有误');
        };
        return res.data;
    });

    store.saveToken(data.content);

    if (data.success) {
        ElMessage.success('登陆成功');
        router.push('/');
    };

    isLoading.value = false;

};

</script>

<template>
    <div class="login">
        <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-position="top">
            <h2>登陆</h2>
            <el-form-item label="手机号" prop="phone" class="phone">
                <el-input v-model="ruleForm.phone" type="text" autocomplete="off" />
            </el-form-item>
            <el-form-item label="密码" prop="password" label-width="56px" class="password">
                <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item class="btn">
                <el-button type="primary" @click="submitForm()" :loading="isLoading">登陆</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<style scoped lang='scss'>
.login {
    height: 100vh;
    background-color: #ddd;
    display: flex;
    justify-content: center;
    align-items: center;

    .el-form {
        width: 300px;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #fff;
        border-radius: 10px;

        .el-form-item {
            width: 90%;
        }
    }

    .btn {
        width: 100%;

        justify-content: space-between !important;

        .button {
            // display: flex;
            width: 100%;
        }
    }

    .el-button {
        width: 100%;
        margin-top: 20px;
    }
}

.phone {
    margin-top: 15px;
}

.password {
    margin-top: 15px;
}
</style>

