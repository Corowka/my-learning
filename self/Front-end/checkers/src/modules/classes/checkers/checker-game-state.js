import {
  CHECKER_GAME_RULES,
  CHECKER_GAME_STATES,
  CHECKER_TEAMS,
} from "../../../utils/constants";

export class CheckerGameState {
  constructor() {
    this.liteTeamScore = null;
    this.darkTeamScore = null;
    this.gameState = null;
    this.teamMoveOrder = null;

    this.reset();
  }

  reset() {
    this.liteTeamScore = CHECKER_GAME_RULES.minScore;
    this.darkTeamScore = CHECKER_GAME_RULES.minScore;
    this.gameState = CHECKER_GAME_STATES.running;
    this.teamMoveOrder = CHECKER_TEAMS.lite;
  }

  getTeamMoveOrder() {
    return this.teamMoveOrder;
  }

  changeTeamMoveOrder() {
    this.teamMoveOrder =
      this.teamMoveOrder === CHECKER_TEAMS.lite
        ? CHECKER_TEAMS.dark
        : CHECKER_TEAMS.lite;
  }

  addLiteTeamScore() {
    this.liteTeamScore++;
    if (this.liteTeamScore === CHECKER_GAME_RULES.maxScore) {
      this.gameState = CHECKER_GAME_STATES.liteWin;
    }
  }

  addDarkTeamScore() {
    this.darkTeamScore++;
    if (this.darkTeamScore === CHECKER_GAME_RULES.maxScore) {
      this.gameState = CHECKER_GAME_STATES.darkWin;
    }
  }
}
