import React from 'react';

function Background({ theme }) {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${theme.background}`} />
      
      <div className="absolute inset-0">
        <div className={`absolute top-0 -left-4 w-72 h-72 ${theme.blobs[0]} rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob`} />
        <div className={`absolute top-0 -right-4 w-72 h-72 ${theme.blobs[1]} rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000`} />
        <div className={`absolute -bottom-8 left-20 w-72 h-72 ${theme.blobs[2]} rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000`} />
      </div>

      <div className="absolute inset-0 backdrop-blur-[1px] mix-blend-overlay opacity-50" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />
    </div>
  );
}

export default Background;