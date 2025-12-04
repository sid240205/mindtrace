/**
 * @fileoverview Animated typing indicator component.
 * Shows three bouncing dots to indicate the assistant is typing.
 */

import './chatbot.css';

/**
 * Typing indicator component with animated dots
 * @returns {JSX.Element}
 */
const TypingIndicator = () => {
    return (
        <div className="chat-typing-indicator" role="status" aria-label="Assistant is typing">
            <span className="chat-typing-dot" style={{ animationDelay: '0ms' }} />
            <span className="chat-typing-dot" style={{ animationDelay: '150ms' }} />
            <span className="chat-typing-dot" style={{ animationDelay: '300ms' }} />
        </div>
    );
};

export default TypingIndicator;
