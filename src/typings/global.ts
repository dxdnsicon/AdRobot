/*
 * @Author: shiningding <shiningding@tencent.com>
 * @Date: 2021-11-05 15:20:28
 * @--------------------------------------------------: 
 * @LastEditTime: 2023-11-21 16:21:55
 * @Modified By: shiningding <shiningding@tencent.com>
 * @---------------------------------------------------: 
 * @Description: 
 */

export type DeviceInfo = {name: string, status: string, size: [number, number], realSize: [number, number]};

export interface MainProps {
  picDir: string; // 图片路径
  content: string; // 文本内容
  account: {
    password: string;
    account: string;
  }[]
}
