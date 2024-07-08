const axios = require("axios");
import * as vscode from "vscode";

const PORT = 3000;
const IP = "localhost";

type StatItem = {
  start: number;
  end: number;
  actions: number;
};

export function saveData(apiKey: string | undefined, stats: StatItem[]) {
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
    .catch((error: string) => {
      console.error("Error sending data:", error);
      vscode.window.showInformationMessage(error);
    });
}
