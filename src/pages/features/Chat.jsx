// import React, { useState, useRef, useEffect } from "react";
// import {
//   Send,
//   Search,
//   Phone,
//   Video,
//   MoreVertical,
//   ArrowLeft,
//   Paperclip,
//   Smile,
// } from "lucide-react";

// const Chat = () => {
//   const [selectedChat, setSelectedChat] = useState(null);
//   const [message, setMessage] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const messagesEndRef = useRef(null);

//   // Mock data - replace with real data from your backend
//   const [teachers] = useState([
//     {
//       id: 1,
//       name: "Mrs. Sarah Johnson",
//       subject: "Mathematics",
//       avatar:
//         "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=40&h=40&fit=crop&crop=face",
//       lastMessage: "Let's schedule a meeting to discuss Emma's progress",
//       timestamp: "2:30 PM",
//       unread: 2,
//       online: true,
//       messages: [
//         {
//           id: 1,
//           sender: "teacher",
//           content:
//             "Hello! I wanted to discuss Emma's recent math test performance.",
//           timestamp: "10:00 AM",
//           date: "Today",
//         },
//         {
//           id: 2,
//           sender: "parent",
//           content:
//             "Hi Mrs. Johnson! Yes, I saw the results. How can we help her improve?",
//           timestamp: "10:15 AM",
//           date: "Today",
//         },
//         {
//           id: 3,
//           sender: "teacher",
//           content:
//             "She's doing well with basic concepts but struggling with word problems. I suggest extra practice at home.",
//           timestamp: "10:20 AM",
//           date: "Today",
//         },
//         {
//           id: 4,
//           sender: "parent",
//           content: "That makes sense. Could you recommend some resources?",
//           timestamp: "10:25 AM",
//           date: "Today",
//         },
//         {
//           id: 5,
//           sender: "teacher",
//           content: "Let's schedule a meeting to discuss Emma's progress",
//           timestamp: "2:30 PM",
//           date: "Today",
//         },
//       ],
//     },
//     {
//       id: 2,
//       name: "Mr. David Chen",
//       subject: "Science",
//       avatar:
//         "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
//       lastMessage: "Great job on the science project!",
//       timestamp: "1:15 PM",
//       unread: 0,
//       online: false,
//       messages: [
//         {
//           id: 1,
//           sender: "teacher",
//           content: "Emma's science project was excellent!",
//           timestamp: "1:15 PM",
//           date: "Today",
//         },
//         {
//           id: 2,
//           sender: "parent",
//           content: "Thank you! She worked really hard on it.",
//           timestamp: "1:20 PM",
//           date: "Today",
//         },
//       ],
//     },
//     {
//       id: 3,
//       name: "Ms. Emily Rodriguez",
//       subject: "English Literature",
//       avatar:
//         "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
//       lastMessage: "Reading assignment reminder",
//       timestamp: "Yesterday",
//       unread: 1,
//       online: true,
//       messages: [
//         {
//           id: 1,
//           sender: "teacher",
//           content: "Don't forget about the reading assignment due Friday!",
//           timestamp: "3:45 PM",
//           date: "Yesterday",
//         },
//       ],
//     },
//   ]);

//   const [chatMessages, setChatMessages] = useState({});

//   useEffect(() => {
//     // Initialize chat messages
//     const initialMessages = {};
//     teachers.forEach((teacher) => {
//       initialMessages[teacher.id] = teacher.messages;
//     });
//     setChatMessages(initialMessages);
//   }, [teachers]);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [selectedChat, chatMessages]);

//   const handleSendMessage = () => {
//     if (message.trim() && selectedChat) {
//       const newMessage = {
//         id: Date.now(),
//         sender: "parent",
//         content: message.trim(),
//         timestamp: new Date().toLocaleTimeString([], {
//           hour: "2-digit",
//           minute: "2-digit",
//         }),
//         date: "Today",
//       };

//       setChatMessages((prev) => ({
//         ...prev,
//         [selectedChat.id]: [...(prev[selectedChat.id] || []), newMessage],
//       }));

