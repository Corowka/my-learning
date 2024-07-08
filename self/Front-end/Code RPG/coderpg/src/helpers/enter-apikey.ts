import * as vscode from "vscode";

export async function enterApiKey() {
  let newApiKey;
  await vscode.window
    .showInputBox({
      prompt: "Ender CodeRPG api key:",
      value: "",
    })
    .then((apiKey) => {
      if (apiKey) {
        vscode.workspace
          .getConfiguration()
          .update("coderpg.apiKey", apiKey, vscode.ConfigurationTarget.Global);
        vscode.window.showInformationMessage("API key saved successfully!");
        newApiKey = apiKey;
      }
    });
  return newApiKey;
}
