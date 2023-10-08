#!/usr/bin/env node

import "dotenv/config";
import { program } from "commander";
// import { DISABLE_CRON_TASK, DISABLE_STATIC_SERVER } from "../config/task-config";
import Core from '../appium/core';
import startServer from "../appium/server";
import startApp from "../appium/appinit";

const packJson = require("../../package.json");
program
  .version(packJson.version, "-v, --version")

// 启动Appium服务
program
  .command("server")
  .action(() => {
    startServer();
  });

// 创建一个实例
program
  .command("instance")
  .action(() => {
    startApp();
  });

program.parse(process.argv);
