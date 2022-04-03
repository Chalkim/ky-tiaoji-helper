<template>
  <a-back-top />
  <a-row justify="center">
    <a-col :span="24">
      <a-tabs
        v-model:activeKey="activeKey"
        type="card"
        @change="handleTabsChange"
      >
        <a-tab-pane key="Fuzzy" tab="模糊查询">
          <div :style="{ padding: '0 50px' }">
            <FuzzySearch />
          </div>
          <a-divider style="margin: 0 0 20px 0"/>
        </a-tab-pane>
        <a-tab-pane key="Accurate" tab="精确查询">
          <div :style="{ padding: '0 50px' }">
            <AccurateSearch />
          </div>
          <a-divider style="margin: 0 0 20px 0"/>
        </a-tab-pane>
        <a-tab-pane key="Favorites" tab="收藏夹" />
        <a-tab-pane key="IgnoreList" tab="已忽略" />
        <template #rightExtra>
          <a-button @click="handleLogin" style="margin: 0 2px 0 0">登录</a-button>
        </template>
      </a-tabs>
    </a-col>
  </a-row>
  <a-row justify="center">
    <a-col :span="20">
      <router-view />
    </a-col>
  </a-row>
</template>

<script>
import AccurateSearch from '@/components/AccurateQuery.vue';
import FuzzySearch from '@/components/FuzzyQuery.vue';
import { ref } from 'vue';
import router from '@/router/index';
import ipcRenderer from '@/electron/ipcRenderer';

ipcRenderer(this);

export default {
  name: 'App',
  components: {
    AccurateSearch,
    FuzzySearch,
  },
  setup() {
    return {
      activeKey: ref('Fuzzy'),
    };
  },
  methods: {
    handleLogin() {
      window.open('https://account.chsi.com.cn/passport/login?entrytype=yzgr&service=https%3A%2F%2Fyz.chsi.com.cn%2Fj_spring_cas_security_check', '', 'width=1200, height=800');
    },
    handleTabsChange(key) {
      switch (key) {
        case 'Accurate':
        case 'Fuzzy': {
          router.push({
            name: 'Data',
          });
          break;
        }
        case 'Favorites': {
          router.push({
            name: 'Favorites',
          });
          break;
        }
        case 'IgnoreList': {
          router.push({
            name: 'IgnoreList',
          });
          break;
        }
        default:
          break;
      }
    },
  },
};
</script>
