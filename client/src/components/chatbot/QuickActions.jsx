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
        <div className="w-full" role="group" aria-label="Quick actions">
            <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-3">
                <Sparkles className="w-4 h-4" />
                <span>Quick Actions</span>
            </div>
            <div className="flex flex-wrap gap-2">
                {actions.map((action) => (
                    <button
                        key={action.id}
                        type="button"
                        onClick={() => onAction(action.message)}
                        disabled={disabled}
                        className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-900 text-[13px] font-medium cursor-pointer transition-all duration-200 hover:bg-gray-900 hover:border-gray-900 hover:text-white hover:-translate-y-px hover:shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] disabled:opacity-50 disabled:cursor-not-allowed"
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
