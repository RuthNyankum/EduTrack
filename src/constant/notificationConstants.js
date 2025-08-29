import {
  Calendar,
  AlertTriangle,
  Info,
  CheckCircle,
  Star,
  Bell,
  Clock,
} from "lucide-react";

// Priority color mappings
export const PRIORITY_COLORS = {
  urgent: "bg-red-100 text-red-800 border-red-200",
  high: "bg-orange-100 text-orange-800 border-orange-200",
  medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  low: "bg-green-100 text-green-800 border-green-200",
};

// Icon color mappings for priority levels
export const PRIORITY_ICON_COLORS = {
  urgent: "text-red-600",
  high: "text-orange-600",
  medium: "text-yellow-600",
  low: "text-green-600",
};

// Background color mappings for priority levels
export const PRIORITY_BG_COLORS = {
  urgent: "bg-red-100",
  high: "bg-orange-100",
  medium: "bg-yellow-100",
  low: "bg-green-100",
};

// Type-specific icon mappings
export const TYPE_ICONS = {
  meeting: Calendar,
  emergency: AlertTriangle,
  academic: Info,
  achievement: CheckCircle,
  event: Calendar,
  behavioral: Star,
};

// Filter configuration
export const NOTIFICATION_FILTERS = [
  { id: "all", label: "All" },
  { id: "unread", label: "Unread" },
  { id: "urgent", label: "Urgent" },
  { id: "action", label: "Action Required" },
];

// Stats configuration
export const STATS_CONFIG = [
  {
    id: "urgent",
    label: "Urgent",
    icon: AlertTriangle,
    iconColor: "text-red-500",
    filter: (notifications) =>
      notifications.filter((n) => n.priority === "urgent"),
  },
  {
    id: "action",
    label: "Action Required",
    icon: Clock,
    iconColor: "text-blue-500",
    filter: (notifications) => notifications.filter((n) => n.actionRequired),
  },
  {
    id: "unread",
    label: "Unread",
    icon: Bell,
    iconColor: "text-yellow-500",
    filter: (notifications) => notifications.filter((n) => !n.read),
  },
  {
    id: "weekly",
    label: "This Week",
    icon: CheckCircle,
    iconColor: "text-green-500",
    filter: (notifications) => {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return notifications.filter((n) => {
        const notifDate = new Date(n.date);
        return notifDate >= weekAgo;
      });
    },
  },
];

// Notification types enum
export const NOTIFICATION_TYPES = {
  MEETING: "meeting",
  EMERGENCY: "emergency",
  ACADEMIC: "academic",
  ACHIEVEMENT: "achievement",
  EVENT: "event",
  BEHAVIORAL: "behavioral",
};

// Priority levels enum
export const PRIORITY_LEVELS = {
  URGENT: "urgent",
  HIGH: "high",
  MEDIUM: "medium",
  LOW: "low",
};

// Mock notification data - Replace with API calls in production
export const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    type: NOTIFICATION_TYPES.MEETING,
    title: "PTA Meeting Reminder",
    message:
      "Parent-Teacher Association meeting scheduled for this Friday at 3:00 PM in the main auditorium. Your attendance is important.",
    teacher: "Mrs. Sarah Johnson",
    subject: "Mathematics",
    timestamp: "2 hours ago",
    date: "2024-03-15",
    priority: PRIORITY_LEVELS.HIGH,
    read: false,
    actionRequired: true,
    icon: Calendar,
  },
  {
    id: 2,
    type: NOTIFICATION_TYPES.EMERGENCY,
    title: "School Closure Alert",
    message:
      "Due to unexpected weather conditions, school will be closed tomorrow (March 16th). All after-school activities are canceled.",
    teacher: "Principal Office",
    subject: "General",
    timestamp: "4 hours ago",
    date: "2024-03-15",
    priority: PRIORITY_LEVELS.URGENT,
    read: false,
    actionRequired: false,
    icon: AlertTriangle,
  },
  {
    id: 3,
    type: NOTIFICATION_TYPES.ACADEMIC,
    title: "Assignment Reminder",
    message:
      "Emma's science project is due next Monday. Please ensure she has all necessary materials for her volcano demonstration.",
    teacher: "Mr. David Chen",
    subject: "Science",
    timestamp: "1 day ago",
    date: "2024-03-14",
    priority: PRIORITY_LEVELS.MEDIUM,
    read: true,
    actionRequired: true,
    icon: Info,
  },
  {
    id: 4,
    type: NOTIFICATION_TYPES.ACHIEVEMENT,
    title: "Student Achievement",
    message:
      "Congratulations! Emma scored 95% on her recent English Literature test. She showed excellent understanding of the material.",
    teacher: "Ms. Emily Rodriguez",
    subject: "English Literature",
    timestamp: "2 days ago",
    date: "2024-03-13",
    priority: PRIORITY_LEVELS.LOW,
    read: true,
    actionRequired: false,
    icon: CheckCircle,
  },
  {
    id: 5,
    type: NOTIFICATION_TYPES.EVENT,
    title: "Field Trip Permission",
    message:
      "Science field trip to the Natural History Museum on March 25th. Permission slip and $15 fee required by March 20th.",
    teacher: "Mr. David Chen",
    subject: "Science",
    timestamp: "3 days ago",
    date: "2024-03-12",
    priority: PRIORITY_LEVELS.HIGH,
    read: false,
    actionRequired: true,
    icon: Calendar,
  },
  {
    id: 6,
    type: NOTIFICATION_TYPES.BEHAVIORAL,
    title: "Behavioral Update",
    message:
      "Emma has shown excellent leadership skills during group projects this week. She helped her classmates understand difficult concepts.",
    teacher: "Mrs. Sarah Johnson",
    subject: "Mathematics",
    timestamp: "5 days ago",
    date: "2024-03-10",
    priority: PRIORITY_LEVELS.LOW,
    read: true,
    actionRequired: false,
    icon: Star,
  },
  {
    id: 7,
    type: NOTIFICATION_TYPES.MEETING,
    title: "Parent Conference Scheduled",
    message:
      "Individual parent-teacher conference scheduled for March 22nd at 2:30 PM. Please confirm your attendance.",
    teacher: "Ms. Emily Rodriguez",
    subject: "English Literature",
    timestamp: "1 week ago",
    date: "2024-03-08",
    priority: PRIORITY_LEVELS.HIGH,
    read: false,
    actionRequired: true,
    icon: Calendar,
  },
  {
    id: 8,
    type: NOTIFICATION_TYPES.ACADEMIC,
    title: "Test Results Available",
    message:
      "Mathematics test results are now available in the parent portal. Emma performed well with a score of 88%.",
    teacher: "Mrs. Sarah Johnson",
    subject: "Mathematics",
    timestamp: "1 week ago",
    date: "2024-03-07",
    priority: PRIORITY_LEVELS.MEDIUM,
    read: true,
    actionRequired: false,
    icon: Info,
  },
];

// Utility functions
export const getFilterCount = (notifications, filterId) => {
  switch (filterId) {
    case "all":
      return notifications.length;
    case "unread":
      return notifications.filter((n) => !n.read).length;
    case "urgent":
      return notifications.filter((n) => n.priority === PRIORITY_LEVELS.URGENT)
        .length;
    case "action":
      return notifications.filter((n) => n.actionRequired).length;
    default:
      return 0;
  }
};

export const filterNotifications = (notifications, filterId) => {
  switch (filterId) {
    case "unread":
      return notifications.filter((n) => !n.read);
    case "urgent":
      return notifications.filter((n) => n.priority === PRIORITY_LEVELS.URGENT);
    case "action":
      return notifications.filter((n) => n.actionRequired);
    default:
      return notifications;
  }
};

export const searchNotifications = (notifications, searchTerm) => {
  if (!searchTerm) return notifications;

  const term = searchTerm.toLowerCase();
  return notifications.filter(
    (notification) =>
      notification.title.toLowerCase().includes(term) ||
      notification.message.toLowerCase().includes(term) ||
      notification.teacher.toLowerCase().includes(term) ||
      notification.subject.toLowerCase().includes(term)
  );
};

// Format timestamp utility
export const formatTimestamp = (timestamp) => {
  if (timestamp === "Today" || timestamp === "Yesterday") return timestamp;
  return timestamp;
};
