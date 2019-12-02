import axios from 'axios'
import qs from 'qs'
import { defaturl } from './apiUrl'
axios.defaults.baseURL = defaturl
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// 查询所有
export const getClueListData = (params, callback) => { return axios.post('/crmThreadManage/searchManageList', qs.stringify({ ...params })).then((data) => { callback(data) }).catch(function () { }) }
// 新增
export const addClueData = (params, callback, errorback) => { return axios.post('/crmThreadManage/add', (params), {headers: {'Content-Type': 'application/json'}}).then((data) => { callback(data) }).catch(function (error) { errorback(error) }) }
// 编辑
export const editClueData = (params, callback, errorback) => { return axios.post('/crmThreadManage/update', (params), {headers: {'Content-Type': 'application/json'}}).then((data) => { callback(data) }).catch(function (error) { errorback(error) }) }
// 详情
export const detailSourceData = (params, callback) => { return axios.post('/crmThreadManage/searchDetial', qs.stringify({ ...params })).then((data) => { callback(data) }).catch(function () { }) }
// 商机来源添加
export const addSourceData = (params, callback) => { return axios.post('/crmSource/addSource', qs.stringify({ ...params })).then((data) => { callback(data) }).catch(function () { }) }
// 商机来源列表
export const getSourceListData = (params, callback) => { return axios.get('/crmSource/searchAll', { params }).then((data) => { callback(data) }).catch(function () { }) }
// 添加拜访记录
export const addVisitRecordData = (params, callback) => { return axios.post('/crmVisitRecord/addVisitRecord', qs.stringify({ ...params })).then((data) => { callback(data) }).catch(function () { }) }
// 申请协助
export const getDeptUserData = (params, callback) => { return axios.post('/sysdept/constructDeptMsg', qs.stringify({ ...params })).then((data) => { callback(data) }).catch(function () { }) }
// 获取相关人列表
export const getAllRalateData = (params, callback) => { return axios.post('/crmRelatedPerson/searchByThreadId', qs.stringify({ ...params })).then((data) => { callback(data) }).catch(function () { }) }
// 修改线索状态
export const updateClueStatusData = (params, callback) => { return axios.post('/crmThreadManage/updateState', qs.stringify({ ...params })).then((data) => { callback(data) }).catch(function () { }) }
