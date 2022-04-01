/* eslint-disable */

import request from '@/utils/request';

/**
 * 学信网登录
 * - username: 用户名
 * - password: 密码
 * @param {Object} params
 * @param {string} params.username
 * @param {string} params.password
 */
export function login(params) {
  return request({
    url: '/passport/login',
    method: 'post',
    data: data,
  });
}
