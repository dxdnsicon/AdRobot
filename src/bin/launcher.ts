#!/usr/bin/env node

import "dotenv/config";
import { program } from "commander";
import startApp from "../appium/appinit";

const packJson = require("../../package.json");
program
  .version(packJson.version, "-v, --version")

// 创建一个实例
program
  .command("instance")
  .action(async () => {
    await startApp({
      picDir: '/Users/shining/Downloads/test',
      content: '测试文案',
      account: [
        {
          account: 'xxx',
          password: 'aaa'
        }
      ]
    });
    process.exit(0)
  });
program.parse(process.argv);
