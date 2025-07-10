import { BsCardChecklist } from "react-icons/bs";
import { FaRocketchat } from "react-icons/fa";
import { GiArchiveRegister } from "react-icons/gi";
import { LuLayoutDashboard } from "react-icons/lu";
import { RiLogoutCircleLine } from "react-icons/ri";
import { SiBookstack } from "react-icons/si";
import { TbReport } from "react-icons/tb";

const SIDEBAR = [

{
    link: "/parent/dashboard",
    name: "Overview",
    icon: <LuLayoutDashboard/>,

},

{
    link: "/parent/subject",
    name: "Subjects" ,
    icon: <SiBookstack/> ,
},

{
    link: "/parent/attendance",
    name: "Attendance" ,
    icon: <GiArchiveRegister/> ,
},
{
    link: "/parent/assessment",
    name: "Assessment" ,
    icon: <BsCardChecklist/> ,
},
{
    link: "/parent/term-report",
    name: "Term Report" ,
    icon: <TbReport/> ,
},
{
    link: "/parent/chat",
    name: "Chat" ,
    icon: <FaRocketchat/> ,
},
{
    link: "/parent/login",
    name: "Logout" ,
    icon: <RiLogoutCircleLine/> ,
},
];
export default SIDEBAR;