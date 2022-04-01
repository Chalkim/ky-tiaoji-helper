<template>
  <a-table
    :columns="columns"
    :data-source="this.$store.state.list"
    :pagination="{ pageSize: 20 }"
    bordered
    size="middle"
    @change="handleChange"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'dwmc'">
        <a-typography-link @click="openURL(`https://yz.chsi.com.cn/sch/tjzc--method-listTjPub,yxdm-${record.dwdm}.dhtml`)">
          {{ record.dwmc }}
        </a-typography-link>
        <template v-if="record.tags.length != 0">
          <a-divider dashed style="margin: 5px 0"/>
          <a-tag
            v-for="tag in record.tags"
            :key="tag"
            :color="tag === '985' ? 'volcano' :
            tag === '211' ? 'geekblue' :
            tag === '双一流' ? 'green' : 'purple'"
          >
            {{ tag }}
          </a-tag>
        </template>
      </template>
      <template v-else-if="column.key === 'bz'">
        <template v-if="record.bz !== ''">
          <a-popover title="备注" :overlayStyle="{maxWidth:'250px'}">
            <template #content>
              {{ record.bz }}
            </template>
            <a-button>备注</a-button>
          </a-popover>
        </template>
        <template v-if="record.bz === ''">
          -
        </template>
      </template>
      <template v-else-if="column.key === 'id'">
        <span v-if="record.sfmzjybyq === ''">
          <a-button type="primary" @click="openURL('https://yz.chsi.com.cn/sytj/tjyx/tbtjzy.html?&id='+ record.id)">填报</a-button>
        </span>
        <span v-if="record.sfmzjybyq != ''">
          {{ record.sfmzjybyq }}
        </span>
      </template>
    </template>
  </a-table>
</template>
<script>
import { computed, ref } from 'vue';
import { schoolFilter } from '@/utils/filter';

export default {
  setup() {
    const filteredInfo = ref();

    const columns = computed(() => {
      const filtered = filteredInfo.value || {};
      return [
        {
          title: '招生单位',
          key: 'dwmc',
          dataIndex: 'dwmc',
          align: 'center',
          width: 170,
          filters: [{
            text: '985',
            value: 's985',
          }, {
            text: '211',
            value: 's211',
          }, {
            text: '双一流',
            value: 'ssyl',
          }, {
            text: '兴趣',
            value: 'sxq',
          }],
          filteredValue: filtered.dwmc || null,
          onFilter: (value, record) => schoolFilter(value, record.dwmc),
        },
        {
          title: '院系所',
          key: 'yxsmc',
          dataIndex: 'yxsmc',
          align: 'center',
          width: 120,
        },
        {
          title: '专业',
          key: 'zymc',
          dataIndex: 'zymc',
          align: 'center',
          width: 200,
        },
        {
          title: '研究方向',
          key: 'yjfxmc',
          dataIndex: 'yjfxmc',
          align: 'center',
          width: 100,
        },
        {
          title: '学习方式',
          key: 'xxfs',
          dataIndex: 'xxfs',
          align: 'center',
          width: 75,
          customRender: (state) => {
            switch (state.text) {
              case '1':
                return '全日制';
              case '2':
                return '非全日制';
              default:
                return '未知';
            }
          },
          filters: [{
            text: '全日制',
            value: '1',
          }, {
            text: '非全日制',
            value: '2',
          }],
          filteredValue: filtered.xxfs || null,
          onFilter: (value, record) => record.xxfs.includes(value),
        },
        {
          title: '发布时间',
          key: 'fbsjStr',
          dataIndex: 'fbsjStr',
          align: 'center',
          width: 150,
        },
        {
          title: '特殊说明',
          key: 'bz',
          dataIndex: 'bz',
          align: 'center',
          width: 75,
        },
        {
          title: '操作',
          key: 'id',
          dataIndex: 'id',
          align: 'center',
          width: 90,
        },
      ];
    });

    const handleChange = (pagination, filters) => {
      filteredInfo.value = filters;
    };

    const openURL = (url) => {
      window.open(url, '', 'width=1200, height=800');
    };

    return {
      columns,
      handleChange,
      openURL,
    };
  },
};
</script>
