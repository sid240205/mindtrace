/**
 * @fileoverview Main chatbot container component.
 * Manages open/close state, theme, and renders the floating widget.
 */

import { useState, useCallback, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import ChatWindow from './ChatWindow';
import useChat from '../../hooks/useChat';
import './chatbot.css';

/**
 * Main chatbot container component
 * @returns {JSX.Element}
 */
const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [hasUnread, setHasUnread] = useState(false);

    const {
        messages,
        isLoading,
        isTyping,
        error,
        sendMessage,
        clearChat,
        exportChat,
        dismissError,
        config,
    } = useChat({ enablePersistence: true, enableStreaming: false });

    // Track unread messages when chat is closed
    useEffect(() => {
        if (!isOpen && messages.length > 0) {
            const lastMessage = messages[messages.length - 1];
            if (lastMessage.role === 'assistant') {
                setHasUnread(true);
            }
        }
    }, [messages, isOpen]);

    // Clear unread when chat is opened
    useEffect(() => {
        if (isOpen) {
            setHasUnread(false);
        }
    }, [isOpen]);

    /**
     * Opens the chat window
     */
    const handleOpen = useCallback(() => {
        setIsOpen(true);
        setIsMinimized(false);
        setHasUnread(false);
    }, []);

    /**
     * Closes the chat window
     */
    const handleClose = useCallback(() => {
        setIsOpen(false);
        setIsMinimized(false);
    }, []);

    /**
     * Minimizes the chat window
     */
    const handleMinimize = useCallback(() => {
        setIsMinimized(true);
        setIsOpen(false);
    }, []);

    /**
     * Handles sending a message
     * @param {string} content - Message content
     */
    const handleSendMessage = useCallback((content) => {
        sendMessage(content);
    }, [sendMessage]);

    return (
        <div className="chatbot-container" data-theme="light">
            {/* Chat Window */}
            <ChatWindow
                isOpen={isOpen}
                onClose={handleClose}
                onMinimize={handleMinimize}
                messages={messages}
                isLoading={isLoading}
                isTyping={isTyping}
                error={error}
                onSendMessage={handleSendMessage}
                onClearChat={clearChat}
                onExport={exportChat}
                onDismissError={dismissError}
                quickActions={config.quickActions}
                maxMessageLength={config.maxMessageLength}
            />

            {/* Floating Button */}
            {!isOpen && (
                <button
                    type="button"
                    onClick={handleOpen}
                    className={`chatbot-fab ${isMinimized ? 'chatbot-fab-minimized' : ''}`}
                    aria-label={isMinimized ? 'Expand chat' : 'Open chat'}
                    aria-expanded={isOpen}
                >
                    {hasUnread && <span className="chatbot-fab-badge" aria-label="Unread messages" />}
                    <MessageCircle className="chatbot-fab-icon" />
                </button>
            )}
        </div>
    );
};

export default Chatbot;
