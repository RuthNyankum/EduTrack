import { BsCardChecklist } from "react-icons/bs";
import { FaRocketchat } from "react-icons/fa";
import { GiArchiveRegister } from "react-icons/gi";
import { LuLayoutDashboard } from "react-icons/lu";
import { SiBookstack } from "react-icons/si";
import { TbReport } from "react-icons/tb";

export const PARENT_SIDEBAR = [
  { link: "/parent/dashboard", name: "Dashboard", icon: LuLayoutDashboard },
  { link: "/parent/subject", name: "Subjects", icon: SiBookstack },
  { link: "/parent/attendance", name: "Attendance", icon: GiArchiveRegister },
  { link: "/parent/assessment", name: "Assessment", icon: BsCardChecklist },
  { link: "/parent/term-report", name: "Term Report", icon: TbReport },
  { link: "/parent/chat", name: "Chat", icon: FaRocketchat },
];

export const TEACHER_SIDEBAR = [
  { link: "/teacher/dashboard", name: "Dashboard", icon: LuLayoutDashboard },
  { link: "/teacher/subject", name: "Subjects", icon: SiBookstack },
  { link: "/teacher/attendance", name: "Attendance", icon: GiArchiveRegister },
  { link: "/teacher/assessment", name: "Assessment", icon: BsCardChecklist },
  { link: "/teacher/term-report", name: "Term Report", icon: TbReport },
  { link: "/teacher/chat", name: "Notifications", icon: FaRocketchat },
];
