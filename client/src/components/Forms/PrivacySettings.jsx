import React from 'react';
import { Lock, Unlock, Share2, Copy, Check } from 'lucide-react';
import { useState } from 'react';

function PrivacySettings({ isPublic, shareableLink, onToggle }) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareableLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Privacy Toggle */}
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
                ? 'Your profile is discoverable in search results' 
                : 'Your profile won\'t appear in search results'}
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

      {/* Shareable Link */}
      <div className="p-4 bg-gray-100 rounded-lg space-y-3">
        <div className="flex items-center gap-2">
          <Share2 className="text-gray-600" size={20} />
          <p className="font-medium text-gray-900">Shareable Link</p>
        </div>
        <p className="text-sm text-gray-600">
          Anyone with this link can view your profile, regardless of privacy settings
        </p>
        <div className="flex gap-2">
          <input
            type="text"
            value={shareableLink}
            readOnly
            className="flex-1 px-3 py-2 bg-white rounded-lg text-gray-700 text-sm"
          />
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 rounded-lg transition-colors"
          >
            {copied ? (
              <>
                <Check size={16} className="text-green-500" />
                <span className="text-sm font-medium">Copied!</span>
              </>
            ) : (
              <>
                <Copy size={16} />
                <span className="text-sm font-medium">Copy</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PrivacySettings;