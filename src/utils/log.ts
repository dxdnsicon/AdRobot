/*
 * @Author: shiningding <shiningding@tencent.com>
 * @Date: 2021-05-06 17:15:21
 * @--------------------------------------------------: 
 * @LastEditTime: 2022-03-30 16:24:02
 * @Modified By: shiningding <shiningding@tencent.com>
 * @---------------------------------------------------: 
 * @Description: 日志输出
 */

import formateTime from '../utils/time'

const color = ['\x1B[31m%s\x1B[0m', '\x1B[36m%s\x1B[0m',  '\x1B[32m%s\x1B[0m', '\x1B[33m%s\x1B[0m', '\x1B[34m%s\x1B[0m', '\x1B[35m%s\x1B[0m', '\x1B[41m%s\x1B[0m', '\x1B[42m%s\x1B[0m', '\x1B[43m%s\x1B[0m', '\x1B[44m%s\x1B[0m', '\x1B[45m%s\x1B[0m', '\x1B[46m%s\x1B[0m', ];

export default function (...args) {
  if (global.page) {
    console.log(color[global.page - 1],`${formateTime(new Date(), 'yyyy-MM-dd hh:mm:ss')}-child${global.page}:`, ...args);
  } else {
    console.log(`${formateTime(new Date(), 'yyyy-MM-dd hh:mm:ss')}: `, ...args);
  }
  
}