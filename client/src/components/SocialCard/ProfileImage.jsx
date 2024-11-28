import React from 'react';

function ProfileImage({ imageUrl, name }) {
  return (
    <div className="relative">
      <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-white shadow-lg">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-400 rounded-full flex items-center justify-center shadow-lg">
        <div className="w-3 h-3 bg-white rounded-full" />
      </div>
    </div>
  );
}

export default ProfileImage;