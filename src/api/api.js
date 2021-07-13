import {
  getAction,
  deleteAction,
  putAction,
  postAction,
  httpAction,
  putFormAction,
  postFormAction
} from '@/api/manage'
import Vue from 'vue'

// 获取分类列表
export const getlistTable = (params) => getAction('/list/listTable', params);