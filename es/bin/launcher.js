#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const commander_1 = require("commander");
const core_1 = __importDefault(require("../appium/core"));
const packJson = require("../../package.json");
commander_1.program
    .version(packJson.version, "-v, --version");
commander_1.program
    .command("run")
    .option("-l, --link <link>", "需要执行 LH 的页面")
    .action(({ link }) => {
    (0, core_1.default)();
});
commander_1.program.parse(process.argv);
//# sourceMappingURL=launcher.js.map