/* eslint-disable */
import request from '@/utils/request';

/**
 * 精确查询
 * - ssdm: 所在省市
 * - dwmc: 招生单位
 * - xxfs: 学习方式
 * - zymc: 专业名称
 * @param {Object} params
 * @param {string} params.ssdm
 * @param {string} params.dwmc
 * @param {string} params.xxfs
 * @param {string} params.zymc
 */
export function accurateQuery(params, start) {
  const defaultParams = {
    pageSize: 20,
    start: start,
  };

  return request({
    url: '/sytj/stu/tjyxqexxcx.action',
    method: 'post',
    params: Object.assign(defaultParams, params),
  })
}

/**
 * 模糊查询
 * - ssdm2: 所在省市
 * - dwmc2: 模糊查询
 * - xxfs2: 学习方式
 * @param {Object} params
 * @param {string} params.ssdm2
 * @param {string} params.dwmc2
 * @param {string} params.xxfs2
 */
export function fuzzyQuery(params, start) {
  const defaultParams = {
    pageSize: 20,
    start: start,
    mhcx: 1,
  };
  return request({
    url: '/sytj/stu/tjyxqexxcx.action',
    method: 'post',
    params: Object.assign(defaultParams, params),
  });
}
