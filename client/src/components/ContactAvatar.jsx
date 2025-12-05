import React from 'react';
import { useAuthenticatedImage } from '../hooks/useAuthenticatedImage';

const ContactAvatar = ({ contact, size = 'md', className = '' }) => {
  const photoUrl = useAuthenticatedImage(contact?.profile_photo_url);
  
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-base',
    xl: 'w-20 h-20 text-lg',
    '2xl': 'w-32 h-32 text-2xl',
  };

  const sizeClass = sizeClasses[size] || sizeClasses.md;

  if (photoUrl) {
    return (
      <img
        src={photoUrl}
        alt={contact?.name || 'Contact'}
        className={`rounded-full object-cover ${sizeClass} ${className}`}
      />
    );
  }

  // Fallback to avatar with initials
  const avatarColors = {
    indigo: 'bg-indigo-100 text-indigo-600',
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    red: 'bg-red-100 text-red-600',
    purple: 'bg-purple-100 text-purple-600',
    pink: 'bg-pink-100 text-pink-600',
    gray: 'bg-gray-100 text-gray-600',
  };

  const colorClass = avatarColors[contact?.color] || avatarColors.indigo;

  return (
    <div
      className={`rounded-full flex items-center justify-center font-semibold ${sizeClass} ${colorClass} ${className}`}
    >
      {contact?.avatar || contact?.name?.substring(0, 2).toUpperCase() || '??'}
    </div>
  );
};

export default ContactAvatar;
