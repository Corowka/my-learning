import { ReactNode } from "react"

import AccessAlarmIcon from "@mui/icons-material/AccessAlarm"
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew"
import AssignmentIcon from "@mui/icons-material/Assignment"
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"
import ChatBubbleIcon from "@mui/icons-material/ChatBubble"
import ColorLensIcon from "@mui/icons-material/ColorLens"
import ComputerIcon from "@mui/icons-material/Computer"
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun"
import Diversity3Icon from "@mui/icons-material/Diversity3"
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions"
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents"
import EmojiNatureIcon from "@mui/icons-material/EmojiNature"
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects"
import ErrorIcon from "@mui/icons-material/Error"
import ExploreIcon from "@mui/icons-material/Explore"
import InterestsIcon from "@mui/icons-material/Interests"
import InventoryIcon from "@mui/icons-material/Inventory"
import LandscapeIcon from "@mui/icons-material/Landscape"
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch"
import SchoolIcon from "@mui/icons-material/School"
import StairsIcon from "@mui/icons-material/Stairs"

export type BenefitType = { name: string; icon?: ReactNode }

export const getBenefitsSort = (benefits: BenefitType[]) => {
  const oldNames = BENEFITS.map((b) => b.name)
  const newNames = benefits.map((b) => b.name)
  return newNames.map((n) => oldNames.indexOf(n))
}

export const BENEFITS: BenefitType[] = [
  {
    name: "Возможность помогать людям",
    icon: <AccessibilityNewIcon key={0} />,
  },
  { name: "Финансовая стабильность", icon: <AttachMoneyIcon key={1} /> },
  { name: "Востребованность на рынке", icon: <ExploreIcon key={2} /> },
  { name: "Творческая реализация", icon: <ColorLensIcon key={3} /> },
  { name: "Работа с интересными задачами", icon: <InterestsIcon key={4} /> },
  {
    name: "Связь с природой или окружающим миром",
    icon: <EmojiNatureIcon key={5} />,
  },
  { name: "Работа с людьми", icon: <Diversity3Icon key={6} /> },
  { name: "Престиж и уважение", icon: <StairsIcon key={7} /> },
  {
    name: "Возможность путешествовать и работать",
    icon: <LandscapeIcon key={8} />,
  },
  {
    name: "Гибкость в управлении рабочим графиком",
    icon: <AccessAlarmIcon key={9} />,
  },
  { name: "Вклад в будущее", icon: <AssignmentIcon key={10} /> },
  {
    name: "Эстетическое удовольствие от работы",
    icon: <EmojiEmotionsIcon key={11} />,
  },
]

export type SkillType = { name: string; icon?: ReactNode }

export const SKILLS: SkillType[] = [
  { icon: <EmojiObjectsIcon key={0} />, name: "Аналитическое мышление" },
  { icon: <ChatBubbleIcon key={1} />, name: "Коммуникативные навыки" },
  { icon: <ColorLensIcon key={2} />, name: "Творческое мышление" },
  { icon: <DirectionsRunIcon key={3} />, name: "Физическая выносливость" },
  { icon: <EmojiEventsIcon key={4} />, name: "Лидерство" },
  {
    icon: <ComputerIcon key={5} />,
    name: "Работа с техническим оборудованием",
  },
  { icon: <InventoryIcon key={6} />, name: "Организационные способности" },
  { icon: <ErrorIcon key={7} />, name: "Устойчивость к стрессу" },
  { icon: <EmojiNatureIcon key={8} />, name: "Эмпатия" },
  { icon: <StairsIcon key={9} />, name: "Мелкая моторика и точность" },
  { icon: <RocketLaunchIcon key={10} />, name: "Быстрая реакция" },
  { icon: <SchoolIcon key={11} />, name: "Навыки самообучения" },
]

export const QUESTIONS = [
  "Чем вы любите заниматься в свободное время?",
  "Какая школьная дисциплина вам давалась легче всего и почему?",
  "Какой свой навык или умение вы считаете самым сильным?",
  "Каким критериям должна соответствовать работа вашей мечты?",
  "Вы предпочитаете работать в одиночку или в команде? Почему?",
]
