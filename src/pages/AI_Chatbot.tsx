import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  Send, 
  User, 
  Heart,
  Shield,
  Lightbulb,
  AlertTriangle,
  RefreshCw,
  Sparkles,
  Menu,
  X,
  Loader2,
  Moon,
  Sun,
  Plus,
  ChevronRight,
  Zap
} from 'lucide-react';

// ===== INTERFACES FOR BACKEND COMMUNICATION =====
interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  message: string;
  timestamp: Date;
  isTyping?: boolean;
  error?: boolean;
}

interface ApiResponse {
  success: boolean;
  data?: {
    message: string;
    conversationId?: string;
  };
  error?: string;
}

interface ConversationContext {
  conversationId?: string;
  userId: string;
  sessionId: string;
  messageHistory: ChatMessage[];
}

// ===== HEALTH TOPICS CONFIGURATION =====
interface HealthTopic {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  prompt: string;
}

const healthTopics: HealthTopic[] = [
  {
    id: 'symptoms',
    title: 'Symptom Analysis',
    description: 'Understand common symptoms and their potential causes',
    icon: <Heart className="w-5 h-5" />,
    gradient: 'from-rose-500 to-pink-600',
    prompt: 'I want to learn about symptom analysis and understanding common symptoms'
  },
  {
    id: 'prevention',
    title: 'Disease Prevention',
    description: 'Learn about preventive measures and healthy habits',
    icon: <Shield className="w-5 h-5" />,
    gradient: 'from-emerald-500 to-teal-600',
    prompt: 'Tell me about disease prevention and healthy lifestyle habits'
  },
  {
    id: 'awareness',
    title: 'Health Awareness',
    description: 'Get informed about various health conditions',
    icon: <Lightbulb className="w-5 h-5" />,
    gradient: 'from-amber-500 to-orange-600',
    prompt: 'I would like to learn about health awareness and common health conditions'
  },
  {
    id: 'emergency',
    title: 'Emergency Signs',
    description: 'Recognize when to seek immediate medical help',
    icon: <AlertTriangle className="w-5 h-5" />,
    gradient: 'from-red-500 to-rose-600',
    prompt: 'What are the emergency warning signs I should know about?'
  }
];

// ===== API SERVICE CLASS FOR BACKEND COMMUNICATION =====   YUDHVEER[BACKEND]
class HealthChatAPI {
  private baseURL: string;
  private defaultHeaders: HeadersInit;

  constructor() {
    this.baseURL = 'http://localhost:3001/api';
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  async sendMessage(
    message: string, 
    context: ConversationContext
  ): Promise<ApiResponse> {
    try {
      await new Promise(resolve => setTimeout(resolve, 1200 + Math.random() * 800));
      
      return {
        success: false,
        error: 'Demo mode - backend not connected'
      };

    } catch (error) {
      console.error('API Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to connect to AI service'
      };
    }
  }

  async startNewConversation(userId: string): Promise<ApiResponse> {
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      return {
        success: false,
        error: 'Demo mode - backend not connected'
      };

    } catch (error) {
      return {
        success: false,
        error: 'Failed to start new conversation'
      };
    }
  }

  getFallbackResponse(message: string): string {
    const lowerMessage = message.toLowerCase();
    
    const responses = {
      pain: "I understand you're experiencing pain. While I'd normally provide personalized AI-powered guidance, I'm in demo mode. For pain management, consider rest, proper hydration, and consult a healthcare provider for persistent issues. Remember, severe or sudden pain always warrants immediate medical attention.",
      
      fever: "Fever can be concerning. In full mode, I'd analyze your specific symptoms and provide tailored advice. Generally, monitor your temperature, stay hydrated, rest, and contact a healthcare provider if fever exceeds 103°F (39.4°C) or persists beyond 3 days.",
      
      symptom: "Understanding symptoms is key to maintaining health. I can help identify patterns and suggest when professional care might be needed. Each symptom tells a story about what's happening in your body - timing, intensity, and accompanying signs all matter.",
      
      prevention: "Prevention is the best medicine! Key strategies include: regular exercise (150 mins/week), balanced nutrition rich in fruits and vegetables, adequate sleep (7-9 hours), stress management, regular health screenings, good hygiene, and staying up-to-date with vaccinations.",
      
      emergency: "🚨 Emergency warning signs requiring immediate medical attention include: chest pain, difficulty breathing, severe bleeding, loss of consciousness, severe burns, signs of stroke (FAST test), severe allergic reactions, and persistent severe pain. When in doubt, seek emergency care!",
      
      awareness: "Health awareness empowers you to make informed decisions. Key areas include understanding your family medical history, knowing your risk factors, recognizing early warning signs, maintaining preventive care schedules, and staying informed about health conditions relevant to your age and lifestyle."
    };

    for (const [key, response] of Object.entries(responses)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }
    
    return `Thank you for your question: "${message}". 

In full mode, I would provide detailed, evidence-based health guidance tailored to your specific needs. I can discuss symptoms, prevention strategies, when to seek care, and general wellness tips.

🔬 **Demo Features:**
• Intelligent symptom analysis
• Personalized health recommendations  
• Emergency situation recognition
• Disease prevention strategies
• Wellness planning assistance

For immediate health concerns, please consult with a healthcare professional.

**Note:** This interface demonstrates the AI health assistant capabilities. Full functionality requires backend connection.`;
  }
}