//       setMessage("");
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };

//   const filteredTeachers = teachers.filter(
//     (teacher) =>
//       teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       teacher.subject.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const formatTime = (timestamp) => {
//     if (timestamp === "Today" || timestamp === "Yesterday") return timestamp;
//     return timestamp;
//   };

//   return (
//     <div className="p-6">
//       <div className="flex h-[600px] bg-white rounded-lg shadow-lg overflow-hidden">
//         {/* Teachers List */}
//         <div
//           className={`${
//             selectedChat ? "hidden lg:block" : "block"
//           } w-full lg:w-80 border-r border-gray-200 flex flex-col`}
//         >
//           {/* Header */}
//           <div className="p-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
//             <h2 className="text-lg font-semibold mb-3">Messages</h2>
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-200 w-4 h-4" />
//               <input
//                 type="text"
//                 placeholder="Search teachers..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 bg-white/20 rounded-lg placeholder-purple-200 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
//               />
//             </div>
//           </div>

//           {/* Teachers List */}
//           <div className="flex-1 overflow-y-auto">
//             {filteredTeachers.map((teacher) => (
//               <div
//                 key={teacher.id}
//                 onClick={() => setSelectedChat(teacher)}
//                 className={`p-4 border-b border-gray-100 cursor-pointer transition-colors hover:bg-gray-50 ${
//                   selectedChat?.id === teacher.id
//                     ? "bg-purple-50 border-r-2 border-r-purple-500"
//                     : ""
//                 }`}
//               >
//                 <div className="flex items-center space-x-3">
//                   <div className="relative">
//                     <img
//                       src={teacher.avatar}
//                       alt={teacher.name}
//                       className="w-12 h-12 rounded-full object-cover"
//                     />
//                     {teacher.online && (
//                       <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
//                     )}
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <div className="flex justify-between items-center">
//                       <h3 className="font-medium text-gray-900 truncate">
//                         {teacher.name}
//                       </h3>
//                       <span className="text-xs text-gray-500">
//                         {formatTime(teacher.timestamp)}
//                       </span>
//                     </div>
//                     <p className="text-sm text-gray-600 mb-1">
//                       {teacher.subject}
//                     </p>
//                     <div className="flex justify-between items-center">
//                       <p className="text-sm text-gray-500 truncate flex-1">
//                         {teacher.lastMessage}
//                       </p>
//                       {teacher.unread > 0 && (
//                         <span className="ml-2 bg-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                           {teacher.unread}
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Chat Area */}
//         {selectedChat ? (
//           <div className="flex-1 flex flex-col">
//             {/* Chat Header */}
//             <div className="p-4 bg-white border-b border-gray-200 flex items-center justify-between">
//               <div className="flex items-center space-x-3">
//                 <button
//                   onClick={() => setSelectedChat(null)}
//                   className="lg:hidden p-2 hover:bg-gray-100 rounded-full"
//                 >
//                   <ArrowLeft className="w-5 h-5" />
//                 </button>
//                 <img
//                   src={selectedChat.avatar}
//                   alt={selectedChat.name}
//                   className="w-10 h-10 rounded-full object-cover"
//                 />
//                 <div>
//                   <h3 className="font-medium text-gray-900">
//                     {selectedChat.name}
//                   </h3>
//                   <p className="text-sm text-gray-500">
//                     {selectedChat.subject} •{" "}
//                     {selectedChat.online ? "Online" : "Offline"}
//                   </p>
//                 </div>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <button className="p-2 hover:bg-gray-100 rounded-full">
//                   <Phone className="w-5 h-5 text-gray-600" />
//                 </button>
//                 <button className="p-2 hover:bg-gray-100 rounded-full">
//                   <Video className="w-5 h-5 text-gray-600" />
//                 </button>
//                 <button className="p-2 hover:bg-gray-100 rounded-full">
//                   <MoreVertical className="w-5 h-5 text-gray-600" />
//                 </button>
//               </div>
//             </div>

//             {/* Messages */}
//             <div className="flex-1 overflow-y-auto p-4 space-y-4">
//               {(chatMessages[selectedChat.id] || []).map((msg) => (
//                 <div
//                   key={msg.id}
//                   className={`flex ${
//                     msg.sender === "parent" ? "justify-end" : "justify-start"
//                   }`}
//                 >
//                   <div
//                     className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
//                       msg.sender === "parent"
//                         ? "bg-purple-500 text-white rounded-br-none"
//                         : "bg-gray-100 text-gray-900 rounded-bl-none"
//                     }`}
//                   >
//                     <p className="text-sm">{msg.content}</p>
//                     <p
//                       className={`text-xs mt-1 ${
//                         msg.sender === "parent"
//                           ? "text-purple-100"
//                           : "text-gray-500"
//                       }`}
//                     >
//                       {msg.timestamp}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//               <div ref={messagesEndRef} />
//             </div>

//             {/* Message Input */}
//             <div className="p-4 border-t border-gray-200">
//               <div className="flex items-center space-x-2">
//                 <button className="p-2 hover:bg-gray-100 rounded-full">
//                   <Paperclip className="w-5 h-5 text-gray-600" />
//                 </button>
//                 <div className="flex-1 relative">
//                   <input
//                     type="text"
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}
//                     onKeyPress={handleKeyPress}
//                     placeholder="Type a message..."
//                     className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                   />
//                 </div>
//                 <button className="p-2 hover:bg-gray-100 rounded-full">
//                   <Smile className="w-5 h-5 text-gray-600" />
//                 </button>
//                 <button
//                   onClick={handleSendMessage}
//                   disabled={!message.trim()}
//                   className="p-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   <Send className="w-5 h-5" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         ) : (
//           /* Welcome Screen */
//           <div className="hidden lg:flex flex-1 items-center justify-center bg-gray-50">
//             <div className="text-center">
//               <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <Send className="w-12 h-12 text-purple-500" />
//               </div>
//               <h3 className="text-xl font-medium text-gray-900 mb-2">
//                 Welcome to Parent-Teacher Chat
//               </h3>
//               <p className="text-gray-500 max-w-sm">
//                 Select a teacher from the left to start a conversation and stay
//                 connected with your child's education.
//               </p>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Chat;

import React, { useState } from "react";
import { Bell, Search, MoreVertical } from "lucide-react";
import {
  PRIORITY_COLORS,
  PRIORITY_ICON_COLORS,
  PRIORITY_BG_COLORS,
  TYPE_ICONS,
  NOTIFICATION_FILTERS,
  STATS_CONFIG,
  MOCK_NOTIFICATIONS,
  getFilterCount,
  filterNotifications,
  searchNotifications,
  formatTimestamp,
} from "../../constant/notificationConstants";

