"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.save_base64 = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const task_config_1 = require("../config/task-config");
const save_base64 = (dataurl, pageItem) => {
    const imagePath = path.resolve(task_config_1.IMAGES_PATH, `${pageItem.pageName}.png`);
    const buffer = Buffer.from(dataurl, 'base64');
    fs.writeFile(imagePath, buffer, (err) => {
        if (err) {
            console.log('writefile error', err);
        }
        else {
            console.log('success');
        }
    });
};
exports.save_base64 = save_base64;
//# sourceMappingURL=image.js.map