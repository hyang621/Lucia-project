
const Mock = require('mockjs')
//格式： Mock.mock( url, post/get , 返回的数据)
// 列表页---分类数据
Mock.mock('/list/listTable', 'get', require('./json/listTable'))
