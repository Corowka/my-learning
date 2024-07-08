import * as vscode from "vscode";
import { saveData } from "./helpers/save-data";
import { enterApiKey } from "./helpers/enter-apikey";

const MAX_TIME_SPACE = 1000 * 60 * 3;

type StatItem = {
  start: number;
  end: number;
  actions: number;
};

export async function activate(context: vscode.ExtensionContext) {
  vscode.window.showInformationMessage("CodeRPG initializing...");

  let apiKey: string | undefined =
    "YbCiVsmWcnSL8esm0iY36OQgqZs1" ||
    vscode.workspace.getConfiguration().get("coderpg.apiKey");

  console.log(apiKey);

  if (typeof apiKey !== "string") {
    apiKey = await enterApiKey();
    if (!apiKey) {
      vscode.window.showInformationMessage("Error while entering apiKey");
    }
  }

  const statusBar = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left
  );
  statusBar.text = "CodeRPG 0:0:0-0";
  statusBar.show();

  let sessionTime = 0;
  let actionsCount = 0;

  let lastChar = "start";
  let lastActionTime = Date.now();
  const date = new Date();
  let lastDate = [date.getDate(), date.getMonth(), date.getFullYear()].join(
    "."
  );

  let stats: StatItem[] = [];

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
      } else {
        stats.push({ start, end, actions });
        start = newLastActionTime;
        end = newLastActionTime;
        actions = 0;
      }
      lastActionTime = newLastActionTime;
      lastChar = newLastChar;
      actionsCount += 1;

      const hours = Math.floor(sessionTime / (1000 * 60 * 60));
      const minutes = Math.floor(
        (sessionTime - hours * (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor(
        (sessionTime - hours * (1000 * 60 * 60) - minutes * (1000 * 60)) / 1000
      );
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
      saveData(apiKey, stats);
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
    saveData(apiKey, stats);
  });

  let startCommand = vscode.commands.registerCommand(
    "coderpg.coderpgstart",
    async () => {
      apiKey = await enterApiKey();
    }
  );

  let saveCommand = vscode.commands.registerCommand(
    "coderpg.coderpgsave",
    () => {
      stats.push({ start, end, actions });
      saveData(apiKey, stats);
      stats = [];
      start = Date.now();
      actions = 0;
      end = Date.now();
    }
  );

  context.subscriptions.push(startCommand);
  context.subscriptions.push(saveCommand);
}

export function deactivate() {}