// ===== THEME CONTEXT =====
const useTheme = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
             (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return { isDark, toggleTheme };
};

// ===== MAIN COMPONENT =====
const AI_Chatbot: React.FC = () => {
  // ===== THEME =====
  const { isDark, toggleTheme } = useTheme();

  // ===== STATE MANAGEMENT =====
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'connecting'>('disconnected');

  // ===== REFS =====
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
  // ===== SERVICES =====
  const apiService = new HealthChatAPI();
  
  // ===== CONVERSATION CONTEXT =====
  const [conversationContext, setConversationContext] = useState<ConversationContext>({
    userId: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    sessionId: `session_${Date.now()}`,
    messageHistory: []
  });

  // ===== WELCOME MESSAGE =====
  const welcomeMessage: ChatMessage = {
    id: 'welcome_1',
    type: 'bot',
    message: "👋 Hello! I'm your **AI Health Assistant** - your intelligent companion for health information, symptom analysis, and wellness guidance.\n\n🎯 **What I can help with:**\n• Symptom analysis and understanding\n• Disease prevention strategies\n• Emergency warning signs\n• General health awareness\n• Wellness planning\n\n💡 **Get started** by asking a question or selecting a topic below!",
    timestamp: new Date()
  };

  // ===== EFFECTS =====
  useEffect(() => {
    initializeChat();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setConversationContext(prev => ({
      ...prev,
      messageHistory: messages
    }));
  }, [messages]);

  // ===== CORE FUNCTIONS =====
  
  const initializeChat = async () => {
    try {
      setMessages([welcomeMessage]);
      setConnectionStatus('connecting');
      
      const response = await apiService.startNewConversation(conversationContext.userId);
      
      if (response.success && response.data?.conversationId) {
        setConversationContext(prev => ({
          ...prev,
          conversationId: response.data!.conversationId
        }));
        setConnectionStatus('connected');
      } else {
        setConnectionStatus('disconnected');
      }
    } catch (err) {
      console.error('Initialization error:', err);
      setConnectionStatus('disconnected');
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleTopicClick = (topic: HealthTopic) => {
    if (isTyping) return;
    
    const userMessage: ChatMessage = {
      id: `user_${Date.now()}`,
      type: 'user',
      message: topic.prompt,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsSidebarOpen(false);
    handleSendToAI(topic.prompt);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isTyping) return;

    const userMessage: ChatMessage = {
      id: `user_${Date.now()}`,
      type: 'user',
      message: inputMessage.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const messageToSend = inputMessage.trim();
    setInputMessage('');
    setError(null);
    
    // Auto-resize textarea
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
    }
    
    await handleSendToAI(messageToSend);
  };

  const handleSendToAI = async (message: string) => {
    setIsTyping(true);
    
    try {
      const response = await apiService.sendMessage(message, conversationContext);
      
      if (response.success && response.data?.message) {
        const botMessage: ChatMessage = {
          id: `bot_${Date.now()}`,
          type: 'bot',
          message: response.data.message,
          timestamp: new Date()
        };

        setMessages(prev => [...prev, botMessage]);
        setConnectionStatus('connected');
        
        if (response.data.conversationId) {
          setConversationContext(prev => ({
            ...prev,
            conversationId: response.data!.conversationId
          }));
        }

      } else {
        throw new Error(response.error || 'AI service unavailable');
      }

    } catch (error) {
      console.error('Chat Error:', error);
      setConnectionStatus('disconnected');
      
      const errorMessage = error instanceof Error ? error.message : 'Connection failed';
      setError(`${errorMessage}`);
      
      const fallbackMessage: ChatMessage = {
        id: `bot_${Date.now()}`,
        type: 'bot',
        message: apiService.getFallbackResponse(message),
        timestamp: new Date(),
        error: true
      };

      setMessages(prev => [...prev, fallbackMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputMessage(e.target.value);
    
    // Auto-resize textarea
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
  };

  const clearChat = () => {
    setMessages([welcomeMessage]);
    setError(null);
    setIsSidebarOpen(false);
    initializeChat();
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getConnectionStatusInfo = () => {
    switch (connectionStatus) {
      case 'connected': 
        return { color: 'text-emerald-400', bg: 'bg-emerald-500', text: 'AI Connected' };
      case 'connecting': 
        return { color: 'text-amber-400', bg: 'bg-amber-500', text: 'Connecting...' };
      case 'disconnected': 
        return { color: 'text-rose-400', bg: 'bg-rose-500', text: 'Demo Mode' };
      default: 
        return { color: 'text-slate-400', bg: 'bg-slate-500', text: 'Offline' };
    }
  };

  const statusInfo = getConnectionStatusInfo();

  // ===== RENDER =====
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-all duration-300">
      <div className="container mx-auto px-4 py-6 max-w-7xl h-screen flex flex-col">
        
        {/* ===== HEADER ===== */}
        <div className="flex items-center justify-between mb-8 relative">
          <div className="flex-1 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 rounded-2xl mb-4 shadow-lg">
              <Bot className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent mb-2">
              AI Health Assistant
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Your intelligent guide to health awareness and wellness
            </p>
            
            {/* Connection Status Indicator */}
            <div className={`inline-flex items-center space-x-2 mt-3 px-3 py-1.5 rounded-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 ${statusInfo.color}`}>
              <div className={`w-2 h-2 rounded-full ${statusInfo.bg} ${connectionStatus === 'connecting' ? 'animate-pulse' : ''}`}></div>
              <span className="text-sm font-medium">{statusInfo.text}</span>
            </div>
          </div>
          
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="absolute top-0 right-0 p-3 rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 hover:bg-white dark:hover:bg-slate-800 transition-all duration-200 group"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-amber-500 group-hover:rotate-12 transition-transform duration-200" />
            ) : (
              <Moon className="w-5 h-5 text-slate-600 group-hover:-rotate-12 transition-transform duration-200" />
            )}
          </button>
        </div>

        {/* ===== MOBILE MENU BUTTON ===== */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="lg:hidden fixed top-6 left-4 z-50 p-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 rounded-xl shadow-lg hover:bg-white dark:hover:bg-slate-800 transition-all duration-200"
        >
          {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* ===== MAIN CONTENT ===== */}
        <div className="flex-1 flex gap-6 overflow-hidden">
          
          {/* ===== SIDEBAR ===== */}
          <div className={`fixed lg:static inset-y-0 left-0 z-40 w-80 lg:w-80 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-all duration-300 ease-in-out bg-white/80 dark:bg-slate-800/80 lg:bg-transparent lg:dark:bg-transparent backdrop-blur-sm lg:backdrop-blur-none border-r border-white/20 dark:border-slate-700/50 lg:border-r-0`}>
            <div className="h-full p-4 overflow-y-auto">
              <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-slate-700/50 p-6 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
                    <Sparkles className="w-5 h-5 mr-2 text-blue-500" />
                    Quick Topics
                  </h3>
                  <Zap className="w-4 h-4 text-amber-500 animate-pulse" />
                </div>
                
                <div className="space-y-4">
                  {healthTopics.map((topic) => (
                    <button
                      key={topic.id}
                      onClick={() => handleTopicClick(topic)}
                      disabled={isTyping}
                      className={`w-full group relative overflow-hidden rounded-xl p-4 text-left transition-all duration-300 transform hover:scale-102 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none bg-gradient-to-r ${topic.gradient} hover:shadow-xl`}
                    >
                      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative flex items-start space-x-3 text-white">
                        <div className="flex-shrink-0 p-2 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors duration-300">
                          {topic.icon}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="font-semibold text-sm mb-1 group-hover:translate-x-1 transition-transform duration-300">{topic.title}</h4>
                          <p className="text-xs opacity-90 leading-relaxed group-hover:translate-x-1 transition-transform duration-300 delay-75">{topic.description}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                    </button>
                  ))}
                </div>
                
                <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                  <button
                    onClick={clearChat}
                    disabled={isTyping}
                    className="w-full flex items-center justify-center space-x-2 p-3 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100/50 dark:bg-slate-700/50 hover:bg-slate-200/70 dark:hover:bg-slate-600/70 transition-all duration-200 rounded-xl disabled:opacity-50 group"
                  >
                    <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
                    <span className="text-sm font-medium">New Conversation</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ===== OVERLAY FOR MOBILE ===== */}
          {isSidebarOpen && (
            <div 
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          {/* ===== CHAT INTERFACE ===== */}
          <div className="flex-1 flex flex-col min-w-0">
            <div className="flex-1 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-slate-700/50 shadow-xl flex flex-col overflow-hidden">
              
              {/* ===== ERROR DISPLAY ===== */}
              {error && (
                <div className="p-4 bg-amber-50/80 dark:bg-amber-900/20 backdrop-blur-sm border-b border-amber-200/50 dark:border-amber-700/50">
                  <div className="flex items-center space-x-3 text-amber-700 dark:text-amber-300">
                    <div className="flex-shrink-0 p-1 bg-amber-200/50 dark:bg-amber-700/30 rounded-lg">
                      <AlertTriangle className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Connection Notice</p>
                      <p className="text-xs opacity-90">{error}</p>
                      <p className="text-xs mt-1 opacity-75">
                        💻 Backend integration required for full AI functionality
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* ===== CHAT MESSAGES ===== */}
              <div className="flex-1 p-6 overflow-y-auto space-y-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start space-x-3 max-w-[85%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${message.type === 'user' ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white' : message.error ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white' : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white'}`}>
                        {message.type === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                      </div>
                      <div className={`px-4 py-3 rounded-2xl shadow-lg backdrop-blur-sm border relative ${message.type === 'user' ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-blue-400/50 rounded-br-md' : message.error ? 'bg-amber-50/80 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 border-amber-200/50 dark:border-amber-700/50 rounded-bl-md' : 'bg-white/80 dark:bg-slate-700/80 text-slate-900 dark:text-slate-100 border-slate-200/50 dark:border-slate-600/50 rounded-bl-md'}`}>
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.message}</p>
                        <p className={`text-xs mt-2 ${message.type === 'user' ? 'text-blue-100' : message.error ? 'text-amber-600 dark:text-amber-300' : 'text-slate-500 dark:text-slate-400'}`}>
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* ===== TYPING INDICATOR ===== */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white flex items-center justify-center shadow-lg">
                        <Loader2 className="w-5 h-5 animate-spin" />
                      </div>
                      <div className="px-4 py-3 bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm rounded-2xl rounded-bl-md shadow-lg border border-slate-200/50 dark:border-slate-600/50">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* ===== INPUT AREA ===== */}
              <div className="p-6 border-t border-slate-200/50 dark:border-slate-700/50">
                <div className="flex items-end space-x-4">
                  <div className="flex-1 relative">
                    <textarea
                      ref={inputRef}
                      value={inputMessage}
                      onChange={handleInputChange}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask about symptoms, prevention, emergency signs, or any health topic..."
                      className="w-full px-4 py-3 pr-12 border border-slate-200 dark:border-slate-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/90 dark:bg-slate-700/90 backdrop-blur-sm text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 resize-none transition-all duration-200 shadow-sm"
                      rows={1}
                      style={{ minHeight: '48px', maxHeight: '120px' }}
                      disabled={isTyping}
                    />
                  </div>
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isTyping}
                    className="relative min-w-[48px] h-[48px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 disabled:from-slate-300 disabled:to-slate-400 dark:disabled:from-slate-600 dark:disabled:to-slate-700 text-white rounded-2xl transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-2xl transform hover:scale-110 disabled:transform-none disabled:shadow-sm group overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-white/20 transform scale-0 group-hover:scale-100 transition-transform duration-300 rounded-2xl"></div>
                    <div className="relative z-10">
                      {isTyping ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                      )}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  </button>
                </div>
                
                {/* ===== MEDICAL DISCLAIMER ===== */}
                <div className="mt-4 text-xs text-slate-500 dark:text-slate-400 text-center bg-slate-50/50 dark:bg-slate-800/50 rounded-lg p-3 border border-slate-200/50 dark:border-slate-700/50">
                  <AlertTriangle className="w-3 h-3 inline mr-1 text-amber-500" />
                  <span className="font-medium">Medical Disclaimer:</span> This AI provides general health information only. Always consult healthcare professionals for medical advice, diagnosis, or treatment.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AI_Chatbot;