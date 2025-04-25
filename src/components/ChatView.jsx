import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  FileText,
  ThumbsUp,
  ThumbsDown,
  MoreHorizontal,
  Menu,
  Mic,
  Download,
  ChevronDown,
  X,
} from 'lucide-react';
import { Link } from 'react-router-dom';

function ChatView() {
  const currentDate = new Date().toLocaleString();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'Medicare Assistant',
      text: 'Hello, I am a Medicare assistance agent. How may I help you with your healthcare needs today?',
      date: currentDate,
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [selectedChatId, setSelectedChatId] = useState(null); // Track selected chat
  const dropdownRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Sample previous chats with message history
  const previousChats = [
    {
      id: 1,
      title: 'Medicare Part A Coverage',
      date: 'Apr 23, 2025',
      messages: [
        {
          sender: 'User',
          text: 'What does Medicare Part A cover?',
          date: 'Apr 23, 2025, 10:00 AM',
        },
        {
          sender: 'Medicare Assistant',
          text: 'Medicare Part A covers hospital stays, skilled nursing facility care, hospice, and some home health care.',
          date: 'Apr 23, 2025, 10:02 AM',
        },
      ],
    },
    {
      id: 2,
      title: 'Prescription Plan Questions',
      date: 'Apr 20, 2025',
      messages: [
        {
          sender: 'User',
          text: 'How do I enroll in a prescription drug plan?',
          date: 'Apr 20, 2025, 2:00 PM',
        },
        {
          sender: 'Medicare Assistant',
          text: 'You can enroll in a Medicare Part D plan during the annual enrollment period or when you first become eligible.',
          date: 'Apr 20, 2025, 2:05 PM',
        },
      ],
    },
    {
      id: 3,
      title: 'Doctor Referral Process',
      date: 'Apr 18, 2025',
      messages: [
        {
          sender: 'User',
          text: 'How do I get a referral to a specialist?',
          date: 'Apr 18, 2025, 9:00 AM',
        },
        {
          sender: 'Medicare Assistant',
          text: 'You may need a referral from your primary care doctor depending on your Medicare plan. Contact your plan provider for details.',
          date: 'Apr 18, 2025, 9:10 AM',
        },
      ],
    },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Auto-scroll to the latest message
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Handle sending a message
  const handleSendMessage = () => {
    if (inputText.trim()) {
      const newMessage = {
        sender: 'User',
        text: inputText,
        date: new Date().toLocaleString(),
      };
      setMessages([...messages, newMessage]);
      setInputText('');

      // Update the selected chat's message history if applicable
      if (selectedChatId) {
        const updatedChats = previousChats.map((chat) =>
          chat.id === selectedChatId
            ? { ...chat, messages: [...chat.messages, newMessage] }
            : chat
        );
        console.log('Updated chats:', updatedChats); // Replace with backend update
      }

      // Simulate assistant response (replace with API call in production)
      setTimeout(() => {
        const assistantResponse = {
          sender: 'Medicare Assistant',
          text: 'Thank you for your message! How can I assist you further?',
          date: new Date().toLocaleString(),
        };
        setMessages((prev) => [...prev, assistantResponse]);

        if (selectedChatId) {
          const updatedChats = previousChats.map((chat) =>
            chat.id === selectedChatId
              ? { ...chat, messages: [...chat.messages, assistantResponse] }
              : chat
          );
          console.log('Updated chats with assistant response:', updatedChats);
        }
      }, 1000);
    }
  };

  // Handle feedback (e.g., thumbs up/down)
  const handleFeedback = (type, messageIndex) => {
    console.log(`Feedback for message ${messageIndex}: ${type}`);
    // Implement API call for feedback
  };

  // Handle key press for sending message
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Handle selecting a previous chat
  const handleSelectChat = (chatId) => {
    const selectedChat = previousChats.find((chat) => chat.id === chatId);
    if (selectedChat) {
      setMessages(selectedChat.messages);
      setSelectedChatId(chatId);
      setSidebarOpen(false); // Close sidebar on mobile after selection
    }
  };

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
    console.log('Sidebar toggled, new value:', !sidebarOpen);
  };

  return (
    <>
      <div className="flex flex-col h-screen bg-gray-50">
        {/* Chat Interface Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar for previous chats - MOBILE: only visible when sidebarOpen is true */}
          {/* DESKTOP: always visible regardless of sidebarOpen value */}
          <div
            className={`${
              sidebarOpen ? 'block' : 'hidden'
            } w-64 bg-white border-r border-gray-200 overflow-y-auto fixed h-full z-30 md:relative md:block md:w-1/4`}
          >
            <div className="p-4">
              <h3 className="font-medium text-gray-700 mb-4">Previous Conversations</h3>
              {previousChats.map((chat) => (
                <div
                  key={chat.id}
                  className={`mb-3 p-3 rounded-md cursor-pointer ${
                    selectedChatId === chat.id ? 'bg-teal-100' : 'hover:bg-gray-100'
                  }`}
                  onClick={() => handleSelectChat(chat.id)}
                >
                  <div className="font-medium text-gray-800">{chat.title}</div>
                  <div className="text-sm text-gray-500">{chat.date}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile backdrop for sidebar */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
              onClick={toggleSidebar}
            ></div>
          )}

          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Chat header */}
            <div className="bg-teal-800 text-white px-4 py-3 flex items-center justify-between">
              <div className="flex items-center">
                <button
                  aria-label="Toggle sidebar"
                  aria-expanded={sidebarOpen}
                  onClick={toggleSidebar}
                  className="hover:bg-teal-700 rounded-full p-2 transition-colors mr-3"
                >
                  {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
                <span className="font-medium">Medicare Assistant</span>
              </div>
              <div className="flex items-center gap-4">
                <Link to="/" className="text-white hover:underline text-sm">
                  Home
                </Link>
                {/* Profile Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    aria-label="Toggle profile dropdown"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 focus:outline-none"
                  >
                    <img
                      src="https://i.pravatar.cc/40"
                      alt="Profile"
                      className="w-8 h-8 rounded-full border-2 border-white"
                    />
                    <ChevronDown size={16} />
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Profile
                      </Link>
                      <Link
                        to="/settings"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Settings
                      </Link>
                      <button
                        onClick={() => {
                          console.log('Logout clicked');
                          localStorage.removeItem('authToken');
                          window.location.href = '/login';
                        }}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Chat messages */}
            <div
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto p-4 bg-gray-50"
            >
              {messages.map((message, index) => (
                <div key={index} className="flex gap-3 mb-6">
                  <div
                    className={`${
                      message.sender === 'User' ? 'bg-blue-600' : 'bg-teal-800'
                    } rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0`}
                  >
                    <span className="text-white font-medium">
                      {message.sender === 'User' ? 'U' : 'M'}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{message.sender}</span>
                      <span className="text-gray-500 text-sm">{message.date}</span>
                    </div>
                    <div
                      className={`mt-2 ${
                        message.sender === 'User'
                          ? 'bg-blue-100 border-blue-200'
                          : 'bg-white border-gray-200'
                      } border rounded-md p-4 shadow-sm`}
                    >
                      <p>{message.text}</p>
                    </div>
                    {message.sender !== 'User' && (
                      <div className="flex gap-2 mt-2">
                        <button
                          aria-label="View details"
                          className="text-gray-500 hover:text-gray-700 p-1 transition-colors"
                          onClick={() => console.log('View details clicked')}
                        >
                          <FileText size={18} />
                        </button>
                        <button
                          aria-label="Like message"
                          className="text-gray-500 hover:text-green-600 p-1 transition-colors"
                          onClick={() => handleFeedback('positive', index)}
                        >
                          <ThumbsUp size={18} />
                        </button>
                        <button
                          aria-label="Dislike message"
                          className="text-gray-500 hover:text-red-600 p-1 transition-colors"
                          onClick={() => handleFeedback('negative', index)}
                        >
                          <ThumbsDown size={18} />
                        </button>
                        <button
                          aria-label="More options"
                          className="text-gray-500 hover:text-gray-700 p-1 transition-colors"
                          onClick={() => console.log('More options clicked')}
                        >
                          <MoreHorizontal size={18} />
                        </button>
                        <button
                          aria-label="Download message"
                          className="text-gray-500 hover:text-blue-600 p-1 transition-colors"
                          onClick={() => console.log('Download clicked')}
                        >
                          <Download size={18} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* User Input Area */}
            <div className="border-t border-gray-200 p-4 bg-white">
              <div className="flex items-center gap-2">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                  rows="2"
                />
                <button
                  aria-label="Send message"
                  onClick={handleSendMessage}
                  className="p-2 bg-teal-800 text-white rounded-md hover:bg-teal-700 transition-colors"
                >
                  <Send size={18} />
                </button>
                <button
                  aria-label="Record voice message"
                  className="p-2 text-gray-500 hover:text-teal-700 transition-colors"
                  onClick={() => console.log('Voice message clicked')}
                >
                  <Mic size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatView;