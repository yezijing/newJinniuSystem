import axios from 'axios'
import qs from 'qs'
import { defaturl } from './apiUrl'
axios.defaults.baseURL = defaturl
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// export const indexnameData = (params, callback) => { return axios.get('/ll/getAllByNowYear', { params }).then((data) => { callback(data) }).catch(function () { }) }
// export const getDatabyChange = (params, callback) => { return axios.post('/target/getDataByDistrictId', qs.stringify({ ...params })).then((data) => { callback(data) }).catch(function () { }) }
// export const addUser = (params, callback, errorback) => { return axios.post('/sysuser/addUser', (params), {headers: {'Content-Type': 'application/json'}}).then((data) => { callback(data) }).catch(function (error) { errorback(error) }) }

// ================ 组织机构管理 ================
// 查询所有
export const allOrglist = (params, callback) => { return axios.get('/org/searchAll', { params }).then((data) => { callback(data) }).catch(function () { }) }
// 新增组织机构
export const addOrgan = (params, callback) => { return axios.post('/org/addOrg', qs.stringify({ ...params })).then((data) => { callback(data) }).catch(function () { }) }
// 修改
export const editOrgan = (params, callback) => { return axios.post('/org/updateOrg', qs.stringify({ ...params })).then((data) => { callback(data) }).catch(function () { }) }
// 删除
export const deleteOrgan = (params, callback) => { return axios.post('/org/delOrg', qs.stringify({ ...params })).then((data) => { callback(data) }).catch(function () { }) }

// ================ 部门管理 ================
// 查询所有
export const allDeptlist = (params, callback) => { return axios.get('/sysdept/searchAll', { params }).then((data) => { callback(data) }).catch(function () { }) }
// 新增
export const addDepartment = (params, callback) => { return axios.post('/sysdept/addDept', qs.stringify({ ...params })).then((data) => { callback(data) }).catch(function () { }) }
// 修改
export const editDepartment = (params, callback) => { return axios.post('/sysdept/updateDept', qs.stringify({ ...params })).then((data) => { callback(data) }).catch(function () { }) }
// 删除
export const deleteDepartment = (params, callback) => { return axios.post('/sysdept/delDept', qs.stringify({ ...params })).then((data) => { callback(data) }).catch(function () { }) }

// ================ 用户管理 =============
// 新增用户
export const addUser = (params, callback) => { return axios.post('/sysuser/addUser', qs.stringify({ ...params })).then((data) => { callback(data) }).catch(function () { }) }
// 查询所有
export const allUserlist = (params, callback) => { return axios.get('/sysuser/searchAll', { params }).then((data) => { callback(data) }).catch(function () { }) }
// 修改
export const editUser = (params, callback) => { return axios.post('/sysuser/updateUser', qs.stringify({ ...params })).then((data) => { callback(data) }).catch(function () { }) }
// 修改用户状态
export const updateUserState = (params, callback) => { return axios.post('/sysuser/updateUserStatus', qs.stringify({ ...params })).then((data) => { callback(data) }).catch(function () { }) }
// 根据ID查询用户详情
export const userDetailByid = (params, callback) => { return axios.post('/sysuser/userDetail', qs.stringify({ ...params })).then((data) => { callback(data) }).catch(function () { }) }
// 用户登录
export const userLogin = (params, callback) => { return axios.post('/sysuser/login', qs.stringify({ ...params })).then((data) => { callback(data) }).catch(function () { }) }
// 用户退出
export const userLogout = (params, callback) => { return axios.get('/sysuser/logout', { params }).then((data) => { callback(data) }).catch(function () { }) }
// 是否有部门领导
export const ishasLeader = (params, callback) => { return axios.post('/sysdept/searchIsLeader', qs.stringify({ ...params })).then((data) => { callback(data) }).catch(function () { }) }
// 职位列表
export const getJobListData = (params, callback) => { return axios.get('/job/searchAll', { params }).then((data) => { callback(data) }).catch(function () { }) }
// 新增职务
export const addJobData = (params, callback) => { return axios.post('/job/addJob', qs.stringify({ ...params })).then((data) => { callback(data) }).catch(function () { }) }
// 根据组织机构选择部门
export const getDeptByOrgData = (params, callback) => { return axios.post('/sysdept/searchByOrgId', qs.stringify({ ...params })).then((data) => { callback(data) }).catch(function () { }) }

// ================ 商机状态 ================
// 新增
export const addBusStateData = (params, callback) => { return axios.post('/crmState/addState', qs.stringify({ ...params })).then((data) => { callback(data) }).catch(function () { }) }
// 修改
export const editBusStateData = (params, callback) => { return axios.post('/crmState/updateState', qs.stringify({ ...params })).then((data) => { callback(data) }).catch(function () { }) }
// 查询所有
export const getAllBusStateData = (params, callback) => { return axios.get('/crmState/searchAll', { params }).then((data) => { callback(data) }).catch(function () { }) }
// 删除
export const deleteBusStateData = (params, callback) => { return axios.post('/crmState/delStateById', qs.stringify({ ...params })).then((data) => { callback(data) }).catch(function () { }) }

// ================ 商机分类 ================
// 新增
export const addBusSortData = (params, callback) => { return axios.post('/crmCategory/addCategory', qs.stringify({ ...params })).then((data) => { callback(data) }).catch(function () { }) }
// 修改
export const editBusSortData = (params, callback) => { return axios.post('/crmCategory/updateCategory', qs.stringify({ ...params })).then((data) => { callback(data) }).catch(function () { }) }
// 查询所有
export const getAllBusSortData = (params, callback) => { return axios.get('/crmCategory/searchAll', { params }).then((data) => { callback(data) }).catch(function () { }) }
// 删除
export const deleteBusSortData = (params, callback) => { return axios.post('/crmCategory/delCategory', qs.stringify({ ...params })).then((data) => { callback(data) }).catch(function () { }) }
