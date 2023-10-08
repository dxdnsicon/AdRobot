"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleep = exports.computeSize = exports.createMd5 = exports.checkIsPc = exports.execCmd = exports.writeFile = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = require("path");
const child_process_1 = require("child_process");
const log_1 = __importDefault(require("./log"));
const crypto_1 = __importDefault(require("crypto"));
const writeFile = (dir, fileName, content) => {
    if (!fs_1.default.existsSync(dir)) {
        fs_1.default.mkdirSync(dir);
    }
    fs_1.default.writeFileSync((0, path_1.join)(dir + '/' + fileName), JSON.stringify(content));
};
exports.writeFile = writeFile;
const execCmd = async (cmd) => {
    return new Promise((resolve) => {
        (0, child_process_1.exec)(cmd, (error, stdout, stderr) => {
            if (error) {
                (0, log_1.default)('error:' + stderr);
                resolve(null);
            }
            else {
                try {
                    resolve(stdout);
                }
                catch (e) {
                    (0, log_1.default)(e);
                    resolve(null);
                }
            }
        });
    });
};
exports.execCmd = execCmd;
const checkIsPc = (link) => {
    if (/device\=pc/.test(link)) {
        return true;
    }
    if (/device\=mobile/.test(link)) {
        return false;
    }
    if (/\/m\//.test(link)) {
        return false;
    }
    else if (/\/jzt\//.test(link)) {
        return false;
    }
    else {
        return true;
    }
};
exports.checkIsPc = checkIsPc;
const createMd5 = (str) => {
    return crypto_1.default.createHash('md5').update(str).digest('hex');
};
exports.createMd5 = createMd5;
const computeSize = (size) => {
    let res = '';
    if (size > 1000000) {
        res = `${(size / 1024 / 1024).toFixed(1)}Mb`;
    }
    else if (size > 1000) {
        res = `${(size / 1024).toFixed(1)}Kb`;
    }
    return res;
};
exports.computeSize = computeSize;
const sleep = async (time) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
};
exports.sleep = sleep;
//# sourceMappingURL=index.js.map