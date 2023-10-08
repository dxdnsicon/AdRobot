#!/usr/bin/env node

import "dotenv/config";
import { program } from "commander";
// import { DISABLE_CRON_TASK, DISABLE_STATIC_SERVER } from "../config/task-config";
import Core from '../appium/core';
import startServer from "../appium/server";

const packJson = require("../../package.json");
program
  .version(packJson.version, "-v, --version")

// 触发 lighthouse 任务
program
  .command("run")
  .option("-l, --link <link>", "需要执行 LH 的页面")
  .action(({ link }) => {
    Core();
  });

// 启动Appium服务
program
  .command("server")
  .action(() => {
    startServer();
  });


program.parse(process.argv);
