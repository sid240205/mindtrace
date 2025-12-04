/**
 * @fileoverview Quick action buttons component for predefined chat actions.
 */

import { Sparkles } from 'lucide-react';

/**
 * Quick action buttons component
 * @param {Object} props
 * @param {import('../../types/chat.types').QuickAction[]} props.actions - Array of quick actions
 * @param {function(string): void} props.onAction - Callback when an action is clicked
 * @param {boolean} [props.disabled] - Whether buttons are disabled
 * @returns {JSX.Element}
 */
const QuickActions = ({ actions, onAction, disabled = false }) => {
    if (!actions || actions.length === 0) return null;

    return (
        <div className="chat-quick-actions" role="group" aria-label="Quick actions">
            <div className="chat-quick-actions-header">
                <Sparkles className="w-4 h-4" />
                <span>Quick Actions</span>
            </div>
            <div className="chat-quick-actions-grid">
                {actions.map((action) => (
                    <button
                        key={action.id}
                        type="button"
                        onClick={() => onAction(action.message)}
                        disabled={disabled}
                        className="chat-quick-action-btn"
                        aria-label={action.label}
                    >
                        {action.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default QuickActions;
