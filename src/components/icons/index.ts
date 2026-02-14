// ============================================
// ICON SYSTEM — Barrel Exports
// Import individual icons or the full set.
//
// Usage:
//   import { IconSearch, IconCheck } from "@/components/icons";
//   <IconSearch size="md" />
//   <IconCheck size="sm" aria-label="Done" />
// ============================================

// Core API
export { createIcon, type DSIconProps } from "./create-icon";
export {
  ICON_SIZES,
  ICON_STROKE,
  resolveSize,
  resolveStroke,
  type IconSize,
  type IconSizeToken,
} from "./icon-tokens";

// ── Stroked (outline) icons ──────────────────
export { IconPlaceholder } from "./stroked/Placeholder";
export { IconChevronUp } from "./stroked/ChevronUp";
export { IconChevronDown } from "./stroked/ChevronDown";
export { IconChevronLeft } from "./stroked/ChevronLeft";
export { IconChevronRight } from "./stroked/ChevronRight";
export { IconSearch } from "./stroked/Search";
export { IconMinus } from "./stroked/Minus";
export { IconList } from "./stroked/List";
export { IconCheck } from "./stroked/Check";
export { IconGrid } from "./stroked/Grid";
export { IconMicrophone } from "./stroked/Microphone";
export { IconImage } from "./stroked/ImageIcon";
export { IconVideo } from "./stroked/Video";
export { IconText } from "./stroked/Text";
export { IconSend } from "./stroked/Send";
export { IconDownloadCloud } from "./stroked/DownloadCloud";
export { IconX } from "./stroked/X";
export { IconGlobe } from "./stroked/Globe";
export { IconPackage } from "./stroked/Package";
export { IconVoice } from "./stroked/Voice";
export { IconArrowUpRight } from "./stroked/ArrowUpRight";
export { IconCornerDownRight } from "./stroked/CornerDownRight";
export { IconAlertCircle } from "./stroked/AlertCircle";
export { IconArrowLeft } from "./stroked/ArrowLeft";
export { IconMenu } from "./stroked/Menu";
export { IconSliders } from "./stroked/Sliders";
export { IconHome } from "./stroked/Home";
export { IconArrowRight } from "./stroked/ArrowRight";
export { IconDatabase } from "./stroked/Database";
export { IconGenAI } from "./stroked/GenAI";
export { IconChip } from "./stroked/Chip";
export { IconGroup } from "./stroked/Group";
export { IconBarChart } from "./stroked/BarChart";
export { IconMonitor } from "./stroked/Monitor";
export { IconTool } from "./stroked/Tool";
export { IconRobot } from "./stroked/Robot";
export { IconCode } from "./stroked/Code";
export { IconMessageSquare } from "./stroked/MessageSquare";
export { IconCaseStudy } from "./stroked/CaseStudy";
export { IconFileText } from "./stroked/FileText";
export { IconRobotChat } from "./stroked/RobotChat";
export { IconFilter } from "./stroked/Filter";
export { IconZap } from "./stroked/Zap";
export { IconHand } from "./stroked/Hand";
export { IconDollarSign } from "./stroked/DollarSign";
export { IconIman } from "./stroked/Iman";
export { IconTarget } from "./stroked/Target";

// ── Filled icons ─────────────────────────────
export { IconXMarkFilled } from "./filled/XMarkFilled";
export { IconAlertCircleFilled } from "./filled/AlertCircleFilled";
export { IconCheckCircleFilled } from "./filled/CheckCircleFilled";
export { IconInfoFilled } from "./filled/InfoFilled";
