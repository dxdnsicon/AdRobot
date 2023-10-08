#!/usr/bin/env node

import "dotenv/config";
import { program } from "commander";
import { DISABLE_CRON_TASK, DISABLE_STATIC_SERVER } from "../config/task-config";
import Core from '../appium/core';

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


program.parse(process.argv);
