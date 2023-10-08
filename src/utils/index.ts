import fs from 'fs';
import { join } from 'path';
import { exec } from 'child_process';
import log from './log';
import crypto from 'crypto';

export const writeFile = (dir, fileName, content) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  fs.writeFileSync(join(dir + '/' + fileName), JSON.stringify(content));
}

export const execCmd = async (cmd: string): Promise<string> => {
  return new Promise((resolve) => {
    exec (cmd, (error, stdout, stderr) => {
      if (error) {
        log ('error:' + stderr);
        resolve (null);
      } else {
        try {
          resolve (stdout);
        } catch (e) {
          log (e);
          resolve (null);
        }
      }
    });
  })
}

// 判断链接是否可能是PC链接
export const checkIsPc = (link: string) => {
  if (/device\=pc/.test(link)) {
    return true;
  }
  if (/device\=mobile/.test(link)) {
    return false;
  }
  if (/\/m\//.test(link)) {
    return false;
  } else if (/\/jzt\//.test(link)) {
    return false;
  } else {
    return true;
  }
}

// 生成md5
export const createMd5 = (str: string) => {
  return crypto.createHash('md5').update(str).digest('hex');
}

// 转换资源size
export const computeSize = (size: number) => {
  let res = '';
  if (size > 1000000) {
    res = `${(size / 1024 / 1024).toFixed(1)}Mb`; 
  } else if (size > 1000) {
    res = `${(size / 1024).toFixed(1)}Kb`; 
  }
  return res;
}

export const sleep = async (time: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, time)
  })
}