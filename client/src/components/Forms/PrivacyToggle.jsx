import React from 'react';
import { Lock, Unlock } from 'lucide-react';

function PrivacyToggle({ isPublic, onToggle }) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
      <div className="flex items-center gap-3">
        {isPublic ? (
          <Unlock className="text-green-600" size={20} />
        ) : (
          <Lock className="text-gray-600" size={20} />
        )}
        <div>
          <p className="font-medium text-gray-900">
            {isPublic ? 'Public Profile' : 'Private Profile'}
          </p>
          <p className="text-sm text-gray-600">
            {isPublic 
              ? 'Your profile is visible to everyone' 
              : 'Only you can see your profile'}
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={onToggle}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
          ${isPublic ? 'bg-green-500' : 'bg-gray-400'}`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
            ${isPublic ? 'translate-x-6' : 'translate-x-1'}`}
        />
      </button>
    </div>
  );
}

export default PrivacyToggle;