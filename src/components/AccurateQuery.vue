<template>
  <a-form
    ref="formRef"
    name="accurate-search"
    :model="formState"
    @finish="handleFinish"
  >
    <a-row :gutter="24">
      <a-col :span="5">
        <a-form-item has-feedback label="所在省市" name="ssdm">
          <a-input v-model:value="formState.ssdm" />
        </a-form-item>
      </a-col>
      <a-col :span="5">
        <a-form-item has-feedback label="招生单位" name="dwmc">
          <a-input v-model:value="formState.dwmc" />
        </a-form-item>
      </a-col>
      <a-col :span="5">
        <a-form-item has-feedback label="学习方式" name="xxfs">
          <a-input v-model:value="formState.xxfs" />
        </a-form-item>
      </a-col>
      <a-col :span="5">
        <a-form-item has-feedback label="专业名称" name="zymc">
          <a-input v-model:value="formState.zymc" />
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
import { reactive, ref } from 'vue';
import { accurateQuery } from '@/api/query';
import { schoolTag } from '@/utils/filter';

export default {
  setup() {
    const formRef = ref();
    const formState = reactive({
      ssdm: '',
      dwmc: '',
      xxfs: '',
      zymc: '',
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
      const promises = [];

      promises.push(accurateQuery(values, 0));
      promises[0].then((data) => {
        const { pagenation } = data.data.data.vo_list;

        for (let i = 20; i < pagenation.totalCount; i += pagenation.pageCount) {
          promises.push(accurateQuery(values, i));
        }

        Promise.all(promises).then((arr) => {
          const list = [];
          arr.forEach((element) => {
            const { vos } = element.data.data.vo_list;
            for (let i = 0; i < vos.length; i += 1) {
              list.push(vos[i]);
            }
          });
          this.$store.commit(
            'setQueryResult',
            list
              .filter((item) => item.sfmzjybyq === '')
              .map((item) => {
                const tmp = item;
                tmp.zymc = `(${item.zydm}) ${item.zymc}`;
                tmp.tags = schoolTag(item.dwmc);
                return tmp;
              }),
          );
        });
      });
    },
  },
};
</script>
