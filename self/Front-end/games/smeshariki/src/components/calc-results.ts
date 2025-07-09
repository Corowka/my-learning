import { questions } from "./quiz"

export const calcResults = (answers: string[]) => {
  let score = 0;
  for (let i = 0; i < questions.length; i++) {
    if (questions[i].answer === answers[i]) {
      score++
    }
  }

  const res = Math.trunc(score / questions.length * 3)
  let text = ""

  switch (res) {
    case 0: text = `Твой результат ${score}. Похоже ты не очень знаешь смешариков.`; break;
    case 1: text = `Твой результат ${score}. Неплохо, но ты ещё не достаточно круглый.`; break;
    case 2: text = `Твой результат ${score}. Ого, очень хорошо.`; break;
    case 3: text = `Твой результат ${score}. Да ты просто шар среди кубиков.`; break;
  }

  return { score, text }
}