const Chat = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  // Calculate filter counts dynamically
  const filters = NOTIFICATION_FILTERS.map((filter) => ({
    ...filter,
    count: getFilterCount(notifications, filter.id),
  }));

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true }))
    );
  };

  // Apply filters and search
  const filteredNotifications = searchNotifications(
    filterNotifications(notifications, activeFilter),
    searchTerm
  );

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="h-screen max-h-screen overflow-hidden bg-gray-50 font-poppins">
      <div className="h-full flex flex-col p-4">
        {/* Header */}
        <div className="bg-gradient-to-r from-primaryPurple/80 to-indigo-600 text-white rounded-lg p-6 mb-4 flex-shrink-0">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Bell className="w-8 h-8" />
                {unreadCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold">Notifications</h1>
                <p className="text-purple-100">
                  Stay updated with your child's school activities
                </p>
              </div>
            </div>
            <button
              onClick={markAllAsRead}
              className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors text-sm"
            >
              Mark All Read
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-200 w-5 h-5" />
            <input
              type="text"
              placeholder="Search notifications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/20 rounded-lg placeholder-purple-200 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
            />
          </div>
        </div>

        {/* Filters and Content Container */}
        <div className="flex-1 min-h-0 bg-white rounded-lg shadow-sm overflow-hidden flex flex-col">
          {/* Filters for heading, all, unread, urgent, action required */}
          <div className="border-b border-gray-200 p-4 flex-shrink-0">
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center space-x-2 ${
                    activeFilter === filter.id
                      ? "bg-purple-100 text-purple-800 border border-purple-200"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <span>{filter.label}</span>
                  {filter.count > 0 && (
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        activeFilter === filter.id
                          ? "bg-purple-200"
                          : "bg-gray-200"
                      }`}
                    >
                      {filter.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Notifications List */}
          <div className="flex-1 overflow-y-auto">
            {filteredNotifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <Bell className="w-16 h-16 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No notifications found
                </h3>
                <p className="text-gray-500">
                  {searchTerm
                    ? "Try adjusting your search terms"
                    : "You're all caught up!"}
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {filteredNotifications.map((notification) => {
                  const IconComponent =
                    notification.icon || TYPE_ICONS[notification.type];

                  return (
                    <NotificationItem
                      key={notification.id}
                      notification={notification}
                      IconComponent={IconComponent}
                      onMarkAsRead={markAsRead}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        {/* <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-4 flex-shrink-0">
          {STATS_CONFIG.map((stat) => {
            const StatIcon = stat.icon;
            const count = stat.filter(notifications).length;

            return (
              <div
                key={stat.id}
                className="bg-white p-4 rounded-lg shadow-sm border"
              >
                <div className="flex items-center space-x-2">
                  <StatIcon
                    className={`w-5 h-5 ${stat.iconColor} flex-shrink-0`}
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {stat.label}
                  </span>
                </div>
                <p className="text-2xl font-bold text-gray-900 mt-2">{count}</p>
              </div>
            );
          })}
        </div> */}
      </div>
    </div>
  );
};

// Separate component for individual notification items
const NotificationItem = ({ notification, IconComponent, onMarkAsRead }) => {
  return (
    <div
      className={`p-6 hover:bg-gray-50 transition-colors cursor-pointer ${
        !notification.read ? "bg-blue-50 border-l-4 border-l-blue-500" : ""
      }`}
      onClick={() => onMarkAsRead(notification.id)}
    >
      <div className="flex items-start space-x-4">
        {/* Icon */}
        <div
          className={`p-2 rounded-full flex-shrink-0 ${
            PRIORITY_BG_COLORS[notification.priority]
          }`}
        >
          <IconComponent
            className={`w-6 h-6 ${PRIORITY_ICON_COLORS[notification.priority]}`}
          />
        </div>

        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
            <div className="flex items-center space-x-2 flex-wrap">
              <h3
                className={`font-semibold ${
                  !notification.read ? "text-gray-900" : "text-gray-700"
                }`}
              >
                {notification.title}
              </h3>
              <span
                className={`px-2 py-1 text-xs rounded-full border ${
                  PRIORITY_COLORS[notification.priority]
                }`}
              >
                {notification.priority.charAt(0).toUpperCase() +
                  notification.priority.slice(1)}
              </span>
              {notification.actionRequired && (
                <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full border border-blue-200">
                  Action Required
                </span>
              )}
            </div>
            <div className="flex items-center space-x-2 flex-shrink-0">
              <span className="text-sm text-gray-500">
                {formatTimestamp(notification.timestamp)}
              </span>
              <button className="p-1 hover:bg-gray-100 rounded">
                <MoreVertical className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Content */}
          <p className="text-gray-600 mb-3">{notification.message}</p>

          {/* Footer */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span className="flex items-center space-x-1">
                <span>From:</span>
                <span className="font-medium">{notification.teacher}</span>
              </span>
              <span className="flex items-center space-x-1">
                <span>Subject:</span>
                <span className="font-medium">{notification.subject}</span>
              </span>
            </div>

            {notification.actionRequired && (
              <div className="flex space-x-2 flex-shrink-0">
                <button className="px-4 py-2 bg-primaryPurple/70 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors">
                  Take Action
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors">
                  Remind Later
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
