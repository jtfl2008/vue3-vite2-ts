<template>
  <div class="login-container">
    <el-form ref="formRef" :model="user" :rules="formRules">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="user.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="user.password" type="password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script name="Index" setup lang="ts">
  import { login } from '@/api/login'
  import type { FormInstance, FormRules } from 'element-plus'

  let formRef = $ref<FormInstance | null>(null)
  let user = $ref({
    username: 'admin',
    password: 'e10adc3949ba59abbe56e057f20f883e',
  })
  let formRules = $ref<FormRules>({
    username: [
      {
        required: true,
        message: '请输入用户名',
        trigger: 'blur',
      },
    ],
    password: [
      {
        required: true,
        message: '请输入密码',
        trigger: 'blur',
      },
    ],
  })
  let router = useRouter()
  let onSubmit = async () => {
    let valid = await formRef?.validate()

    if (valid) {
      let params = {
        username: user.username,
        password: user.password,
      }
      let data = await login(params)
      if (!data) return
      router.replace({ name: 'About' })
    }
  }
</script>

<!-- <style scoped></style> -->
