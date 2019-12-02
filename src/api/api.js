import axios from 'axios'
import qs from 'qs'
import { defaturl } from './apiUrl'
axios.defaults.baseURL = defaturl
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

export const indexnameData = (params, callback) => { return axios.get('/ll/getAllByNowYear', { params }).then((data) => { callback(data) }).catch(function () { }) }
export const getDatabyChange = (params, callback) => { return axios.post('/target/getDataByDistrictId', qs.stringify({ ...params })).then((data) => { callback(data) }).catch(function () { }) }
export const resetPassword = (params, callback, errorback) => { return axios.post('/users/resetPasswordList', (params), {headers: {'Content-Type': 'application/json'}}).then((data) => { callback(data) }).catch(function (error) { errorback(error) }) }
