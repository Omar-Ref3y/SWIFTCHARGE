class ChatBot {
    constructor() {
        this.messages = [];
        this.isTyping = false;
        this.setupElements();
        this.setupEventListeners();
        this.addWelcomeMessage();
    }

    setupElements() {
        this.chatToggle = document.querySelector('.chat-toggle');
        this.chatContainer = document.querySelector('.chat-container');
        this.closeChat = document.querySelector('.close-chat');
        this.messagesContainer = document.querySelector('.chat-messages');
        this.input = document.querySelector('.chat-input textarea');
        this.sendButton = document.querySelector('.send-message');
    }

    setupEventListeners() {
        this.chatToggle.addEventListener('click', () => this.toggleChat());
        this.closeChat.addEventListener('click', () => this.toggleChat());
        this.sendButton.addEventListener('click', () => this.sendMessage());
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
    }

    toggleChat() {
        this.chatContainer.classList.toggle('active');
        if (this.chatContainer.classList.contains('active')) {
            this.input.focus();
        }
    }

    addMessage(text, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
        messageDiv.textContent = text;
        this.messagesContainer.appendChild(messageDiv);
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    addWelcomeMessage() {
        const welcomeMessage = translations[currentLang].chat.welcome;
        this.addMessage(welcomeMessage);
    }

    showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot typing';
        typingDiv.textContent = translations[currentLang].chat.typing;
        this.messagesContainer.appendChild(typingDiv);
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
        return typingDiv;
    }

    async sendMessage() {
        const message = this.input.value.trim();
        if (!message || this.isTyping) return;

        // Clear input
        this.input.value = '';
        
        // Add user message
        this.addMessage(message, true);
        
        // Show typing indicator
        const typingIndicator = this.showTypingIndicator();
        this.isTyping = true;

        try {
            if (!config.GEMINI_API_KEY || config.GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY_HERE') {
                throw new Error('Please configure your Gemini API key in js/config.js');
            }
            const response = await this.getGeminiResponse(message);
            typingIndicator.remove();
            this.addMessage(response);
        } catch (error) {
            console.error('Error:', error);
            typingIndicator.remove();
            this.addMessage(error.message || translations[currentLang].chat.error);
        } finally {
            this.isTyping = false;
        }
    }

    async getGeminiResponse(message) {
        const prompt = `You are a helpful customer support assistant for SwiftCharge, a portable charging device. 
        The product features include:
        - 20,000mAh capacity
        - 3x faster charging with GaN technology
        - Ultra-compact design
        - Multiple output ports (2x USB-C, 1x USB-A)
        - Advanced safety features
        
        User message: ${message}
        
        Please provide a helpful and concise response in ${currentLang === 'ar' ? 'Arabic' : 'English'}.`;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${config.GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: prompt }]
                }]
            })
        });

        if (!response.ok) {
            throw new Error('API request failed');
        }

        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    }
}

// Initialize chat when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.chatBot = new ChatBot();
}); 