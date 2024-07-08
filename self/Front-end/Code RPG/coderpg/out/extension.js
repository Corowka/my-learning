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
exports.deactivate = exports.activate = void 0;
const vscode = __importStar(require("vscode"));
const save_data_1 = require("./helpers/save-data");
const enter_apikey_1 = require("./helpers/enter-apikey");
const MAX_TIME_SPACE = 1000 * 60 * 3;
async function activate(context) {
    vscode.window.showInformationMessage("CodeRPG initializing...");
    let apiKey = "YbCiVsmWcnSL8esm0iY36OQgqZs1" ||
        vscode.workspace.getConfiguration().get("coderpg.apiKey");
    console.log(apiKey);
    if (typeof apiKey !== "string") {
        apiKey = await (0, enter_apikey_1.enterApiKey)();
        if (!apiKey) {
            vscode.window.showInformationMessage("Error while entering apiKey");
        }
    }
    const statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
    statusBar.text = "CodeRPG 0:0:0-0";
    statusBar.show();
    let sessionTime = 0;
    let actionsCount = 0;
    let lastChar = "start";
    let lastActionTime = Date.now();
    const date = new Date();
    let lastDate = [date.getDate(), date.getMonth(), date.getFullYear()].join(".");
    let stats = [];
    let start = lastActionTime;
    let end = lastActionTime;
    let actions = 0;
    vscode.workspace.onDidChangeTextDocument((event) => {
        const changes = event.contentChanges;
        const newLastChar = changes[0].text[0];
        if (lastChar !== newLastChar) {
            const newLastActionTime = Date.now();
            const pause = newLastActionTime - lastActionTime;
            if (pause <= MAX_TIME_SPACE) {
                sessionTime += pause;
                actions += 1;
                end += pause;
            }
            else {
                stats.push({ start, end, actions });
                start = newLastActionTime;
                end = newLastActionTime;
                actions = 0;
            }
            lastActionTime = newLastActionTime;
            lastChar = newLastChar;
            actionsCount += 1;
            const hours = Math.floor(sessionTime / (1000 * 60 * 60));
            const minutes = Math.floor((sessionTime - hours * (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((sessionTime - hours * (1000 * 60 * 60) - minutes * (1000 * 60)) / 1000);
            statusBar.text = `CodeRPG ${hours}:${minutes}:${seconds}-${actionsCount}`;
            statusBar.show();
        }
        const newDate = new Date();
        const newLastDate = [
            newDate.getDate(),
            newDate.getMonth(),
            newDate.getFullYear(),
        ].join(".");
        if (lastDate !== newLastDate) {
            stats.push({ start, end, actions });
            (0, save_data_1.saveData)(apiKey, stats);
            stats = [];
            start = Date.now();
            actions = 0;
            end = Date.now();
            lastDate = newLastDate;
        }
    });
    vscode.window.onDidCloseTerminal(() => {
        console.log("close vscode");
        stats.push({ start, end, actions });
        (0, save_data_1.saveData)(apiKey, stats);
    });
    let startCommand = vscode.commands.registerCommand("coderpg.coderpgstart", async () => {
        apiKey = await (0, enter_apikey_1.enterApiKey)();
    });
    let saveCommand = vscode.commands.registerCommand("coderpg.coderpgsave", () => {
        stats.push({ start, end, actions });
        (0, save_data_1.saveData)(apiKey, stats);
        stats = [];
        start = Date.now();
        actions = 0;
        end = Date.now();
    });
    context.subscriptions.push(startCommand);
    context.subscriptions.push(saveCommand);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map