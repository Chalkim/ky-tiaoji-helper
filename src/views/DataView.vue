<template>
  <a-table
    :columns="columns"
    :data-source="this.queryResult"
    :pagination="{ pageSize: 20 }"
    :locale="{filterConfirm: '确定',
      filterReset: '重置',
    }"
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
            tag === '双一流' ? 'green' :
            tag === '研究所' ? 'cyan' :
            tag === '兴趣' ? 'purple' : 'blue'"
          >
            {{ tag }}
          </a-tag>
        </template>
      </template>
      <template v-else-if="column.key === 'bz'">
        <template v-if="record.bz !== ''">
          <a-popover title="备注" :overlayStyle="{maxWidth:'250px'}">
            <template #content>
              <a-typography-text>
              {{ record.bz }}
              </a-typography-text>
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
          <a-row justify="center">
            <a-col :span="10">
              <a-button type="primary" @click="openURL('https://yz.chsi.com.cn/sytj/tjyx/tbtjzy.html?&id='+ record.id)">填报</a-button>
            </a-col>
            <a-col :span="7">
              <a-button @click="handleAddFavorite(record)">
                <StarOutlined />
              </a-button>
            </a-col>
            <a-col :span="7">
              <a-button @click="handleAddIgnore(record)">
                <EyeInvisibleOutlined />
              </a-button>
            </a-col>
          </a-row>
        </span>
        <span v-if="record.sfmzjybyq != ''">
          <a-row justify="center">
            <a-col :span="1" />
            <a-col :span="15">
              <a-typography-text>
                {{ record.sfmzjybyq }}
              </a-typography-text>
            </a-col>
            <a-col :span="1" />
            <a-col :span="7">
              <a-button @click="handleAddIgnore(record)">
                <EyeInvisibleOutlined />
              </a-button>
            </a-col>
          </a-row>
        </span>
      </template>
    </template>
  </a-table>
</template>
<script>
import { computed, ref } from 'vue';
import { schoolFilter } from '@/utils/filter';
import { StarOutlined, EyeInvisibleOutlined } from '@ant-design/icons-vue';
import { deepClone } from '@/utils/data';
import { mapState } from 'vuex';
import { message } from 'ant-design-vue';

export default {
  components: {
    StarOutlined,
    EyeInvisibleOutlined,
  },
  computed: {
    ...mapState(['queryResult']),
  },
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
            text: '研究所',
            value: 'syjs',
          }, {
            text: '兴趣',
            value: 'sxq',
          }],
          filteredValue: filtered.dwmc || null,
          onFilter: (value, record) => schoolFilter(value, record.tags),
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
          width: 200,
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
  methods: {
    refreshQueryResult() {
      const fav = this.$store.state.data.favorites;
      const favSet = new Set(fav.map((element) => element.id));
      const ignore = this.$store.state.data.ignoreList;
      const ignoreSet = new Set(ignore.map((element) => element.id));

      this.$store.commit('setQueryResult', this.$store.state.originalQueryResult.filter(
        (item) => !favSet.has(item.id) && !ignoreSet.has(item.id),
      ));
    },
    handleAddFavorite(record) {
      const data = deepClone(record);
      this.$store.dispatch('addFavorite', data).then(() => {
        message.success({
          content: '收藏成功！',
          duration: 1,
        });
      }).catch(() => {
        message.error({
          content: '该记录已被收藏！',
          duration: 1,
        });
      }).finally(() => this.refreshQueryResult());
    },
    handleAddIgnore(record) {
      const data = deepClone(record);
      this.$store.dispatch('addIgnore', data).then(() => {
        message.success({
          content: '已添加到忽略名单！',
          duration: 1,
        });
      }).catch(() => {
        message.error({
          content: '该记录已被忽略！',
          duration: 1,
        });
      }).finally(() => this.refreshQueryResult());
    },
  },
};
</script>
