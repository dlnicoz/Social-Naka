// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { Link as LinkIcon, Home, Settings } from 'lucide-react';
// import { cn } from '../lib/utils';

// export default function Header() {
//   const location = useLocation();
//   const isActive = (path) => location.pathname === path;

//   const NavLink = ({ to, children }) => (
//     <Link
//       to={to}
//       className={cn(
//         'flex items-center gap-2 px-4 py-2 rounded-lg transition-colors',
//         isActive(to)
//           ? 'bg-gray-100 text-gray-900'
//           : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
//       )}
//     >
//       {children}
//     </Link>
//   );

//   return (
//     <header className="bg-white border-b sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
//           <Link to="/" className="flex items-center gap-2">
//             <LinkIcon className="h-6 w-6 text-blue-500" />
//             <span className="text-xl font-bold">LinkHub</span>
//           </Link>

//           <nav className="flex items-center gap-2">
//             <NavLink to="/">
//               <Home size={20} />
//               <span>Home</span>
//             </NavLink>
//             <NavLink to="/dashboard">
//               <Settings size={20} />
//               <span>Create Your Hub</span>
//             </NavLink>
//           </nav>
//         </div>
//       </div>
//     </header>
//   );
// }
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Link as LinkIcon, Search, Plus } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="fixed top-6 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8">
      <header className="max-w-7xl mx-auto bg-white rounded-full border border-gray-200 shadow-lg">
        <nav className="flex items-center justify-between h-20 px-8">
          {/* Left section */}
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2"
            >
              <LinkIcon className="h-7 w-7 text-gray-700" />
            </Link>

            <Link
              to="/create"
              className={cn(
                'flex items-center gap-2 px-5 py-2.5 text-sm rounded-full transition-all duration-200',
                'bg-gray-100 text-gray-700 hover:bg-gray-200'
              )}
            >
              <Plus className="h-5 w-5" />
              <span className="font-medium">Create</span>
            </Link>

            <div className="hidden sm:block relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search username @alex"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-11 pr-4 py-2.5 w-64 text-sm rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 focus:border-gray-300"
              />
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-6">
            <Link
              to="/login"
              className="px-5 py-2.5 text-sm text-gray-700 hover:text-gray-900 font-medium"
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className={cn(
                'px-5 py-2.5 text-sm rounded-full font-medium',
                'bg-gray-900 text-white hover:bg-gray-800'
              )}
            >
              Sign up free
            </Link>
          </div>
        </nav>
      </header>
    </div>
  );
}