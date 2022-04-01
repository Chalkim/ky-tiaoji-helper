<template>
  <a-row justify="center">
    <a-col>
    <a-typography-title>学信网账号登录</a-typography-title>
    </a-col>
  </a-row>
  <a-form
    :model="formState"
    name="login"
    class="login-form"
    labelAlign="left"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
    v-bind="formItemLayout"
  >
    <a-form-item
      label="用户名"
      name="username"
      :rules="[{ required: true, message: '请输入用户名!' }]"
    >
      <a-input v-model:value="formState.username">
        <template #prefix>
          <UserOutlined class="site-form-item-icon" />
        </template>
      </a-input>
    </a-form-item>

    <a-form-item
      label="密码"
      name="password"
      :rules="[{ required: true, message: '请输入密码!' }]"
    >
      <a-input-password v-model:value="formState.password">
        <template #prefix>
          <LockOutlined class="site-form-item-icon" />
        </template>
      </a-input-password>
    </a-form-item>

    <a-row justify="space-between">
      <a-col :span="8">
        <a-form-item name="remember" no-style>
          <a-checkbox v-model:checked="formState.remember">记住密码</a-checkbox>
        </a-form-item>
        </a-col>
      <a-col>
        <a-form-item>
          <a-button :disabled="disabled"
            type="primary"
            html-type="submit"
            class="login-form-button"
          >
            登录
          </a-button>
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>
<script>
import { defineComponent, reactive, computed } from 'vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { login } from '@/api/auth';

export default defineComponent({
  components: {
    UserOutlined,
    LockOutlined,
  },

  setup() {
    const formState = reactive({
      username: '',
      password: '',
      remember: true,
    });

    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };

    const onFinish = (values) => {
      console.log('Success:', values);
      login({
        username: values.username,
        password: values.password,
      });
    };

    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };

    const disabled = computed(() => !(formState.username && formState.password));

    return {
      formState,
      formItemLayout,
      onFinish,
      onFinishFailed,
      disabled,
    };
  },
});
</script>
