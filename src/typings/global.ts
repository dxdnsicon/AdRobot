/*
 * @Author: shiningding <shiningding@tencent.com>
 * @Date: 2021-11-05 15:20:28
 * @--------------------------------------------------: 
 * @LastEditTime: 2022-04-06 20:57:17
 * @Modified By: shiningding <shiningding@tencent.com>
 * @---------------------------------------------------: 
 * @Description: 
 */

export enum MessageType {
  ABNORMALRESOURCE = 'abnormalresource',
  LARGERESOURCE = 'largeresource',
  SSRERROR = 'ssrerror',
  EMPTYPAGE = 'emptypage',
  PAGEERROR = 'pageerror'
}

export enum MessageDuration {
  DEFAULT = 6 * 60 * 60 * 1000,
  ABNORMALRESOURCE = 60 * 60 * 1000,
  SSRERROR = 10 * 60 * 1000,
  EMPTYPAGE = 0 * 60 * 1000,
}