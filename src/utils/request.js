import axios from 'axios';

const baseURL = 'https://yz.chsi.com.cn';

const service = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 15000,
});

export default service;
