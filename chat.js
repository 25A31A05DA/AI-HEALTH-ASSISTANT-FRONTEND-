// JavaScript Section

// DOM Elements
const messagesArea = document.getElementById('messagesArea');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const typingIndicator = document.getElementById('typingIndicator');

// Remove welcome message on first interaction
let isFirstMessage = true;

/**
 * Add a message to the chat
 * @param {string} sender - 'user' or 'ai'
 * @param {string} text - The message text
 */
function addMessage(sender, text) {
    // Remove welcome message if it's the first real message
    if (isFirstMessage) {
        const welcomeMsg = document.querySelector('.welcome-message');
        if (welcomeMsg) {
            welcomeMsg.remove();
        }
        isFirstMessage = false;
    }

    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    // Add sender label
    const senderLabel = document.createElement('div');
    senderLabel.className = 'sender';
    senderLabel.textContent = sender === 'user' ? 'You' : 'AI Assistant';
    messageDiv.appendChild(senderLabel);
    
    // Add message text
    const textNode = document.createTextNode(text);
    messageDiv.appendChild(textNode);

    // Insert before typing indicator
    messagesArea.insertBefore(messageDiv, typingIndicator);

    // Auto scroll to latest message
    scrollToLatest();
}

/**
 * Scroll messages area to the bottom
 */
function scrollToLatest() {
    messagesArea.scrollTop = messagesArea.scrollHeight;
}

/**
 * Show typing indicator
 */
function showTyping() {
    typingIndicator.classList.add('show');
    scrollToLatest();
}

/**
 * Hide typing indicator
 */
function hideTyping() {
    typingIndicator.classList.remove('show');
}

/**
 * Simulate AI response with delay
 * @param {string} userMessage - The user's message
 */
function simulateAIResponse(userMessage) {
    // Show typing indicator
    showTyping();

    // Random delay between 500-800ms
    const delay = Math.floor(Math.random() * 300) + 500;

    setTimeout(() => {
        // Hide typing indicator
        hideTyping();

        // Generate AI response based on user input
        const response = generateAIResponse(userMessage);
        
        // Add AI message
        addMessage('ai', response);
    }, delay);
}

/**
 * Generate a simple AI response
 * @param {string} message - User's message
 * @returns {string} AI response
 */
function generateAIResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // Health-related responses
    if (lowerMessage.includes('headache') || lowerMessage.includes('head pain')) {
        return "For headaches, try: rest in a quiet dark room, stay hydrated, over-the-counter pain relievers, and avoid screen time. If persistent, consult a doctor.";
    }
    if (lowerMessage.includes('sleep') || lowerMessage.includes('insomnia')) {
        return "To improve sleep: maintain a consistent sleep schedule, avoid caffeine before bed, limit screen time, create a relaxing bedtime routine, and keep your bedroom cool and dark.";
    }
    if (lowerMessage.includes('exercise') || lowerMessage.includes('workout')) {
        return "Great question! For exercise, aim for 150 minutes of moderate activity per week. Include cardio, strength training, and flexibility exercises. Start gradually and listen to your body!";
    }
    if (lowerMessage.includes('diet') || lowerMessage.includes('nutrition') || lowerMessage.includes('eat')) {
        return "A balanced diet should include: plenty of fruits & vegetables, whole grains, lean proteins, and healthy fats. Stay hydrated with 8 glasses of water daily. Avoid processed foods!";
    }
    if (lowerMessage.includes('stress') || lowerMessage.includes('anxiety')) {
        return "To manage stress: practice deep breathing, exercise regularly, maintain social connections, try meditation or yoga, and ensure you're getting enough sleep. Remember to take breaks!";
    }
    if (lowerMessage.includes('cold') || lowerMessage.includes('flu') || lowerMessage.includes('sick')) {
        return "For cold/flu: rest, stay hydrated, eat nutritious foods, gargle with warm salt water, and use over-the-counter medications for symptoms. See a doctor if fever persists over 3 days.";
    }
    if (lowerMessage.includes('weight') || lowerMessage.includes('lose weight')) {
        return "Healthy weight management: create a calorie deficit through diet & exercise, focus on whole foods, control portion sizes, stay active, and be patient - healthy weight loss is 1-2 lbs per week.";
    }
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
        return "Hello! I'm here to help with your health questions. What would you like to know about today?";
    }
    if (lowerMessage.includes('thank')) {
        return "You're welcome! Feel free to ask more questions anytime. Your health is important!";
    }

    // Default response
    return "That's a great question! I'm here to help with health-related topics. You can ask me about nutrition, exercise, sleep, stress management, common symptoms, and more. What specific health topic interests you?";
}

/**
 * Send a message
 */
function sendMessage() {
    const message = messageInput.value.trim();
    
    if (message) {
        // Add user message
        addMessage('user', message);
        
        // Clear input
        messageInput.value = '';

        // Simulate AI response
        simulateAIResponse(message);
    }
}

// Event Listeners
sendButton.addEventListener('click', sendMessage);

messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Focus input on load
messageInput.focus();