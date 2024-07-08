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
exports.saveData = void 0;
const axios = require("axios");
const vscode = __importStar(require("vscode"));
const PORT = 3000;
const IP = "localhost";
function saveData(apiKey, stats) {
    if (!apiKey) {
        vscode.window.showInformationMessage("unknown apiKey");
    }
    const data = { apiKey, stats };
    console.log(stats);
    axios
        .post(`http://${IP}:${PORT}/api/stats/update`, data)
        .then(() => {
        console.log("Data sent successfully!");
    })
        .catch((error) => {
        console.error("Error sending data:", error);
        vscode.window.showInformationMessage(error);
    });
}
exports.saveData = saveData;
//# sourceMappingURL=save-data.js.map