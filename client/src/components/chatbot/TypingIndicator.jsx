/**
 * @fileoverview Animated typing indicator component.
 * Shows three bouncing dots to indicate the assistant is typing.
 */

/**
 * Typing indicator component with animated dots
 * @returns {JSX.Element}
 */
const TypingIndicator = () => {
    return (
        <div className="flex gap-1 py-1" role="status" aria-label="Assistant is typing">
            <span 
                className="w-2 h-2 bg-gray-500 rounded-full animate-[bounce_1.4s_infinite_ease-in-out_both]" 
                style={{ animationDelay: '0ms' }} 
            />
            <span 
                className="w-2 h-2 bg-gray-500 rounded-full animate-[bounce_1.4s_infinite_ease-in-out_both]" 
                style={{ animationDelay: '150ms' }} 
            />
            <span 
                className="w-2 h-2 bg-gray-500 rounded-full animate-[bounce_1.4s_infinite_ease-in-out_both]" 
                style={{ animationDelay: '300ms' }} 
            />
        </div>
    );
};

export default TypingIndicator;
