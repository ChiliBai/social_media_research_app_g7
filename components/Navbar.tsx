import React from 'react';
import { Icons } from './Icons';
import { User } from '../types';

interface NavbarProps {
  currentUser: User;
}

export const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  return (
    <div className="hidden md:flex fixed top-0 left-0 right-0 h-[60px] bg-white border-t-2 border-orange-500 shadow-sm z-50 items-center justify-center px-4">
      <div className="max-w-7xl w-full flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer group">
          <div className="relative">
             {/* Custom Weibo-style Eye Logo using SVG */}
             <svg width="36" height="30" viewBox="0 0 36 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-red-600">
               <path d="M18 6C23.5 6 28.5 8.5 31.5 12.5C32.5 13.8 33 15 33 16.5C33 22.8 26.3 28 18 28C9.7 28 3 22.8 3 16.5C3 15 3.5 13.8 4.5 12.5C7.5 8.5 12.5 6 18 6Z" fill="#E6162D"/>
               <path d="M18 10C14.5 10 11.5 12.5 11.5 16C11.5 19.5 14.5 22 18 22C21.5 22 24.5 19.5 24.5 16C24.5 12.5 21.5 10 18 10Z" fill="white"/>
               <circle cx="18" cy="16" r="3.5" fill="black"/>
               <path d="M13 3C15 1.5 18 1 21 1.5" stroke="#E6162D" strokeWidth="2" strokeLinecap="round"/>
               <path d="M23 2.5C25 2.5 27 3.5 28.5 5" stroke="#E6162D" strokeWidth="2" strokeLinecap="round"/>
               <path d="M9 5C10.5 4 12 3.5 13.5 3.5" stroke="#E6162D" strokeWidth="2" strokeLinecap="round"/>
             </svg>
          </div>
          <span className="text-2xl font-black italic text-gray-800 hidden sm:block tracking-tight ml-1">
            新浪微博 <span className="text-xs font-normal not-italic text-gray-500 ml-1 mt-auto">weibo.com</span>
          </span>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-[400px] mx-4 hidden md:block">
          <div className="relative group">
            <input
              type="text"
              className="block w-full pl-4 pr-10 py-1.5 border border-gray-300 rounded-sm bg-[#f2f2f5] text-gray-900 placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:bg-white text-sm transition-all"
              placeholder="大家正在搜：Gemini 2.5 发布"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <Icons.Search size={16} className="text-gray-400 group-focus-within:text-orange-500" />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 sm:gap-6">
          <button className="flex flex-col items-center gap-0.5 text-orange-500 group hidden sm:flex">
            <Icons.Home size={22} className="group-hover:scale-110 transition-transform" />
            <span className="text-xs">首页</span>
          </button>
          <button className="flex flex-col items-center gap-0.5 text-gray-600 hover:text-orange-500 transition-colors hidden sm:flex">
            <Icons.Flame size={22} />
            <span className="text-xs">热门</span>
          </button>
          
          <div className="h-5 w-px bg-gray-200 hidden sm:block"></div>
          
          <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded-full transition-colors pr-2">
            <img 
              src={currentUser.avatar} 
              alt={currentUser.name} 
              className="w-8 h-8 rounded-full border border-gray-200 object-cover"
            />
            <span className="text-sm text-gray-700 hidden lg:block hover:text-orange-500">{currentUser.name}</span>
          </div>
          
          <button className="bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white px-4 py-1.5 rounded-full text-sm font-bold transition-all shadow-sm flex items-center gap-1">
            <Icons.PenTool size={14} />
            写微博
          </button>
        </div>
      </div>
    </div>
  );
};