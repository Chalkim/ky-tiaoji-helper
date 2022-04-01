<template>
  <a-form
    ref="formRef"
    name="accurate-search"
    :model="formState"
    @finish="handleFinish"
  >
    <a-row :gutter="24">
      <a-col :span="6">
        <a-form-item has-feedback label="所在省市" name="ssdm2">
          <a-input v-model:value="formState.ssdm2" />
        </a-form-item>
      </a-col>
      <a-col :span="6">
        <a-form-item has-feedback label="学习方式" name="xxfs2">
          <a-input v-model:value="formState.xxfs2" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item has-feedback label="模糊查询" name="dwmc2">
          <a-input v-model:value="formState.dwmc2" />
        </a-form-item>
      </a-col>
      <a-col :span="4" style="text-align: center">
        <a-form-item>
          <a-button type="primary" html-type="submit">查询</a-button>
          <a-button style="margin-left: 10px" @click="handleResetForm">清空</a-button>
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';
import { fuzzyQuery } from '@/api/query';
import { schoolTag } from '@/utils/filter';
import { message } from 'ant-design-vue';

export default defineComponent({
  setup() {
    const formRef = ref();
    const formState = reactive({
      ssdm2: '',
      xxfs2: '',
      dwmc2: '',
    });

    const handleResetForm = () => {
      formRef.value.resetFields();
    };

    return {
      formState,
      formRef,
      handleResetForm,
    };
  },
  methods: {
    handleFinish(values) {
      const key = 'updatable';
      message.loading({
        content: '加载中...',
        key,
        duration: 15,
      });

      const promises = [];

      promises.push(fuzzyQuery(values, 0));
      promises[0].then((data) => {
        const { pagenation } = data.data.data.vo_list;

        for (let i = 20; i < pagenation.totalCount; i += pagenation.pageCount) {
          promises.push(fuzzyQuery(values, i));
        }

        Promise.all(promises).then((arr) => {
          const list = [];
          arr.forEach((element) => {
            const { vos } = element.data.data.vo_list;
            for (let i = 0; i < vos.length; i += 1) {
              list.push(vos[i]);
            }
          });
          this.$store.commit('setList', list.map((item) => {
            const tmp = item;
            tmp.zymc = `(${item.zydm}) ${item.zymc}`;
            tmp.tags = schoolTag(item.dwmc);
            return tmp;
          }));
        }).then(() => {
          message.success({
            content: '查询成功！',
            key,
            duration: 0.5,
          });
        }).catch(() => {
          message.error({
            content: '发生错误或需要登录！',
            key,
            duration: 2,
          });
        });
      }).catch(() => {
        message.error({
          content: '发生错误或需要登录！',
          key,
          duration: 2,
        });
      });
    },
  },
});
</script>
