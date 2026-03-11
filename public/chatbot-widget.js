(function() {
    'use strict';
    
    // Configuration
    const config = {
        backendUrl: 'https://your-render-app.onrender.com',
        primaryColor: '#667eea',
        secondaryColor: '#764ba2',
        position: 'bottom-right',
        welcomeMessage: 'Hello! Welcome to Semicom Consultancy. How can I assist you today?',
        botName: 'SERA',
        autoOpen: false,
        requireName: false
    };
    
    // User configuration override
    window.ChatbotConfig = window.ChatbotConfig || {};
    Object.assign(config, window.ChatbotConfig);
    
    // Create widget container
    const widgetContainer = document.createElement('div');
    widgetContainer.id = 'chatbot-widget-container';
    
    // Set position with responsive adjustments
    const positions = {
        'bottom-right': { bottom: '10px', right: '10px' },
        'bottom-left': { bottom: '10px', left: '10px' },
        'top-right': { top: '10px', right: '10px' },
        'top-left': { top: '10px', left: '10px' }
    };
    
    Object.assign(widgetContainer.style, {
        position: 'fixed',
        zIndex: '999999',
        fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif`,
        ...positions[config.position] || positions['bottom-right']
    });
    
    // Create viewport meta tag if not exists
    if (!document.querySelector('meta[name="viewport"]')) {
        const meta = document.createElement('meta');
        meta.name = 'viewport';
        meta.content = 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover';
        document.head.appendChild(meta);
    }
    
    // Create HTML structure
    widgetContainer.innerHTML = `
        <div class="chatbot-window" id="chatbotWindow">
            <div class="chatbot-header">
                <div class="header-content">
                    <div class="bot-avatar">
                        🤖
                    </div>
                    <div class="header-text">
                        <h3>${config.botName}</h3>
                        <p class="status online">Online</p>
                    </div>
                </div>
                <button class="close-btn" id="chatbotCloseBtn" aria-label="Close chatbot">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13 1L1 13M1 1L13 13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                </button>
            </div>
            
            <div class="chat-messages" id="chatMessages">
                <!-- Messages will appear here -->
            </div>
            
            <div class="input-area">
                <div class="input-container">
                    <input type="text" id="userInput" placeholder="Type your message..." aria-label="Type your message">
                    <button id="sendBtn" aria-label="Send message">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
                <p class="disclaimer">Powered by Semicom Consultancy Services</p>
            </div>
        </div>
        
        <button class="chatbot-toggle-btn" id="chatbotToggleBtn" aria-label="Open chatbot">
            <span class="chat-icon">💬</span>
            <span class="unread-badge" id="unreadBadge"></span>
        </button>
    `;
    
    // Inject CSS with SMALLER MOBILE WINDOW
    const style = document.createElement('style');
    style.textContent = `
        /* ===== CSS VARIABLES FOR RESPONSIVE DESIGN ===== */
        :root {
            --mobile-breakpoint: 768px;
            --tablet-breakpoint: 1024px;
            --small-phone: 400px;
            --very-small-phone: 360px;
            --extra-small-phone: 320px;
            --short-screen: 700px;
            --very-short-screen: 500px;
        }
        
        /* ===== GLOBAL RESET ===== */
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }
        
        /* ===== CHATBOT CONTAINER ===== */
        #chatbot-widget-container {
            /* Position already set via JavaScript */
        }
        
        /* ===== CHATBOT TOGGLE BUTTON ===== */
        /* Base style - EXTRA SMALL devices (320px and below) */
        .chatbot-toggle-btn {
            width: 44px;
            height: 44px;
            border-radius: 50%;
            background: linear-gradient(135deg, ${config.primaryColor}, ${config.secondaryColor});
            border: none;
            color: white;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            z-index: 1000;
            transition: all 0.3s ease;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
            touch-action: manipulation;
            -webkit-tap-highlight-color: transparent;
        }
        
        .chatbot-toggle-btn:hover,
        .chatbot-toggle-btn:active {
            transform: scale(1.05);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
        }
        
        .chatbot-toggle-btn.pulse {
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(102, 126, 234, 0.7); }
            70% { box-shadow: 0 0 0 8px rgba(102, 126, 234, 0); }
            100% { box-shadow: 0 0 0 0 rgba(102, 126, 234, 0); }
        }
        
        .chat-icon {
            font-size: 20px;
            display: block;
            line-height: 1;
        }
        
        .unread-badge {
            position: absolute;
            top: -4px;
            right: -4px;
            background: #ff4757;
            color: white;
            font-size: 10px;
            min-width: 16px;
            height: 16px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 4px;
            font-weight: bold;
        }
        
        /* ===== CHAT WINDOW ===== */
        /* Base style - SMALLER WINDOW on mobile (not full screen) */
        .chatbot-window {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) translateY(20px);
            width: 90vw;
            max-width: 400px;
            height: 70vh;
            max-height: 600px;
            background: white;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 999998;
            border-radius: 20px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
        }
        
        .chatbot-window.open {
            opacity: 1;
            transform: translate(-50%, -50%) translateY(0);
            visibility: visible;
        }
        
        /* For very small screens, adjust size */
        @media (max-height: 600px) {
            .chatbot-window {
                height: 80vh;
                max-height: 80vh;
            }
        }
        
        /* ===== CHAT HEADER ===== */
        .chatbot-header {
            background: linear-gradient(135deg, ${config.primaryColor}, ${config.secondaryColor});
            padding: clamp(10px, 3vw, 15px);
            color: white;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-shrink: 0;
            min-height: 56px;
            position: relative;
            z-index: 1;
            border-radius: 20px 20px 0 0;
        }
        
        .header-content {
            display: flex;
            align-items: center;
            gap: clamp(8px, 2vw, 12px);
            min-width: 0;
            flex: 1;
        }
        
        .bot-avatar {
            width: clamp(36px, 10vw, 44px);
            height: clamp(36px, 10vw, 44px);
            min-width: clamp(36px, 10vw, 44px);
            background: rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: clamp(18px, 5vw, 22px);
        }
        
        .header-text {
            flex: 1;
            min-width: 0;
            overflow: hidden;
        }
        
        .header-text h3 {
            margin: 0;
            font-size: clamp(15px, 4vw, 18px);
            font-weight: 600;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            line-height: 1.2;
        }
        
        .status {
            font-size: clamp(10px, 2.5vw, 12px);
            opacity: 0.9;
            margin-top: 1px;
        }
        
        .status.online {
            color: #4ade80;
        }
        
        .close-btn {
            background: rgba(255, 255, 255, 0.2);
            border: none;
            width: clamp(30px, 8vw, 36px);
            height: clamp(30px, 8vw, 36px);
            border-radius: 50%;
            color: white;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            margin-left: 8px;
            transition: background 0.2s;
            -webkit-tap-highlight-color: transparent;
        }
        
        .close-btn:hover,
        .close-btn:active {
            background: rgba(255, 255, 255, 0.3);
        }
        
        .close-btn svg {
            width: clamp(12px, 3vw, 14px);
            height: clamp(12px, 3vw, 14px);
        }
        
        /* ===== CHAT MESSAGES ===== */
        .chat-messages {
            flex: 1;
            padding: clamp(10px, 2.5vw, 15px);
            overflow-y: auto;
            background: #f8fafc;
            display: flex;
            flex-direction: column;
            gap: clamp(8px, 2vw, 12px);
            -webkit-overflow-scrolling: touch;
            overscroll-behavior: contain;
            scrollbar-width: thin;
            scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
            min-height: 0;
        }
        
        .chat-messages::-webkit-scrollbar {
            width: 4px;
        }
        
        .chat-messages::-webkit-scrollbar-track {
            background: transparent;
        }
        
        .chat-messages::-webkit-scrollbar-thumb {
            background: rgba(0, 0, 0, 0.2);
            border-radius: 2px;
        }
        
        .message {
            max-width: 85%;
            padding: clamp(10px, 2.5vw, 14px);
            border-radius: 18px;
            word-wrap: break-word;
            overflow-wrap: break-word;
            animation: messageIn 0.3s ease;
            position: relative;
            line-height: 1.4;
        }
        
        @keyframes messageIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .user-message {
            align-self: flex-end;
            background: linear-gradient(135deg, ${config.primaryColor}, ${config.secondaryColor});
            color: white;
            border-bottom-right-radius: 5px;
        }
        
        .bot-message {
            align-self: flex-start;
            background: white;
            color: #333;
            border: 1px solid #e2e8f0;
            border-bottom-left-radius: 5px;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        }
        
        .message-content {
            font-size: clamp(13px, 3.5vw, 15px);
            line-height: 1.4;
        }
        
        .message-content strong {
            font-weight: 600;
        }
        
        .message-content em {
            font-style: italic;
        }
        
        .message-content code {
            font-family: 'Courier New', monospace;
            background: rgba(0, 0, 0, 0.05);
            padding: 2px 4px;
            border-radius: 3px;
            font-size: 0.9em;
        }
        
        .message-time {
            font-size: clamp(9px, 2.5vw, 11px);
            opacity: 0.7;
            margin-top: 4px;
            text-align: right;
        }
        
        .user-message .message-time {
            color: rgba(255, 255, 255, 0.8);
        }
        
        .bot-message .message-time {
            color: #666;
        }
        
        /* ===== INPUT AREA ===== */
        .input-area {
            padding: clamp(10px, 2.5vw, 15px);
            border-top: 1px solid #e2e8f0;
            background: white;
            flex-shrink: 0;
            position: relative;
            z-index: 1;
            position: sticky;
            bottom: 0;
        }
        
        .input-container {
            display: flex;
            gap: clamp(6px, 1.5vw, 10px);
        }
        
        .input-container input {
            flex: 1;
            padding: clamp(10px, 2.5vw, 14px);
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            font-size: clamp(14px, 3.5vw, 16px);
            outline: none;
            background: white;
            min-height: 44px;
            -webkit-appearance: none;
            appearance: none;
            -webkit-user-select: text;
            user-select: text;
        }
        
        .input-container input:focus {
            border-color: ${config.primaryColor};
            box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.1);
        }
        
        .input-container button {
            width: clamp(44px, 12vw, 50px);
            min-width: clamp(44px, 12vw, 50px);
            height: clamp(44px, 12vw, 50px);
            border-radius: 12px;
            background: linear-gradient(135deg, ${config.primaryColor}, ${config.secondaryColor});
            border: none;
            color: white;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: opacity 0.2s;
            -webkit-tap-highlight-color: transparent;
            position: relative;
            z-index: 2;
        }
        
        .input-container button:hover,
        .input-container button:active {
            opacity: 0.9;
        }
        
        .input-container button svg {
            width: clamp(16px, 4vw, 20px);
            height: clamp(16px, 4vw, 20px);
        }
        
        .disclaimer {
            font-size: clamp(9px, 2.5vw, 11px);
            color: #94a3b8;
            text-align: center;
            margin: clamp(6px, 1.5vw, 10px) 0 0 0;
            line-height: 1.2;
        }
        
        /* ===== TYPING INDICATOR ===== */
        .typing-indicator {
            display: flex;
            gap: 4px;
            padding: clamp(10px, 2.5vw, 14px);
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 18px;
            border-bottom-left-radius: 5px;
            align-self: flex-start;
            margin-bottom: 10px;
            width: fit-content;
        }
        
        .typing-indicator span {
            width: 7px;
            height: 7px;
            background: #94a3b8;
            border-radius: 50%;
            animation: bounce 1.4s infinite ease-in-out;
        }
        
        .typing-indicator span:nth-child(1) { animation-delay: -0.32s; }
        .typing-indicator span:nth-child(2) { animation-delay: -0.16s; }
        
        @keyframes bounce {
            0%, 80%, 100% { transform: scale(0); }
            40% { transform: scale(1); }
        }
        
        /* ===== KEYBOARD ADJUSTMENTS ===== */
        .keyboard-open .chatbot-window {
            height: 80vh !important;
            max-height: 80vh !important;
            top: 10vh !important;
            transform: translate(-50%, 0) !important;
        }
        
        /* ===== RESPONSIVE MEDIA QUERIES ===== */
        
        /* SMALL TABLETS and LARGE PHONES (600px and up) */
        @media (min-width: 600px) {
            .chatbot-window {
                width: 380px;
                height: 550px;
                bottom: 80px;
                top: auto;
                left: auto;
                right: 20px;
                transform: translateY(20px);
                max-width: none;
                max-height: none;
            }
            
            .chatbot-window.open {
                transform: translateY(0);
            }
            
            ${config.position === 'bottom-left' ? '.chatbot-window { right: auto; left: 20px; bottom: 80px; }' : ''}
            ${config.position === 'top-right' ? '.chatbot-window { bottom: auto; top: 80px; transform: translateY(20px); } .chatbot-window.open { transform: translateY(0); }' : ''}
            ${config.position === 'top-left' ? '.chatbot-window { bottom: auto; top: 80px; left: 20px; right: auto; transform: translateY(20px); } .chatbot-window.open { transform: translateY(0); }' : ''}
            
            .chatbot-toggle-btn {
                width: 56px;
                height: 56px;
            }
            
            .chat-icon {
                font-size: 24px;
            }
            
            .unread-badge {
                top: -5px;
                right: -5px;
                min-width: 18px;
                height: 18px;
                font-size: 11px;
            }
        }
        
        /* TABLETS (768px and up) */
        @media (min-width: 768px) {
            .chatbot-window {
                width: 400px;
                height: 600px;
            }
            
            .chatbot-toggle-btn {
                width: 60px;
                height: 60px;
            }
        }
        
        /* DESKTOPS (1024px and up) */
        @media (min-width: 1024px) {
            .chatbot-window {
                width: 420px;
                height: 650px;
            }
        }
        
        /* ===== EXTRA SMALL DEVICES (below 400px) ===== */
        @media (max-width: 400px) {
            .chatbot-window {
                width: 95vw;
                height: 65vh;
            }
            
            .chatbot-toggle-btn {
                width: 40px;
                height: 40px;
                bottom: 8px;
                right: 8px;
            }
            
            ${config.position === 'bottom-left' ? '.chatbot-toggle-btn { left: 8px; right: auto; }' : ''}
            ${config.position === 'top-right' ? '.chatbot-toggle-btn { top: 8px; bottom: auto; }' : ''}
            ${config.position === 'top-left' ? '.chatbot-toggle-btn { top: 8px; bottom: auto; left: 8px; right: auto; }' : ''}
            
            .chat-icon {
                font-size: 18px;
            }
            
            .unread-badge {
                top: -3px;
                right: -3px;
                min-width: 14px;
                height: 14px;
                font-size: 9px;
            }
            
            .message {
                max-width: 90%;
                padding: 9px 12px;
            }
            
            .message-content {
                font-size: 13px;
            }
            
            .input-container input {
                padding: 9px 12px;
                font-size: 13px;
                min-height: 40px;
            }
            
            .input-container button {
                width: 40px;
                min-width: 40px;
                height: 40px;
            }
        }
        
        /* VERY SMALL DEVICES (below 360px) */
        @media (max-width: 360px) {
            .chatbot-window {
                width: 95vw;
                height: 60vh;
            }
            
            .chatbot-toggle-btn {
                width: 38px;
                height: 38px;
            }
            
            .chat-icon {
                font-size: 16px;
            }
            
            .unread-badge {
                min-width: 12px;
                height: 12px;
                font-size: 8px;
            }
            
            .chatbot-header {
                padding: 8px 10px;
                min-height: 50px;
            }
            
            .bot-avatar {
                width: 32px;
                height: 32px;
                min-width: 32px;
                font-size: 16px;
            }
            
            .header-text h3 {
                font-size: 14px;
            }
            
            .status {
                font-size: 9px;
            }
            
            .chat-messages {
                padding: 8px;
                gap: 6px;
            }
            
            .message {
                max-width: 92%;
                padding: 8px 10px;
            }
            
            .message-content {
                font-size: 12px;
            }
        }
        
        /* EXTRA SMALL DEVICES (below 320px) */
        @media (max-width: 320px) {
            .chatbot-window {
                width: 98vw;
                height: 55vh;
            }
            
            .chatbot-toggle-btn {
                width: 36px;
                height: 36px;
                bottom: 6px;
                right: 6px;
            }
            
            ${config.position === 'bottom-left' ? '.chatbot-toggle-btn { left: 6px; right: auto; }' : ''}
            ${config.position === 'top-right' ? '.chatbot-toggle-btn { top: 6px; bottom: auto; }' : ''}
            ${config.position === 'top-left' ? '.chatbot-toggle-btn { top: 6px; bottom: auto; left: 6px; right: auto; }' : ''}
            
            .chat-icon {
                font-size: 15px;
            }
        }
        
        /* ===== SHORT SCREENS ADJUSTMENTS ===== */
        
        /* For screens with height less than 700px */
        @media (max-height: 700px) {
            .chatbot-window {
                height: 65vh;
            }
        }
        
        /* For very short screens (below 500px) */
        @media (max-height: 500px) {
            .chatbot-window {
                height: 70vh;
            }
            
            .chatbot-header {
                min-height: 48px;
                padding: 8px 10px;
            }
            
            .bot-avatar {
                width: 32px;
                height: 32px;
                min-width: 32px;
                font-size: 16px;
            }
            
            .header-text h3 {
                font-size: 14px;
            }
            
            .chat-messages {
                padding: 8px;
                gap: 6px;
            }
            
            .message {
                padding: 6px 10px;
            }
            
            .message-content {
                font-size: 12px;
                line-height: 1.3;
            }
            
            .input-area {
                padding: 8px;
            }
            
            .input-container input {
                padding: 8px 10px;
                font-size: 13px;
                min-height: 38px;
            }
            
            .input-container button {
                width: 38px;
                min-width: 38px;
                height: 38px;
            }
            
            .disclaimer {
                margin-top: 6px;
            }
        }
        
        /* ===== LANDSCAPE ORIENTATION ===== */
        @media (orientation: landscape) and (max-height: 600px) {
            .chatbot-window {
                height: 80vh;
                width: 85vw;
            }
            
            .chatbot-header {
                min-height: 44px;
                padding: 6px 10px;
            }
            
            .chat-messages {
                padding: 8px;
                gap: 6px;
            }
        }
        
        /* ===== DARK MODE SUPPORT ===== */
        @media (prefers-color-scheme: dark) {
            .chatbot-window {
                background: #1a1a1a;
                color: white;
            }
            
            .chat-messages {
                background: #2d2d2d;
            }
            
            .bot-message {
                background: #2d2d2d;
                border-color: #404040;
                color: #e0e0e0;
            }
            
            .input-area {
                background: #1a1a1a;
                border-color: #404040;
            }
            
            .input-container input {
                background: #2d2d2d;
                border-color: #404040;
                color: white;
            }
            
            .input-container input:focus {
                border-color: ${config.primaryColor};
                box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2);
            }
            
            .typing-indicator {
                background: #2d2d2d;
                border-color: #404040;
            }
            
            .disclaimer {
                color: #888;
            }
        }
        
        /* ===== ACCESSIBILITY IMPROVEMENTS ===== */
        @media (prefers-reduced-motion: reduce) {
            .chatbot-window,
            .message,
            .chatbot-toggle-btn {
                transition: none;
                animation: none;
            }
            
            .chatbot-toggle-btn.pulse {
                animation: none;
            }
        }
        
        /* ===== KEYBOARD NAVIGATION ===== */
        .chatbot-toggle-btn:focus-visible,
        .close-btn:focus-visible,
        #sendBtn:focus-visible,
        #userInput:focus-visible {
            outline: 2px solid ${config.primaryColor};
            outline-offset: 2px;
        }
        
        /* Hide focus outline for mouse users but keep for keyboard */
        .chatbot-toggle-btn:focus:not(:focus-visible),
        .close-btn:focus:not(:focus-visible),
        #sendBtn:focus:not(:focus-visible) {
            outline: none;
        }
        
        /* ===== PERFORMANCE OPTIMIZATIONS ===== */
        .chatbot-window,
        .chat-messages,
        .message {
            will-change: transform, opacity;
            backface-visibility: hidden;
        }
        
        /* ===== PRINT STYLES ===== */
        @media print {
            #chatbot-widget-container {
                display: none !important;
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(widgetContainer);
    
    // State management
    const state = {
        isOpen: false,
        messages: [],
        unreadCount: 0,
        userData: {
            name: localStorage.getItem('chatbotUserName') || '',
            email: localStorage.getItem('chatbotUserEmail') || ''
        },
        isMobile: /iPhone|iPad|iPod|Android/i.test(navigator.userAgent),
        viewportHeight: window.innerHeight,
        isKeyboardOpen: false,
        originalViewportHeight: window.innerHeight
    };

    // Initialize
    function init() {
        bindEvents();
        loadMessages();
        startAutoPing();
        updateViewportHeight();
        
        // Add initial welcome message
        setTimeout(() => {
            if (document.getElementById('chatMessages').children.length === 0) {
                addMessage(config.welcomeMessage, 'bot');
            }
        }, 300);
        
        // Auto-open if configured
        if (config.autoOpen) {
            setTimeout(() => toggleChatbot(), 1000);
        }
        
        // Add pulse animation
        const toggleBtn = document.getElementById('chatbotToggleBtn');
        toggleBtn.classList.add('pulse');
        setTimeout(() => toggleBtn.classList.remove('pulse'), 5000);
        
        // Listen for resize
        window.addEventListener('resize', handleResize);
        window.addEventListener('orientationchange', handleOrientationChange);
        
        // Detect keyboard visibility on mobile
        if (state.isMobile) {
            setupKeyboardDetection();
        }
    }
    
    // Setup keyboard detection
    function setupKeyboardDetection() {
        const chatbotWindow = document.getElementById('chatbotWindow');
        const userInput = document.getElementById('userInput');
        
        // Detect when keyboard opens
        userInput.addEventListener('focus', () => {
            state.isKeyboardOpen = true;
            chatbotWindow.classList.add('keyboard-open');
            
            // Adjust window position for keyboard
            setTimeout(() => {
                const chatMessages = document.getElementById('chatMessages');
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 300);
        });
        
        // Detect when keyboard closes
        userInput.addEventListener('blur', () => {
            state.isKeyboardOpen = false;
            chatbotWindow.classList.remove('keyboard-open');
        });
        
        // Detect resize (keyboard might trigger resize)
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                const newHeight = window.innerHeight;
                const diff = Math.abs(state.originalViewportHeight - newHeight);
                
                if (diff > 100) { // Significant height change (keyboard)
                    state.isKeyboardOpen = newHeight < state.originalViewportHeight;
                    if (state.isKeyboardOpen) {
                        chatbotWindow.classList.add('keyboard-open');
                    } else {
                        chatbotWindow.classList.remove('keyboard-open');
                    }
                }
            }, 100);
        });
    }
    
    // Update viewport height
    function updateViewportHeight() {
        state.viewportHeight = window.innerHeight;
        state.originalViewportHeight = window.innerHeight;
    }
    
    function handleResize() {
        updateViewportHeight();
        if (state.isOpen) {
            // Adjust for keyboard
            if (state.isMobile) {
                const currentHeight = window.innerHeight;
                const isKeyboardNowOpen = currentHeight < state.originalViewportHeight * 0.8;
                
                if (isKeyboardNowOpen !== state.isKeyboardOpen) {
                    state.isKeyboardOpen = isKeyboardNowOpen;
                    const chatbotWindow = document.getElementById('chatbotWindow');
                    if (isKeyboardNowOpen) {
                        chatbotWindow.classList.add('keyboard-open');
                    } else {
                        chatbotWindow.classList.remove('keyboard-open');
                    }
                }
            }
            
            // Scroll to bottom
            setTimeout(() => {
                const chatMessages = document.getElementById('chatMessages');
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 100);
        }
    }
    
    function handleOrientationChange() {
        setTimeout(() => {
            updateViewportHeight();
            if (state.isOpen) {
                const chatMessages = document.getElementById('chatMessages');
                chatMessages.scrollTop = chatMessages.scrollHeight;
                
                if (state.isKeyboardOpen) {
                    const userInput = document.getElementById('userInput');
                    userInput.focus();
                }
            }
        }, 500);
    }
    
    // Event binding
    function bindEvents() {
        const toggleBtn = document.getElementById('chatbotToggleBtn');
        const closeBtn = document.getElementById('chatbotCloseBtn');
        const sendBtn = document.getElementById('sendBtn');
        const userInput = document.getElementById('userInput');
        
        toggleBtn.addEventListener('click', toggleChatbot);
        closeBtn.addEventListener('click', closeChatbot);
        sendBtn.addEventListener('click', sendMessage);
        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
        
        // Touch events for mobile
        toggleBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            toggleBtn.classList.add('active');
        }, { passive: false });
        
        toggleBtn.addEventListener('touchend', (e) => {
            e.preventDefault();
            toggleBtn.classList.remove('active');
            toggleChatbot();
        }, { passive: false });
        
        // Handle virtual keyboard
        userInput.addEventListener('focus', handleMobileKeyboard);
        
        // Close when clicking outside
        if (!state.isMobile) {
            document.addEventListener('click', (e) => {
                const chatbotWindow = document.getElementById('chatbotWindow');
                const toggleBtn = document.getElementById('chatbotToggleBtn');
                
                if (state.isOpen && 
                    !chatbotWindow.contains(e.target) && 
                    !toggleBtn.contains(e.target)) {
                    closeChatbot();
                }
            });
        }
        
        // Handle escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && state.isOpen) {
                closeChatbot();
            }
        });
        
        // Close when tapping on backdrop overlay for mobile
        if (state.isMobile) {
            document.addEventListener('click', (e) => {
                const chatbotWindow = document.getElementById('chatbotWindow');
                const toggleBtn = document.getElementById('chatbotToggleBtn');
                
                if (state.isOpen && 
                    e.target.classList.contains('chatbot-window-backdrop')) {
                    closeChatbot();
                }
            });
        }
    }
    
    function handleMobileKeyboard() {
        if (state.isMobile && state.isOpen) {
            setTimeout(() => {
                const chatMessages = document.getElementById('chatMessages');
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 500);
        }
    }
    
    function toggleChatbot() {
        const chatbotWindow = document.getElementById('chatbotWindow');
        const body = document.body;
        
        if (!state.isOpen) {
            // Create backdrop overlay for mobile
            if (state.isMobile) {
                createBackdrop();
            }
            
            chatbotWindow.classList.add('open');
            state.isOpen = true;
            state.unreadCount = 0;
            updateNotificationBadge();
            
            // Reset keyboard state
            state.isKeyboardOpen = false;
            chatbotWindow.classList.remove('keyboard-open');
            
            // Focus input with delay for animation
            setTimeout(() => {
                const userInput = document.getElementById('userInput');
                userInput.focus();
                
                // Scroll to bottom
                const chatMessages = document.getElementById('chatMessages');
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 300);
        } else {
            closeChatbot();
        }
    }
    
    function createBackdrop() {
        // Remove existing backdrop if any
        const existingBackdrop = document.querySelector('.chatbot-backdrop');
        if (existingBackdrop) {
            existingBackdrop.remove();
        }
        
        // Create backdrop
        const backdrop = document.createElement('div');
        backdrop.className = 'chatbot-backdrop';
        backdrop.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.5);
            z-index: 999997;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        // Add backdrop to body
        document.body.appendChild(backdrop);
        
        // Fade in backdrop
        setTimeout(() => {
            backdrop.style.opacity = '1';
        }, 10);
        
        // Close chatbot when backdrop is clicked
        backdrop.addEventListener('click', closeChatbot);
    }
    
    function removeBackdrop() {
        const backdrop = document.querySelector('.chatbot-backdrop');
        if (backdrop) {
            backdrop.style.opacity = '0';
            setTimeout(() => {
                if (backdrop.parentNode) {
                    backdrop.parentNode.removeChild(backdrop);
                }
            }, 300);
        }
    }
    
    function closeChatbot() {
        const chatbotWindow = document.getElementById('chatbotWindow');
        
        chatbotWindow.classList.remove('open');
        state.isOpen = false;
        state.isKeyboardOpen = false;
        chatbotWindow.classList.remove('keyboard-open');
        
        // Remove backdrop for mobile
        if (state.isMobile) {
            removeBackdrop();
        }
        
        // Blur input (closes keyboard on mobile)
        const userInput = document.getElementById('userInput');
        userInput.blur();
    }
    
    async function sendMessage() {
        const input = document.getElementById('userInput');
        const message = input.value.trim();
        
        if (!message) return;
        
        // Add user message
        addMessage(message, 'user');
        input.value = '';
        
        // Show typing indicator
        showTypingIndicator();
        
        try {
            const response = await fetch(`${config.backendUrl}/api/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    message: message,
                    userData: state.userData 
                })
            });
            
            const data = await response.json();
            
            removeTypingIndicator();
            
            if (response.ok) {
                addMessage(data.response, 'bot');
                saveMessages();
            } else {
                addMessage(`Sorry, I encountered an error. Please try again.`, 'bot');
            }
        } catch (error) {
            removeTypingIndicator();
            addMessage('I am having trouble connecting right now. Please check your internet connection.', 'bot');
            console.error('Chat error:', error);
        }
    }
    
    function addMessage(content, sender) {
        const messagesContainer = document.getElementById('chatMessages');
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const time = new Date().toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        
        // Format content
        let formattedContent = content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/`(.*?)`/g, '<code>$1</code>')
            .replace(/\n/g, '<br>');
        
        messageDiv.innerHTML = `
            <div class="message-content">${formattedContent}</div>
            <div class="message-time">${time}</div>
        `;
        
        messagesContainer.appendChild(messageDiv);
        
        // Scroll to bottom with smooth behavior
        setTimeout(() => {
            messagesContainer.scrollTo({
                top: messagesContainer.scrollHeight,
                behavior: 'smooth'
            });
        }, 50);
        
        // Add to state
        state.messages.push({
            sender,
            content,
            time: new Date().toISOString()
        });
        
        // Update unread count
        if (!state.isOpen && sender === 'bot') {
            state.unreadCount++;
            updateNotificationBadge();
        }
        
        // Limit messages
        if (state.messages.length > 50) {
            state.messages = state.messages.slice(-50);
            while (messagesContainer.children.length > 50) {
                messagesContainer.removeChild(messagesContainer.firstChild);
            }
        }
    }
    
    function showTypingIndicator() {
        const messagesContainer = document.getElementById('chatMessages');
        
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator';
        typingDiv.id = 'typingIndicator';
        typingDiv.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;
        
        messagesContainer.appendChild(typingDiv);
        
        setTimeout(() => {
            messagesContainer.scrollTo({
                top: messagesContainer.scrollHeight,
                behavior: 'smooth'
            });
        }, 50);
    }
    
    function removeTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    function updateNotificationBadge() {
        const badge = document.getElementById('unreadBadge');
        if (state.unreadCount > 0) {
            badge.textContent = state.unreadCount > 9 ? '9+' : state.unreadCount;
            badge.style.display = 'flex';
        } else {
            badge.style.display = 'none';
        }
    }
    
    function saveMessages() {
        try {
            localStorage.setItem('chatbotMessages', JSON.stringify(state.messages.slice(-20)));
        } catch (e) {
            console.error('Failed to save messages:', e);
        }
    }
    
    function loadMessages() {
        try {
            const saved = localStorage.getItem('chatbotMessages');
            if (saved) {
                const messages = JSON.parse(saved);
                messages.forEach(msg => addMessage(msg.content, msg.sender));
            }
        } catch (e) {
            console.error('Failed to load messages:', e);
        }
    }
    
    // Auto-ping to keep backend alive
    function startAutoPing() {
        if (!config.backendUrl || config.backendUrl.includes('your-render-app')) {
            return;
        }
        
        pingBackend();
        setInterval(pingBackend, 10 * 60 * 1000);
    }
    
    function pingBackend() {
        if (!config.backendUrl || config.backendUrl.includes('your-render-app')) {
            return;
        }
        
        fetch(`${config.backendUrl}/api/health`)
            .then(response => {
                if (response.ok) {
                    console.log('✅ Backend ping successful');
                }
            })
            .catch(() => {
                // Silent fail
            });
    }
    
    // Cleanup function
    function cleanup() {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('orientationchange', handleOrientationChange);
    }
    
    // Public API
    window.ChatbotWidget = {
        open: toggleChatbot,
        close: closeChatbot,
        sendMessage: (message) => {
            if (message) {
                document.getElementById('userInput').value = message;
                sendMessage();
            }
        },
        destroy: () => {
            cleanup();
            removeBackdrop();
            if (widgetContainer.parentNode) {
                widgetContainer.parentNode.removeChild(widgetContainer);
            }
        }
    };
    
    // Initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();